# Aravind Kumar V — Personal Developer Portfolio

[![Portfolio Live](https://img.shields.io/badge/Portfolio-Live%20Demo-blue?style=for-the-badge&logo=github)](https://aravindkumar1718.github.io/aravindkumar-portfolio/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-black?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A personal portfolio website showcasing real-world projects across **Biomedical AI**, **IoT & Embedded Systems**, **Computer Vision**, and **Full-Stack Web Development**.

Designed with a focus on engineering credibility, performance, accessibility, and high conversion for recruiters and engineering teams.

---

## 👨‍💻 About Me

- 🎓 **Education:** Final-year B.Tech in Artificial Intelligence & Data Science at Sri Manakula Vinayagar Engineering College (SMVEC), Puducherry (CGPA: 8.35/10).
- 🔬 **Focus Areas:** Biomedical signal processing, edge machine learning, embedded firmware (ESP32/Arduino), and Python application engineering.
- 💡 **Passion:** Bridging the physical and digital worlds — capturing analog sensor signals and turning them into real-time intelligent decisions.

---

## 🛠️ Technical Skills

| Domain | Technologies & Tools |
|---|---|
| **Programming** | Python, C, HTML5, CSS3, JavaScript (Basic) |
| **IoT & Embedded Systems** | Arduino IDE, ESP32, Raspberry Pi, Sensor Integration, Real-Time Data Acquisition, Signal Processing |
| **Web Development** | Flask, RESTful APIs, SQL |
| **Machine Learning & AI** | TensorFlow, Keras, PyTorch, CNN, Image Processing |
| **Data Science** | Pandas, NumPy, Matplotlib, Seaborn, Data Preprocessing |

---

## 🚀 Featured Projects

1. **ECG, EMG & EOG Signal Anomaly Detection**
   - *Biomedical AI:* Real-time acquisition via BioAmp EXG + ESP32. TensorFlow CNN/LSTM models for arrhythmia and muscle fatigue classification.
2. **EOG-Controlled Wheelchair with Fall Detection**
   - *Assistive Tech:* Hands-free mobility mapped to eye movements via electrooculography, integrated with MPU6050 fall detection and GSM alert telemetry.
3. **EMG-Based Smart Wheelchair Navigation**
   - *Neuro-Tech:* Micro-voltage muscular contraction signals mapped to motor commands via custom amplification stage and low-latency classification.
4. **Smart Agriculture AI & Threat Detection Platform**
   - *Vision & Edge IoT:* Deep CNNs for 15+ crop leaf disease detection, nocturnal wildlife intrusion alert, and automated precision irrigation.
5. **Airbag Collision Detection & Safety System**
   - *Automotive Safety:* High-rate MPU6050 polling triggering rapid servo-motor airbag simulation and emergency SMS dispatch in <25ms.
6. **Non-Invasive Anemia Screening System**
   - *Healthcare ML:* Optical PPG sensor-based hemoglobin level estimation using ML regression to eliminate painful needle blood draws.
7. **Automatic Railway Level Gate Control**
   - *Automation:* IR proximity sensors and embedded state-machine logic for collision-free automatic level-crossing gate operations.
8. **Alcohol Detection & Smart Engine Lock**
   - *Driver Safety:* MQ-3 gas sensor threshold detection disabling ignition relay with GPS-tagged emergency distress alerts.

---

## 📂 Project Architecture

```
my_personals/
├── app.py                      # Flask backend (REST APIs, routes, resume delivery)
├── requirements.txt            # Python dependencies (Flask, Gunicorn)
├── index.html                  # Production-ready static build (GitHub Pages ready)
├── style.css                   # Root stylesheet (synced with static/css)
├── script.js                   # Root client script (synced with static/js)
├── templates/
│   └── index.html              # Jinja2 Flask template with SEO tags & modal architecture
├── static/
│   ├── css/
│   │   └── style.css           # Design system (dark theme, tokens, responsive layout)
│   ├── js/
│   │   └── script.js           # Filtering, modal controller, scroll reveal, AJAX contact
│   └── docs/
│       ├── Aravind_Kumar_V_Resume.pdf   # Official ATS Resume (PDF)
│       └── Aravind_Kumar_V_Resume.docx  # Editable ATS Resume (DOCX)
└── README.md                   # Repository documentation
```

---

## ⚡ Getting Started Locally

### Option 1: Run with Flask (Recommended for full backend)

```bash
# 1. Clone repository
git clone https://github.com/Aravindkumar1718/aravindkumar-portfolio.git
cd aravindkumar-portfolio

# 2. (Optional) Create virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start Flask server
python app.py
```
Open your browser and navigate to: `http://127.0.0.1:5000`

### Option 2: Run as Static Site (GitHub Pages / Direct Browser)

Simply open `index.html` in any modern web browser or host directly with GitHub Pages. All modals, project datasets, and email fallbacks work client-side seamlessly!

---

## 📬 Contact & Connect

- **Email:** [aravindkumarv1718@gmail.com](mailto:aravindkumarv1718@gmail.com)
- **LinkedIn:** [linkedin.com/in/aravind-kumar-v](https://linkedin.com/in/aravind-kumar-v)
- **GitHub:** [github.com/Aravindkumar1718](https://github.com/Aravindkumar1718)
- **Location:** Puducherry, India
