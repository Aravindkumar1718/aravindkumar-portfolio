import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf():
    os.makedirs('static/docs', exist_ok=True)
    os.makedirs('assets', exist_ok=True)
    
    pdf_path = 'static/docs/Aravind_Kumar_V_Resume.pdf'
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    primary_color = colors.HexColor('#0284c7')
    dark_color = colors.HexColor('#0f172a')
    gray_color = colors.HexColor('#475569')

    name_style = ParagraphStyle(
        'Name',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=1
    )

    sub_head = ParagraphStyle(
        'SubHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=dark_color,
        alignment=1
    )

    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=gray_color,
        alignment=1
    )

    section_head = ParagraphStyle(
        'SectionHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=primary_color,
        spaceBefore=7,
        spaceAfter=2
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12.5,
        textColor=dark_color
    )

    right_align = ParagraphStyle(
        'RightAlign',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=gray_color,
        alignment=2
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=dark_color
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=dark_color,
        leftIndent=10
    )

    story = []

    # Header
    story.append(Paragraph('ARAVIND KUMAR V', name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph('IoT & Machine Learning Engineer | B.Tech AI & Data Science', sub_head))
    story.append(Spacer(1, 2))
    story.append(Paragraph('Puducherry, India | +91 9489394453 | aravidkumaradarsh@gmail.com', contact_style))
    story.append(Paragraph('LinkedIn: linkedin.com/in/aravind-kumar-6018b425b | GitHub: github.com/Aravindkumar1718', contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width='100%', thickness=1.5, color=primary_color, spaceBefore=2, spaceAfter=5))

    # Professional Summary
    story.append(Paragraph('PROFESSIONAL SUMMARY', section_head))
    story.append(Paragraph('Innovative AI and IoT Developer with strong expertise in Machine Learning, embedded systems, and real-time signal processing. Final year B.Tech student specializing in Artificial Intelligence and Data Science at SMVEC Puducherry with hands-on experience in developing intelligent IoT solutions for healthcare, agriculture, and assistive technologies. Proficient in Python, TensorFlow, ESP32, and Arduino.', body_style))
    story.append(Spacer(1, 3))

    # Education
    story.append(Paragraph('EDUCATION', section_head))
    edu_data = [
        [
            Paragraph('<b>B.Tech in Artificial Intelligence & Data Science</b> (Final Year)<br/><font color="#64748b">Sri Manakula Vinayagar Engineering College, Puducherry</font>', body_style),
            Paragraph('<b>2022 – 2026</b><br/><b>CGPA: 6.88 / 10</b>', right_align)
        ],
        [
            Paragraph('<b>Higher Secondary Certificate (HSC)</b> – Class 12 (State Board)<br/><font color="#64748b">Amalorpavam Hr. Sec. School, Puducherry</font>', body_style),
            Paragraph('<b>2022</b><br/>Score: 62%', right_align)
        ]
    ]
    t_edu = Table(edu_data, colWidths=[380, 150])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 3))

    # Technical Skills
    story.append(Paragraph('TECHNICAL SKILLS', section_head))
    skills_data = [
        [Paragraph('<b>Programming:</b>', body_style), Paragraph('Python, C, HTML, CSS, JavaScript (Basic)', body_style)],
        [Paragraph('<b>IoT & Embedded Systems:</b>', body_style), Paragraph('Arduino IDE, ESP32, Raspberry Pi, Sensor Integration, Real-Time Data Acquisition, Signal Processing', body_style)],
        [Paragraph('<b>Web Development:</b>', body_style), Paragraph('Flask, RESTful APIs, SQL', body_style)],
        [Paragraph('<b>Machine Learning & AI:</b>', body_style), Paragraph('TensorFlow, Keras, PyTorch, CNN, Image Processing', body_style)],
        [Paragraph('<b>Data Science:</b>', body_style), Paragraph('Pandas, NumPy, Matplotlib, Seaborn, Data Preprocessing', body_style)]
    ]
    st = Table(skills_data, colWidths=[130, 400])
    st.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(st)
    story.append(Spacer(1, 3))

    # Professional Experience
    story.append(Paragraph('PROFESSIONAL EXPERIENCE', section_head))

    exp1 = [
        [Paragraph('<b>IoT + ML Developer Intern</b> | Edusphere Solutions, Puducherry', item_title), Paragraph('<b>Mar 2026 – Jun 2026</b>', right_align)]
    ]
    t_exp1 = Table(exp1, colWidths=[380, 150])
    t_exp1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_exp1)
    story.append(Paragraph('• Developed and deployed real-time IoT and Machine Learning systems using Arduino IDE, ESP32, and Python.', bullet_style))
    story.append(Paragraph('• Built intelligent systems integrating bio-sensors, microcontrollers, and ML models for data-driven decisions.', bullet_style))
    story.append(Paragraph('• Engineered Flask web applications for IoT sensor visualization, telemetry monitoring, and real-time analytics.', bullet_style))
    story.append(Spacer(1, 2))

    exp2 = [
        [Paragraph('<b>Python Developer Intern</b> | Edusphere Solutions, Puducherry', item_title), Paragraph('<b>Sep 2025 – Dec 2025</b>', right_align)]
    ]
    t_exp2 = Table(exp2, colWidths=[380, 150])
    t_exp2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_exp2)
    story.append(Paragraph('• Developed Python applications and automated scripts for structured data processing and analytics workflows.', bullet_style))
    story.append(Paragraph('• Implemented data preprocessing pipelines and feature engineering techniques for machine learning models.', bullet_style))
    story.append(Spacer(1, 3))

    # Key Projects
    story.append(Paragraph('KEY PROJECTS', section_head))
    story.append(Paragraph('• <b>Real-Time ECG, EMG, EOG Signal Acquisition & Anomaly Detection:</b> Developed end-to-end bio-signal capture system using BioAmp EXG + ESP32. Built TensorFlow deep learning models classifying arrhythmias and muscular anomalies with live alerts.', bullet_style))
    story.append(Paragraph('• <b>EOG Wheelchair with Fall Detection:</b> Hands-free assistive wheelchair guided by eye movement signals (EOG) with MPU6050 IMU fall detection and automated GSM caregiver SMS alerts.', bullet_style))
    story.append(Paragraph('• <b>EMG-Based Wheelchair Control System:</b> Machine learning classification of muscle contraction signals to drive directional wheelchair motion for motor-impaired individuals.', bullet_style))
    story.append(Paragraph('• <b>Smart Agriculture AI & Threat Detection:</b> CNN-powered foliar leaf disease detection and wildlife intrusion monitoring with automated sensor-based irrigation control.', bullet_style))
    story.append(Paragraph('• <b>Airbag Collision Detection & Safety:</b> MPU6050 G-force shock detection triggering servo airbag simulation & emergency GSM distress SMS.', bullet_style))
    story.append(Spacer(1, 3))

    # Certifications & Achievements
    story.append(Paragraph('CERTIFICATIONS & ACHIEVEMENTS', section_head))
    story.append(Paragraph('• <b>Introduction to Machine Learning</b> & <b>Python for Data Science</b>', bullet_style))
    story.append(Paragraph('• <b>AWS Academy Graduate</b> – AWS Academy Cloud Foundations', bullet_style))
    story.append(Paragraph('• <b>Datathon Participant (SRM University, Feb 2025)</b> – National-level Data Science Hackathon', bullet_style))

    doc.build(story)
    print(f'Successfully built PDF at {pdf_path}')

    # Copy files to multiple standard locations
    shutil.copy(pdf_path, 'assets/Aravind_Kumar_V_Resume.pdf')
    shutil.copy(pdf_path, 'assets/Aravind_Kumar_V_CV.pdf')
    shutil.copy(pdf_path, 'Aravind_Kumar_V_Resume.pdf')
    shutil.copy('static/docs/Aravind_Kumar_V_CV.docx', 'assets/Aravind_Kumar_V_Resume.docx')
    shutil.copy('static/docs/Aravind_Kumar_V_CV.docx', 'Aravind_Kumar_V_Resume.docx')
    print('Copied resume files to assets/ and root directories.')

if __name__ == '__main__':
    generate_pdf()
