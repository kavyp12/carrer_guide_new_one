# api/report_builder.py
from datetime import datetime

def build_report_data(student_name, career_goal, report_sections):
    """Build complete report data structure."""
    return {
        'student_name': student_name,
        'career_goal': career_goal,
        'generated_date': datetime.now().strftime('%B %d, %Y'),
        'report': report_sections
    }