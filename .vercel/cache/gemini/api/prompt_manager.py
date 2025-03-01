# api/prompt_manager.py
import time
from .gemini_client import generate_content  # Adjust import based on final structure

RATE_LIMIT_DELAY = 2  # Seconds between API calls

def extract_career_goal(answers):
    """Extract primary career goal from answers."""
    if not answers:
        return "Career Exploration"
        
    # Convert answers to string if they're not already
    answers_text = ' '.join(str(answer) for answer in answers if answer)
    
    prompt = (
        f"Identify primary career goal from these answers: {answers_text}\n"
        "Focus on: direct mentions, implied interests, strongest professional direction.\n"
        "Respond ONLY with the career goal name."
    )
    try:
        result = generate_content(prompt, max_tokens=300)
        return result.strip() if result else "Career Exploration"
    except Exception as e:
        raise Exception(f"Career goal extraction failed: {str(e)}")

def get_topic_prompt(topic, student_name, career_goal):
    """Return prompt template for given topic."""
    # Sanitize inputs
    student_name = str(student_name).strip()
    career_goal = str(career_goal).strip()
    
    prompt_templates = {
        'personal_traits': """Analyze {student_name}'s suitability for {career_goal} (1000+ words):
    1. Core competencies assessment
    2. Personality alignment with career demands
    3. Skill gap analysis
    4. Development roadmap
    5. Mentorship recommendations""",

        'skills_excel': """Comprehensive skills development plan for {career_goal}:
    1. Technical skills matrix (priority levels)
    2. Soft skills development timeline
    3. Learning resources (courses, books, podcasts)
    4. Practical application projects
    5. Certification roadmap
    6. Industry networking strategy""",

        'top_careers': """8 alternative careers for {career_goal} (500 words each):
    - Career title
    - Required qualifications
    - Skill transfer matrix
    - Growth projections (1/5/10 years)
    - Transition roadmap
    - Industry demand analysis
    - Salary benchmarks""",

        'career_intro': """Comprehensive 5-page guide to {career_goal}:
    1. Role evolution history
    2. Day-to-day responsibilities
    3. Industry verticals
    4. Global market trends
    5. Regulatory landscape
    6. Technology adoption
    7. Success case studies""",

        'career_roadmap': """10-year development plan for {career_goal}:
    1. Education timeline (degrees/certifications)
    2. Skill acquisition phases
    3. Experience milestones
    4. Networking strategy
    5. Financial planning
    6. Risk mitigation plan
    7. Performance metrics""",

        'career_education': """Education plan for {career_goal}:
    1. Global degree options (BS/MS/PhD)
    2. Certification hierarchy
    3. Online learning pathways
    4. Institution rankings
    5. Admission strategies
    6. Scholarship opportunities""",

        'career_growth': """10-year industry projection for {career_goal}:
    1. Salary trends by region
    2. Promotion pathways
    3. Emerging specializations
    4. Technology disruption analysis
    5. Global demand hotspots
    6. Entrepreneurship opportunities""",

        'indian_colleges': """10 Indian institutions for {career_goal} (detailed):
    - NIRF/NAAC rankings
    - Program structure
    - Admission process
    - Placement statistics (3 years)
    - Industry partnerships
    - Research facilities
    - Notable alumni
    - Campus infrastructure
    - Fee structure
    - Scholarship programs""",

        'global_colleges': """15 global universities for {career_goal}:
    - QS/THE rankings
    - Program specializations
    - International student support
    - Employment statistics
    - Application timeline
    - Cost of attendance
    - Visa success rates
    - Cultural adaptation programs
    - Alumni network""",

        'industry_analysis': """5-year industry analysis for {career_goal}:
    1. Market size projections
    2. Key players analysis
    3. Regulatory challenges
    4. Technology adoption
    5. Sustainability initiatives
    6. Regional opportunities""",

        'financial_planning': """10-year financial plan for {career_goal}:
    1. Education cost analysis
    2. Funding sources
    3. ROI projections
    4. Tax optimization
    5. Insurance needs
    6. Wealth management
    7. Exit strategies"""
    }
    return prompt_templates.get(topic, '')

def generate_topic_reports(context, career_goal, student_name):
    """Generate reports for all topics."""
    if not all([context, career_goal, student_name]):
        raise ValueError("Missing required parameters for report generation")
        
    topics = [
        'personal_traits', 'skills_excel', 'top_careers',
        'career_intro', 'career_roadmap', 'career_education',
        'career_growth', 'indian_colleges', 'global_colleges',
        'industry_analysis', 'financial_planning'
    ]
    
    reports = {}
    for topic in topics:
        try:
            prompt_template = get_topic_prompt(topic, student_name, career_goal)
            if not prompt_template:
                reports[topic] = "Invalid prompt template"
                continue
            
            formatted_prompt = prompt_template.format(
                student_name=student_name,
                career_goal=career_goal
            )
            
            content = generate_content(formatted_prompt)
            if not content:
                raise ValueError(f"No content generated for {topic}")
                
            reports[topic] = content
            time.sleep(RATE_LIMIT_DELAY)
            
        except Exception as e:
            raise Exception(f"Error generating report for {topic}: {str(e)}")
            
    return reports