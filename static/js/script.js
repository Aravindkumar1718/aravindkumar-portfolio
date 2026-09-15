// =========================================================
// SCRIPT.JS — Aravind Kumar V Portfolio (Flask Edition)
// Features: Navbar scroll, Active nav, Project filtering,
//           Project modals, Contact AJAX, Copy-to-clipboard,
//           Toast notifications, Scroll reveal animations
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  const navbar       = document.getElementById('mainNavbar');
  const scrollBtn    = document.getElementById('scrollTopBtn');
  const navLinks     = document.querySelectorAll('#mainNavbar .nav-link');
  const sections     = document.querySelectorAll('section[id]');
  const navCollapse  = document.getElementById('navMenu');
  const toastContainer = document.getElementById('toastContainer');

  // ---------------------------------------------------
  // 1. TOAST NOTIFICATION
  // ---------------------------------------------------
  function showToast(title, message, type) {
    if (!toastContainer) return;
    type = type || 'success';

    const toast = document.createElement('div');
    toast.className = 'custom-toast toast-' + type;

    const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill';

    toast.innerHTML =
      '<div class="toast-ico-wrap"><i class="bi ' + icon + '"></i></div>' +
      '<div class="toast-content">' +
        '<p class="toast-title">' + title + '</p>' +
        '<p class="toast-msg">' + message + '</p>' +
      '</div>';

    toastContainer.appendChild(toast);

    setTimeout(function () {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(function () { toast.remove(); }, 300);
    }, 4000);
  }

  // ---------------------------------------------------
  // 2. SCROLL EFFECTS
  // ---------------------------------------------------
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;

    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 350) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }

    updateActiveLink(scrollY);
  });

  // ---------------------------------------------------
  // 3. ACTIVE NAV LINK (Scroll Spy)
  // ---------------------------------------------------
  function updateActiveLink(scrollY) {
    var offset = 140;

    sections.forEach(function (section) {
      var top    = section.offsetTop - offset;
      var bottom = top + section.offsetHeight;
      var id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var activeLink = document.querySelector('#mainNavbar .nav-link[href="#' + id + '"]');
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  // ---------------------------------------------------
  // 4. SCROLL TO TOP
  // ---------------------------------------------------
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------------------------------------------
  // 5. CLOSE MOBILE MENU ON LINK CLICK
  // ---------------------------------------------------
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse && navCollapse.classList.contains('show')) {
        var bsInstance = bootstrap.Collapse.getInstance(navCollapse);
        if (bsInstance) bsInstance.hide();
      }
    });
  });

  var navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.addEventListener('click', function () {
      if (navCollapse && navCollapse.classList.contains('show')) {
        var bsInstance = bootstrap.Collapse.getInstance(navCollapse);
        if (bsInstance) bsInstance.hide();
      }
    });
  }

  // ---------------------------------------------------
  // 6. PROJECT FILTERING
  // ---------------------------------------------------
  var filterBtns = document.querySelectorAll('.proj-filter-btn');
  var projectItems = document.querySelectorAll('.proj-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      var filterValue = this.getAttribute('data-filter');

      projectItems.forEach(function (item) {
        var itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          setTimeout(function () {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // ---------------------------------------------------
  // 7. PROJECT DETAIL MODAL
  // ---------------------------------------------------
  var projectModalElement = document.getElementById('projectDetailModal');
  var projectModal = projectModalElement ? new bootstrap.Modal(projectModalElement) : null;

  // Client-side dataset fallback for static hosts (GitHub Pages) and offline reliability
  var PROJECTS_FALLBACK = {
  "1": {
    "id": 1,
    "title": "ECG, EMG & EOG Signal Anomaly Detection",
    "category": "biomedical",
    "category_label": "Biomedical AI",
    "short_desc": "Real-time biomedical signal acquisition using BioAmp EXG + ESP32. TensorFlow ML models classify cardiac and muscular anomalies with live health monitoring alerts.",
    "full_desc": "An end-to-end intelligent biomedical diagnostic system that captures analog bio-potential signals (ECG for heart rhythm, EMG for neuromuscular activity, EOG for ocular movement) via BioAmp EXG sensors. The signals are digitized and filtered on ESP32, streamed over Wi-Fi/WebSockets, and evaluated using deep learning (CNN & LSTM) anomaly detection models in TensorFlow to identify arrhythmias and muscle fatigue in real time.",
    "hardware": [
      "BioAmp EXG Sensor",
      "ESP32 Microcontroller",
      "Gel Electrodes",
      "Analog Filters",
      "Wi-Fi Module"
    ],
    "software": [
      "Python 3.11",
      "TensorFlow / Keras",
      "ESP-IDF / Arduino C++",
      "NumPy & SciPy",
      "Flask WebSockets"
    ],
    "tags": [
      "Python",
      "TensorFlow",
      "ESP32",
      "Signal Processing",
      "Keras"
    ],
    "icon": "bi-heart-pulse",
    "gradient": "linear-gradient(135deg, #1a56db 0%, #0ea5e9 100%)",
    "github_url": "https://github.com/Aravindkumar1718",
    "live_demo_available": true
  },
  "2": {
    "id": 2,
    "title": "EOG-Controlled Wheelchair with Fall Detection",
    "category": "assistive",
    "category_label": "Assistive Tech",
    "short_desc": "Hands-free wheelchair controlled by Electrooculography (EOG) eye movement signals with integrated accelerometer fall detection and automated caregiver alerts.",
    "full_desc": "Designed to empower severely paralyzed individuals (e.g., ALS, quadriplegia). Eye movements (left glance, right glance, vertical saccades, blinks) are recorded via surface electrodes, filtered using bandpass analog filters, and classified to drive dual DC motor wheelchair tracks. An onboard MPU6050 IMU continuously monitors sudden tilt anomalies or impact shocks, immediately halting motors and transmitting emergency GPS coordinates to caregivers via GSM.",
    "hardware": [
      "EOG BioAmp Sensor",
      "ESP32 DevKit",
      "MPU6050 Accelerometer/Gyroscope",
      "L298N Motor Driver",
      "SIM800L GSM Module",
      "12V DC Motors"
    ],
    "software": [
      "C++ / Arduino IDE",
      "Python Signal Classifier",
      "Embedded Firmware",
      "GSM AT Commands"
    ],
    "tags": [
      "Arduino",
      "ESP32",
      "EOG Sensors",
      "Python",
      "Motor Control"
    ],
    "icon": "bi-person-wheelchair",
    "gradient": "linear-gradient(135deg, #059669 0%, #34d399 100%)",
    "github_url": "https://github.com/Aravindkumar1718",
    "live_demo_available": true
  },
  "3": {
    "id": 3,
    "title": "EMG-Based Smart Wheelchair Navigation",
    "category": "assistive",
    "category_label": "Neuro-Tech",
    "short_desc": "Muscle contraction EMG signals mapped to wheelchair commands using ML classification for users with severe motor disabilities.",
    "full_desc": "Utilizes Electromyography (EMG) to measure micro-voltage electrical activity generated by voluntary muscle contractions (e.g. forearm, jaw, or bicep flexing). Features a custom hardware amplification stage with low-noise instrumentation amplifiers, followed by feature extraction (Root Mean Square, Mean Absolute Value, Waveform Length) and a real-time machine learning classifier achieving high responsiveness and low false-positive rates.",
    "hardware": [
      "EMG Muscle Sensor",
      "ESP32 MCU",
      "Instrumentation Amp",
      "H-Bridge Motor Driver",
      "Chassis & Wheelchair Rig"
    ],
    "software": [
      "Python",
      "Scikit-Learn",
      "Arduino C++",
      "NumPy",
      "Real-time Signal DSP"
    ],
    "tags": [
      "Arduino IDE",
      "EMG Sensors",
      "Python",
      "ML",
      "Edge AI"
    ],
    "icon": "bi-activity",
    "gradient": "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
    "github_url": "https://github.com/Aravindkumar1718",
    "live_demo_available": true
  },
  "4": {
    "id": 4,
    "title": "Smart Agriculture AI & Threat Detection Platform",
    "category": "vision",
    "category_label": "Smart Agriculture",
    "short_desc": "IoT + AI platform using CNN for leaf disease detection, wildlife intrusion deterrence, and environmental sensors for precision farming alerts.",
    "full_desc": "A smart precision agriculture ecosystem combining computer vision and edge IoT nodes. Deep convolutional neural networks (CNNs) analyze real-time camera feeds to identify foliar crop diseases across 15+ plant species and detect nocturnal wildlife/animal intrusions. Environmental sensor nodes (soil moisture, temperature, humidity, light) dynamically regulate irrigation valves and send instant SMS/Telegram alerts to farmers.",
    "hardware": [
      "ESP32-CAM",
      "Raspberry Pi",
      "Soil Moisture Sensors",
      "DHT22 Sensor",
      "Solenoid Water Valves",
      "Solar Power Unit"
    ],
    "software": [
      "Python",
      "TensorFlow / Keras",
      "OpenCV",
      "CNN Architecture",
      "Flask Dashboard",
      "Twilio API"
    ],
    "tags": [
      "Python",
      "TensorFlow",
      "OpenCV",
      "CNN",
      "IoT Sensors"
    ],
    "icon": "bi-tree",
    "gradient": "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)",
    "github_url": "https://github.com/Aravindkumar1718",
    "live_demo_available": true
  },
  "5": {
    "id": 5,
    "title": "Airbag Collision Detection & Safety System",
    "category": "safety",
    "category_label": "Safety System",
    "short_desc": "MPU6050 IMU detects high-impact collisions, triggers servo-motor airbag simulation, and sends emergency SMS alerts via GSM when G-force exceeds threshold.",
    "full_desc": "An automotive safety module that utilizes high-speed polling of an MPU6050 triple-axis accelerometer. When severe G-force deceleration exceeding pre-calibrated safety boundaries is detected, the controller triggers instantaneous servo-motor airbag deployment in under 25 milliseconds, while concurrently dispatching automated distress SMS messages containing vehicle telemetry to emergency services.",
    "hardware": [
      "Arduino Nano / ESP32",
      "MPU6050 IMU",
      "High-Torque Servo Motor",
      "SIM800L GSM Module",
      "Buzzer & Strobe LED"
    ],
    "software": [
      "Embedded C++",
      "Kalman Filter Algorithm",
      "GSM AT Command Protocol"
    ],
    "tags": [
      "Arduino",
      "C++",
      "MPU6050",
      "GSM",
      "Embedded"
    ],
    "icon": "bi-shield-check",
    "gradient": "linear-gradient(135deg, #dc2626 0%, #f87171 100%)",
    "github_url": "https://github.com/Aravindkumar1718",
    "live_demo_available": true
  },
  "6": {
    "id": 6,
    "title": "Non-Invasive Anemia Screening System",
    "category": "biomedical",
    "category_label": "Healthcare",
    "short_desc": "Non-invasive anemia screening using sensor-based optical health monitoring to detect hemoglobin anomalies without needle blood tests.",
    "full_desc": "A non-invasive, painless diagnostic screening tool developed to evaluate hemoglobin concentrations. Utilizing multi-wavelength optical PPG sensors and machine learning regression algorithms, the device correlates light absorption differentials through the fingertip/palpebral conjunctiva to estimate hemoglobin levels, offering instant screening in rural and resource-limited clinics.",
    "hardware": [
      "MAX30102 / Optical Sensor",
      "ESP32 Microcontroller",
      "OLED Display 0.96 inch",
      "Rechargeable LiPo Battery"
    ],
    "software": [
      "Python",
      "Scikit-Learn Regression",
      "Arduino IDE",
      "Data Preprocessing"
    ],
    "tags": [
      "Arduino",
      "Sensors",
      "Python",
      "Healthcare ML"
    ],
    "icon": "bi-droplet-half",
    "gradient": "linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)",
    "github_url": "https://github.com/Aravindkumar1718",
    "live_demo_available": true
  },
  "7": {
    "id": 7,
    "title": "Automatic Railway Level Gate Control",
    "category": "safety",
    "category_label": "Automation",
    "short_desc": "IR proximity sensors detect approaching trains to automatically control level-crossing gates with audio/visual warnings and real-time automation.",
    "full_desc": "An automated infrastructure safety solution engineered to eliminate accidents at un-manned railway crossings. Infrared obstacle and proximity sensor pairs deployed at track boundaries calculate train approach velocity and arrival timestamps, automatically triggering gate barrier servomotors, signal lights, and warning sirens, with failsafe override mechanisms.",
    "hardware": [
      "Arduino Mega",
      "IR Transceiver Sensor Arrays",
      "Servo Motors",
      "LED Light Columns",
      "Alarm Siren"
    ],
    "software": [
      "Embedded C++",
      "State Machine Logic",
      "Timer Interrupts"
    ],
    "tags": [
      "Arduino",
      "IR Sensors",
      "C++",
      "Servo Motor",
      "Automation"
    ],
    "icon": "bi-train-front",
    "gradient": "linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)",
    "github_url": "https://github.com/Aravindkumar1718",
    "live_demo_available": true
  },
  "8": {
    "id": 8,
    "title": "Alcohol Detection & Smart Engine Lock for Cars",
    "category": "safety",
    "category_label": "Driver Safety",
    "short_desc": "MQ-3 sensor detects driver intoxication above legal BAC, disables vehicle ignition via relay, and sends GPS-tagged emergency SMS via GSM module.",
    "full_desc": "A smart preventative automotive system designed to eradicate drunk driving. An MQ-3 semiconductor sensor continuously samples cabin air near the steering column. If blood alcohol content (BAC) surpasses safe thresholds, the system disables the ignition relay preventing engine start, sounds an intermittent alert, and dispatches a GPS-tagged SMS alert to fleet managers or family members.",
    "hardware": [
      "MQ-3 Gas Sensor",
      "Arduino Uno / ESP32",
      "5V Relay Module",
      "NEO-6M GPS Module",
      "SIM800L GSM"
    ],
    "software": [
      "C++ / Arduino",
      "GPS NMEA Parser",
      "GSM Alert System"
    ],
    "tags": [
      "Arduino",
      "MQ-3",
      "GSM",
      "GPS",
      "Safety"
    ],
    "icon": "bi-car-front",
    "gradient": "linear-gradient(135deg, #ea580c 0%, #fb923c 100%)",
    "github_url": "https://github.com/Aravindkumar1718",
    "live_demo_available": true
  }
};

  function showProjectModal(project) {
    populateProjectModal(project);
    if (projectModal) projectModal.show();
  }

  document.querySelectorAll('.btn-proj-details').forEach(function (button) {
    button.addEventListener('click', function () {
      var projectId = this.getAttribute('data-project-id');

      // Attempt API fetch first, fall back to client dataset if offline or static
      fetch('/api/projects/' + projectId)
        .then(function (response) {
          if (!response.ok) throw new Error('API unavailable');
          return response.json();
        })
        .then(function (data) {
          if (data.success && data.project) {
            showProjectModal(data.project);
          } else if (PROJECTS_FALLBACK[projectId]) {
            showProjectModal(PROJECTS_FALLBACK[projectId]);
          }
        })
        .catch(function () {
          if (PROJECTS_FALLBACK[projectId]) {
            showProjectModal(PROJECTS_FALLBACK[projectId]);
          } else {
            showToast('Error', 'Unable to load project details.', 'error');
          }
        });
    });
  });
  });

  function populateProjectModal(project) {
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectBadge').textContent = project.category_label;
    document.getElementById('modalProjectDesc').textContent = project.full_desc;

    var hwContainer = document.getElementById('modalHardwareSpecs');
    hwContainer.innerHTML = '';
    if (project.hardware && project.hardware.length) {
      project.hardware.forEach(function (hw) {
        var chip = document.createElement('span');
        chip.className = 'spec-chip';
        chip.textContent = hw;
        hwContainer.appendChild(chip);
      });
    }

    var swContainer = document.getElementById('modalSoftwareStack');
    swContainer.innerHTML = '';
    if (project.software && project.software.length) {
      project.software.forEach(function (sw) {
        var chip = document.createElement('span');
        chip.className = 'spec-chip';
        chip.textContent = sw;
        swContainer.appendChild(chip);
      });
    }

    var modalGhBtn = document.getElementById('modalGithubBtn');
    if (modalGhBtn) {
      modalGhBtn.href = project.github_url || 'https://github.com/Aravindkumar1718';
    }
  }

  // ---------------------------------------------------
  // 8. CONTACT FORM AJAX
  // ---------------------------------------------------
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput    = document.getElementById('contactName');
      var emailInput   = document.getElementById('contactEmail');
      var subjectInput = document.getElementById('contactSubject');
      var messageInput = document.getElementById('contactMessage');
      var submitBtn    = document.getElementById('btnSubmitContact');

      var name    = nameInput.value.trim();
      var email   = emailInput.value.trim();
      var subject = subjectInput.value.trim();
      var message = messageInput.value.trim();

      if (!name || !email || !message) {
        showToast('Missing Fields', 'Please fill in Name, Email, and Message.', 'error');
        return;
      }

      var originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending...';

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
      })
      .then(function (response) {
        return response.json().then(function (data) {
          return { status: response.status, body: data };
        });
      })
      .then(function (result) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (result.status === 200 && result.body.success) {
          showToast('Message Sent!', result.body.message, 'success');
          contactForm.reset();
        } else {
          showToast('Failed', result.body.error || 'Please try again.', 'error');
        }
      })
      .catch(function (error) {
        console.error('Contact error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        showToast('Direct Mail', 'Opening default mail app...', 'info');
        window.location.href = 'mailto:aravindkumarv1718@gmail.com?subject=' + encodeURIComponent(subject || 'Portfolio Inquiry from ' + name) + '&body=' + encodeURIComponent('Hi Aravind,\n\n' + message + '\n\nFrom: ' + name + ' (' + email + ')');
      });
    });
  }

  // ---------------------------------------------------
  // 9. COPY TO CLIPBOARD
  // ---------------------------------------------------
  document.querySelectorAll('[data-copy-text]').forEach(function (element) {
    element.addEventListener('click', function (e) {
      e.preventDefault();
      var textToCopy = this.getAttribute('data-copy-text');
      var label = this.getAttribute('data-copy-label') || 'Text';

      navigator.clipboard.writeText(textToCopy).then(function () {
        showToast('Copied!', label + ' copied: ' + textToCopy, 'success');
      }).catch(function (err) {
        console.error('Copy failed:', err);
      });
    });
  });

  // ---------------------------------------------------
  // 10. SCROLL REVEAL (IntersectionObserver)
  // ---------------------------------------------------
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

}); // end DOMContentLoaded
