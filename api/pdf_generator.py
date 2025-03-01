# api/pdf_generator.py
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch
from io import BytesIO

# PDF configuration
PAGE_MARGIN = 0.5 * inch

# Initialize styles
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name='Content',
    fontSize=10,
    leading=14,
    spaceAfter=6,
    spaceBefore=6
))
styles.add(ParagraphStyle(
    name='CustomHeading2',
    fontSize=14,
    leading=18,
    spaceAfter=6,
    spaceBefore=12,
    fontName='Helvetica-Bold'
))

def generate_pdf_report(report_data, filename=None):
    """Generate PDF report and return bytes."""
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        leftMargin=PAGE_MARGIN,
        rightMargin=PAGE_MARGIN,
        topMargin=PAGE_MARGIN,
        bottomMargin=PAGE_MARGIN
    )
    
    elements = []
    
    # Cover Page
    elements.append(Paragraph("Career Development Report", styles['Title']))
    elements.append(Spacer(1, 24))
    elements.append(Paragraph(f"Prepared for: {report_data['student_name']}", styles['Heading2']))
    elements.append(Paragraph(f"Career Focus: {report_data['career_goal']}", styles['Heading2']))
    elements.append(Paragraph(f"Generated on: {report_data['generated_date']}", styles['Heading2']))
    elements.append(PageBreak())
    
    # Table of Contents
    toc = [
        ["Section", "Page"],
        *[[section.replace('_', ' ').title(), ""] for section in report_data['report'].keys()]
    ]
    
    toc_table = Table(toc, colWidths=[4*inch, 1*inch])
    toc_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.grey),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 12),
        ('BOTTOMPADDING', (0,0), (-1,0), 12),
        ('BACKGROUND', (0,1), (-1,-1), colors.beige),
        ('GRID', (0,0), (-1,-1), 1, colors.black)
    ]))
    
    elements.append(Paragraph("Table of Contents", styles['Heading1']))
    elements.append(Spacer(1, 12))
    elements.append(toc_table)
    elements.append(PageBreak())
    
    # Content Sections
    for section, content in report_data['report'].items():
        elements.append(Paragraph(section.replace('_', ' ').title(), styles['Heading1']))
        elements.append(Spacer(1, 12))
        
        paragraphs = content.split('\n\n')
        for para in paragraphs:
            if para.strip():
                elements.append(Paragraph(para.strip(), styles['Content']))
                elements.append(Spacer(1, 6))
        
        elements.append(PageBreak())
    
    doc.build(elements)
    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes