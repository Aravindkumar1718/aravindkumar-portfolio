# Aravind Kumar V — Portfolio

AI, ML & IoT Developer portfolio — built with Flask & Python.

## Live Demo

Deployed on [Render](https://render.com).

## Tech Stack

- **Backend:** Flask (Python)
- **Frontend:** HTML, CSS, JavaScript
- **Icons:** Bootstrap Icons
- **Fonts:** Inter (Google Fonts)
- **Production Server:** Gunicorn

## Features

- Responsive design (mobile, tablet, desktop)
- Day/Night theme toggle with localStorage persistence
- Interactive canvas particle animation
- Project filtering by category
- Project detail modals with hardware/software specs
- Contact form with AJAX submission + mailto fallback
- Resume download (PDF/DOCX) + inline preview
- Copy-to-clipboard for contact information
- Scroll reveal animations
- SEO optimized with Open Graph metadata
- Accessible (keyboard navigation, focus states, semantic HTML)

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python app.py

# Open http://localhost:5000
```

## Deploy to Render

1. Push to GitHub
2. Connect the repository on [Render Dashboard](https://dashboard.render.com)
3. Render will auto-detect `render.yaml` configuration
4. **Build Command:** `pip install -r requirements.txt`
5. **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT`

### Environment Variables (set in Render)

| Variable | Value |
|---|---|
| `SECRET_KEY` | Auto-generated |
| `FLASK_ENV` | `production` |
| `PYTHON_VERSION` | `3.11.0` |

## Project Structure

```
├── app.py                    # Flask backend + routes + data
├── templates/
│   └── index.html            # Jinja2 template
├── static/
│   ├── css/style.css         # Design system + light/dark themes
│   ├── js/script.js          # Client-side interactions
│   └── docs/                 # Resume files (PDF + DOCX)
├── index.html                # Pre-rendered static page (GitHub Pages)
├── style.css                 # Root copy for static hosting
├── script.js                 # Root copy for static hosting
├── requirements.txt          # Python dependencies
├── Procfile                  # Gunicorn start command
├── render.yaml               # Render deployment config
└── README.md
```

## Contact

- **Email:** aravidkumaradarsh@gmail.com
- **LinkedIn:** [linkedin.com/in/aravind-kumar](https://linkedin.com/in/aravind-kumar-6018b425b)
- **GitHub:** [github.com/Aravindkumar1718](https://github.com/Aravindkumar1718)

---

© 2026 Aravind Kumar V
