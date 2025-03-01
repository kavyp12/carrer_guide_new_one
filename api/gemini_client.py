# api/gemini_client.py
import os
import logging
import google.generativeai as genai
from functools import lru_cache
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API configuration parameters
MAX_RETRIES = 3
API_TIMEOUT = 30  # Request timeout in seconds

# Setup logging (Vercel logs to dashboard, so simplify)
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

def setup_gemini_api():
    """Configure Gemini API with validation."""
    try:
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            raise ValueError("Missing GOOGLE_API_KEY in environment variables.")

        genai.configure(api_key=api_key)
        logger.info("Gemini API configured successfully")
        
        # List available models (optional, for debugging)
        available_models = [model.name for model in genai.list_models()]
        logger.info(f"Available models: {available_models}")

        # Ensure the selected model exists
        selected_model = "models/gemini-2.0-flash"  # Change if needed
        if selected_model not in available_models:
            raise ValueError(f"Model '{selected_model}' is not available. Check your API key and permissions.")
        
    except Exception as e:
        logger.error(f"API configuration failed: {str(e)}")
        raise

@lru_cache(maxsize=512)
def generate_content(prompt, max_tokens=2048, temperature=0.7):
    """Generate content using Gemini with error handling."""
    selected_model = "models/gemini-2.0-flash"  # Change if needed

    for attempt in range(MAX_RETRIES):
        try:
            model = genai.GenerativeModel(selected_model)
            response = model.generate_content(
                prompt,
                generation_config={
                    'temperature': temperature,
                    'max_output_tokens': max_tokens,
                    'top_p': 0.9
                },
                request_options={'timeout': API_TIMEOUT}
            )
            return response.text if response.text else None
        except Exception as e:
            logger.warning(f"API Error (attempt {attempt+1}): {str(e)}")
            if attempt == MAX_RETRIES - 1:
                raise
    return None

# Initialize API (will run on Vercel cold start)
try:
    setup_gemini_api()
except Exception as e:
    logger.error(f"Failed to initialize Gemini API: {str(e)}")
    raise