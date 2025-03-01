# api/gemini.py
from http.server import BaseHTTPRequestHandler
import json
import logging
import os
from dotenv import load_dotenv
from .assessment_manager import AssessmentManager
from .prompt_manager import extract_career_goal, generate_topic_reports
from .gemini_client import setup_gemini_api
from .report_builder import build_report_data
from .pdf_generator import generate_pdf_report
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaInMemoryUpload, MediaIoBaseDownload
from io import BytesIO
import re
from urllib.parse import unquote

# Load environment variables from .env file
load_dotenv()

# Configure logging for Vercel deployment
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Initialize the assessment manager for processing answers
assessment_manager = AssessmentManager()

# Configure and initialize the Gemini API on startup
try:
    setup_gemini_api()
except Exception as e:
    logger.error(f"Failed to initialize Gemini API: {str(e)}")
    raise

def setup_google_drive():
    """Initialize Google Drive API client using service account credentials."""
    try:
        # Retrieve credentials from environment variables
        credentials_json = os.getenv('GOOGLE_DRIVE_CREDENTIALS')
        if not credentials_json:
            logger.error("Missing GOOGLE_DRIVE_CREDENTIALS environment variable")
            return None
        
        # Log a redacted portion for debugging
        logger.info(f"Loading GOOGLE_DRIVE_CREDENTIALS: {credentials_json[:20]}... (redacted)")
        
        # Parse the JSON string into a dictionary
        credentials_info = json.loads(credentials_json)
        
        # Create credentials with the required scope for file access
        credentials = service_account.Credentials.from_service_account_info(
            credentials_info,
            scopes=['https://www.googleapis.com/auth/drive.file']
        )
        
        # Build the Google Drive service
        drive_service = build('drive', 'v3', credentials=credentials)
        logger.info("Google Drive API initialized successfully")
        return drive_service
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in GOOGLE_DRIVE_CREDENTIALS: {str(e)} - Check .env or Vercel environment variables")
        return None
    except Exception as e:
        logger.error(f"Failed to initialize Google Drive API: {str(e)}", exc_info=True)
        return None

def upload_to_drive(drive_service, file_content, filename, folder_id=None):
    """Upload a PDF file to Google Drive and return its shareable link."""
    try:
        # Define file metadata
        file_metadata = {
            'name': filename,
            'mimeType': 'application/pdf'
        }
        
        # Optionally add the folder ID if specified
        if folder_id:
            file_metadata['parents'] = [folder_id]
        
        # Create media upload object with raw bytes from BytesIO
        media = MediaInMemoryUpload(file_content.getvalue(), mimetype='application/pdf')
        
        # Upload the file to Google Drive
        file = drive_service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id,webViewLink'
        ).execute()
        
        # Make the file publicly accessible via a shareable link
        drive_service.permissions().create(
            fileId=file.get('id'),
            body={
                'type': 'anyone',
                'role': 'reader'
            }
        ).execute()
        
        logger.info(f"File uploaded successfully: {filename}")
        return {
            'id': file.get('id'),
            'webViewLink': file.get('webViewLink')
        }
    except Exception as e:
        logger.error(f"Failed to upload file to Google Drive: {str(e)}", exc_info=True)
        return None

