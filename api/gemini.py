# api/gemini.py
from http.server import BaseHTTPRequestHandler
import json
import logging
import os
from dotenv import load_dotenv
from assessment_manager import AssessmentManager
from prompt_manager import extract_career_goal, generate_topic_reports
from gemini_client import setup_gemini_api
from report_builder import build_report_data
from pdf_generator import generate_pdf_report
from github import Github  # PyGithub for GitHub API
import requests
from io import BytesIO

# Load environment variables
load_dotenv()

# Configure logging (Vercel logs to dashboard)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Initialize services
assessment_manager = AssessmentManager()

# Configure Gemini API on startup
try:
    setup_gemini_api()
except Exception as e:
    logger.error(f"Failed to initialize Gemini API: {str(e)}")
    raise

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle /api/submit-assessment (POST)"""
        if self.path != '/api/submit-assessment':
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Route not found"}).encode())
            return

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        try:
            if not data or 'answers' not in data:
                return self._send_error(400, "Missing answers data")
            
            if not isinstance(data['answers'], dict):
                return self._send_error(400, "Invalid answers format")
            
            # Calculate trait scores
            trait_scores = assessment_manager.calculate_scores(data['answers'])
            
            # Extract student information
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
            
            # Extract career goal
            career_goal = extract_career_goal(list(data['answers'].values()))
            if not career_goal:
                return self._send_error(500, "Failed to extract career goal")
            
            # Generate report sections
            context = f"""
            Trait Scores: {json.dumps(trait_scores)}
            Student Info: {json.dumps(student_info)}
            """
            report_sections = generate_topic_reports(context.strip(), career_goal, student_info['name'])
            
            if not report_sections:
                return self._send_error(500, "Failed to generate report sections")
            
            # Build report data
            report_data = build_report_data(student_info['name'], career_goal, report_sections)

            # Generate PDF (return bytes)
            pdf_filename = f"{student_name.replace(' ', '_')}_Career_Report.pdf"
            pdf_content = generate_pdf_report(report_data)

            # Upload PDF to GitHub Release
            github_token = os.getenv('GITHUB_TOKEN')
            if not github_token:
                return self._send_error(500, "Missing GITHUB_TOKEN in environment variables")

            # Initialize GitHub client
            g = Github(github_token)
            repo = g.get_repo('kavyp12/carrrer_guide_vercel_demo')  # Replace with your GitHub repo (e.g., 'username/repo')

            # Create or get the latest release
            releases = repo.get_releases()
            if releases.totalCount == 0:
                release = repo.create_git_release(
                    tag="v1.0.0",  # Use a version or timestamp for uniqueness
                    name="Career Reports",
                    message="Automated career report releases"
                )
            else:
                release = releases[0]

            # Upload PDF as release asset
            headers = {'Authorization': f'token {github_token}'}
            files = {'file': (pdf_filename, BytesIO(pdf_content), 'application/pdf')}
            response = requests.post(
                f"https://uploads.github.com/repos/kavyp12/carrrer_guide_vercel_demo/releases/{release.id}/assets?name={pdf_filename}",
                headers=headers,
                files=files
            )

            if response.status_code != 201:
                return self._send_error(500, f"Failed to upload PDF to GitHub: {response.text}")

            # Get the asset URL (public URL of the PDF)
            asset_data = response.json()
            report_url = asset_data['browser_download_url']

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "message": "Report generated successfully",
                "report_url": report_url
            }).encode())

        except Exception as e:
            logger.error(f"Assessment submission error: {str(e)}", exc_info=True)
            self._send_error(500, f"Assessment processing failed: {str(e)}")

    def do_GET(self):
        """Handle /api/download-report/<filename> (GET)"""
        if not self.path.startswith('/api/download-report/'):
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Route not found"}).encode())
            return

        filename = self.path.replace('/api/download-report/', '')
        try:
            # Since PDFs are stored in GitHub Releases, we assume the filename matches
            # and return the URL we stored earlier (client should use the report_url from POST)
            # For simplicity, we’ll return a 404 if not found (you could store URLs in memory or a DB)
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "File not found, use report_url from submission"}).encode())

        except Exception as e:
            logger.error(f"Error serving report {filename}: {str(e)}", exc_info=True)
            self._send_error(500, f"Failed to retrieve report: {str(e)}")

    def _send_error(self, status, message):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"error": message}).encode())

# Ensure Gemini API is initialized (run on Vercel cold start)
try:
    setup_gemini_api()
except Exception as e:
    logger.error(f"Failed to initialize Gemini API on Vercel: {str(e)}")
    raise