def download_from_drive(drive_service, filename):
    """
    Download a file from Google Drive by its filename and return file content.
    
    Args:
        drive_service: Google Drive API service
        filename: The name of the file to download
        
    Returns:
        Tuple of (file_content, mime_type) or (None, None) if not found
    """
    try:
        # Search for the file by name (case-insensitive for robustness, but exact match for simplicity)
        response = drive_service.files().list(
            q=f"name='{filename}' and trashed=false",
            spaces='drive',
            fields='files(id, name, mimeType)'
        ).execute()
        
        files = response.get('files', [])
        if not files:
            logger.error(f"File not found in Google Drive: {filename}")
            return None, None
            
        # Get the first matching file
        file_id = files[0]['id']
        mime_type = files[0]['mimeType']
        
        # Download the file content
        request = drive_service.files().get_media(fileId=file_id)
        file_content = BytesIO()
        downloader = MediaIoBaseDownload(file_content, request)
        
        done = False
        while not done:
            status, done = downloader.next_chunk()
            
        file_content.seek(0)
        logger.info(f"File downloaded successfully from Google Drive: {filename}")
        return file_content, mime_type
    except Exception as e:
        logger.error(f"Failed to download file from Google Drive: {str(e)}", exc_info=True)
        return None, None

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle /api/submit-assessment (POST) endpoint for submitting assessments and generating reports."""
        if self.path != '/api/submit-assessment':
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Route not found"}).encode())
            return

        try:
            # Read and parse the request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Validate input data
            if not data or 'answers' not in data:
                return self._send_error(400, "Missing answers data")
            
            if not isinstance(data['answers'], dict):
                return self._send_error(400, "Invalid answers format")
            
            # Process assessment data
            trait_scores = assessment_manager.calculate_scores(data['answers'])
            
            # Extract student details
            student_name = data.get('studentName', 'Student').strip()
            student_info = {
                'name': student_name,
                'age': str(data.get('age', 'Not provided')),
                'academic_info': str(data.get('academicInfo', 'Not provided')),
                'interests': str(data.get('interests', 'Not provided')),
                'achievements': [
                    str(data.get('answers', {}).get('question13', 'None')),
                    str(data.get('answers', {}).get('question30', 'None'))
                ]
            }
            
            # Extract career goal from answers
            career_goal = extract_career_goal(list(data['answers'].values()))
            if not career_goal:
                return self._send_error(500, "Failed to extract career goal")
            
            # Generate report sections using Gemini API
            context = f"""
            Trait Scores: {json.dumps(trait_scores)}
            Student Info: {json.dumps(student_info)}
            """
            report_sections = generate_topic_reports(context.strip(), career_goal, student_info['name'])
            
            if not report_sections:
                return self._send_error(500, "Failed to generate report sections")
            
            # Build the final report data
            report_data = build_report_data(student_info['name'], career_goal, report_sections)

            # Generate PDF report (returns bytes)
            pdf_filename = f"{student_name.replace(' ', '_')}_Career_Report.pdf"
            pdf_content = generate_pdf_report(report_data)  # Already returns bytes

            # Initialize Google Drive client
            drive_service = setup_google_drive()
            if not drive_service:
                return self._send_error(500, "Failed to initialize Google Drive API")
            
            # Get the Google Drive folder ID from environment variables
            folder_id = os.getenv('GOOGLE_DRIVE_FOLDER_ID')
            
            # Upload PDF to Google Drive
            upload_result = upload_to_drive(drive_service, BytesIO(pdf_content), pdf_filename, folder_id)
            
            if not upload_result:
                return self._send_error(500, "Failed to upload PDF to Google Drive")

            # Send success response with report details
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "message": "Report generated successfully",
                "report_url": upload_result['webViewLink'],
                "file_id": upload_result['id'],
                "file_name": pdf_filename, 
                "student_name": student_name,
                "career_goal": career_goal
            }).encode())

        except json.JSONDecodeError:
            self._send_error(400, "Invalid JSON data")
        except Exception as e:
            logger.error(f"Assessment submission error: {str(e)}", exc_info=True)
            self._send_error(500, f"Assessment processing failed: {str(e)}")

    def do_GET(self):
        """Handle GET endpoints including the download-report endpoint."""
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "healthy",
                "message": "Career Guide API is running"
            }).encode())
            return
        
        # Handle file download endpoint
        if self.path.startswith('/api/download-report/'):
            try:
                # Parse the filename from the path
                match = re.match(r'/api/download-report/(.*)', self.path)
                if not match:
                    return self._send_error(400, "Invalid file path")
                
                filename = unquote(match.group(1))
                
                # Check authorization header (optional but recommended)
                auth_header = self.headers.get('Authorization')
                if not auth_header or not auth_header.startswith('Bearer '):
                    return self._send_error(401, "Authorization required")
                
                # Initialize Google Drive API
                drive_service = setup_google_drive()
                if not drive_service:
                    return self._send_error(500, "Failed to connect to Google Drive")
                
                # Download the file from Google Drive
                file_content, mime_type = download_from_drive(drive_service, filename)
                
                if not file_content:
                    return self._send_error(404, "File not found")
                
                # Send the file content as response
                self.send_response(200)
                self.send_header('Content-type', mime_type or 'application/pdf')
                self.send_header('Content-Disposition', f'attachment; filename="{filename}"')
                self.end_headers()
                self.wfile.write(file_content.getvalue())
                
                return
            except Exception as e:
                logger.error(f"File download error: {str(e)}", exc_info=True)
                return self._send_error(500, f"Failed to download file: {str(e)}")

        # Handle 404 for other routes
        self.send_response(404)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Route not found"}).encode())

    def _send_error(self, status, message):
        """Helper method to send error responses in JSON format."""
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"error": message}).encode())
        return False

# Ensure Gemini API is initialized on Vercel cold start
try:
    setup_gemini_api()
except Exception as e:
    logger.error(f"Failed to initialize Gemini API on Vercel: {str(e)}")
    raise