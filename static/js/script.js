// ==========================================================================
// SCRIPT.JS — Aravind Kumar V Portfolio
// Features: Canvas hero animation, Navbar scroll, Active nav, Hamburger menu,
//           Project filtering, Project modals (API + fallback), Contact AJAX,
//           Copy-to-clipboard, Toast notifications, Scroll reveal
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

  var navbar        = document.getElementById('mainNavbar');
  var scrollBtn     = document.getElementById('scrollTopBtn');
  var navLinks      = document.querySelectorAll('#navLinks .nav-link');
  var sections      = document.querySelectorAll('section[id]');
  var navToggle     = document.getElementById('navToggle');
  var navMobile     = document.getElementById('navMobile');
  var mobileLinks   = document.querySelectorAll('.mobile-nav-link');
  var toastContainer = document.getElementById('toastContainer');
  var themeToggle    = document.getElementById('themeToggle');
  var mobileThemeToggle = document.getElementById('mobileThemeToggle');

  // ---------------------------------------------------
  // 0. THEME TOGGLE (Day / Night)
  // ---------------------------------------------------
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
    updateMobileToggleLabel(theme);
  }

  function updateMobileToggleLabel(theme) {
    if (!mobileThemeToggle) return;
    var icon = mobileThemeToggle.querySelector('i');
    var label = mobileThemeToggle.querySelector('span');
    if (theme === 'light') {
      if (icon) { icon.className = 'bi bi-sun-fill'; }
      if (label) { label.textContent = 'Dark Mode'; }
    } else {
      if (icon) { icon.className = 'bi bi-moon-fill'; }
      if (label) { label.textContent = 'Light Mode'; }
    }
  }

  // Initialize mobile toggle label
  updateMobileToggleLabel(getCurrentTheme());

  // Desktop toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Mobile toggle
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', function () {
      var newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Helper: get particle color for current theme
  function getParticleColor(opacity) {
    var theme = getCurrentTheme();
    if (theme === 'light') {
      return 'rgba(79, 70, 229, ' + opacity + ')';
    }
    return 'rgba(99, 102, 241, ' + opacity + ')';
  }

  // ---------------------------------------------------
  // 1. TOAST NOTIFICATION
  // ---------------------------------------------------
  function showToast(title, message, type) {
    if (!toastContainer) return;
    type = type || 'success';

    var toast = document.createElement('div');
    toast.className = 'custom-toast toast-' + type;

    var icon = type === 'success' ? 'bi-check-circle-fill' :
               type === 'info' ? 'bi-info-circle-fill' : 'bi-exclamation-circle-fill';

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

    if (scrollBtn) {
      if (scrollY > 350) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
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
        var activeLink = document.querySelector('#navLinks .nav-link[href="#' + id + '"]');
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
  // 5. MOBILE MENU
  // ---------------------------------------------------
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close mobile resume link
    var mobileResumeBtn = navMobile.querySelector('.nav-resume-mobile');
    if (mobileResumeBtn) {
      mobileResumeBtn.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  // ---------------------------------------------------
  // 6. PROJECT FILTERING
  // ---------------------------------------------------
  var filterBtns   = document.querySelectorAll('.proj-filter-btn');
  var projectItems = document.querySelectorAll('.proj-item');
  var featuredProj = document.getElementById('featuredProject');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      var filterValue = this.getAttribute('data-filter');

      // Featured project visibility
      if (featuredProj) {
        var featuredCat = featuredProj.getAttribute('data-category');
        if (filterValue === 'all' || featuredCat === filterValue) {
          featuredProj.style.display = '';
        } else {
          featuredProj.style.display = 'none';
        }
      }

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

  // Client-side fallback data for static hosting
  var PROJECTS_FALLBACK = {
    "1": {
      "id": 1, "title": "ECG, EMG & EOG Signal Anomaly Detection", "category_label": "Biomedical AI",
      "full_desc": "An end-to-end intelligent biomedical diagnostic system that captures analog bio-potential signals (ECG for heart rhythm, EMG for neuromuscular activity, EOG for ocular movement) via BioAmp EXG sensors. The signals are digitized and filtered on ESP32, streamed over Wi-Fi/WebSockets, and evaluated using deep learning (CNN & LSTM) anomaly detection models in TensorFlow to identify arrhythmias and muscle fatigue in real time.",
      "hardware": ["BioAmp EXG Sensor", "ESP32 Microcontroller", "Gel Electrodes", "Analog Filters", "Wi-Fi Module"],
      "software": ["Python 3.11", "TensorFlow / Keras", "ESP-IDF / Arduino C++", "NumPy & SciPy", "Flask WebSockets"],
      "github_url": "https://github.com/Aravindkumar1718"
    },
    "2": {
      "id": 2, "title": "EOG-Controlled Wheelchair with Fall Detection", "category_label": "Assistive Tech",
      "full_desc": "Designed to empower severely paralyzed individuals (e.g., ALS, quadriplegia). Eye movements (left glance, right glance, vertical saccades, blinks) are recorded via surface electrodes, filtered using bandpass analog filters, and classified to drive dual DC motor wheelchair tracks. An onboard MPU6050 IMU continuously monitors sudden tilt anomalies or impact shocks, immediately halting motors and transmitting emergency GPS coordinates to caregivers via GSM.",
      "hardware": ["EOG BioAmp Sensor", "ESP32 DevKit", "MPU6050 Accelerometer/Gyroscope", "L298N Motor Driver", "SIM800L GSM Module", "12V DC Motors"],
      "software": ["C++ / Arduino IDE", "Python Signal Classifier", "Embedded Firmware", "GSM AT Commands"],
      "github_url": "https://github.com/Aravindkumar1718"
    },
    "3": {
      "id": 3, "title": "EMG-Based Smart Wheelchair Navigation", "category_label": "Neuro-Tech",
      "full_desc": "Utilizes Electromyography (EMG) to measure micro-voltage electrical activity generated by voluntary muscle contractions (e.g. forearm, jaw, or bicep flexing). Features a custom hardware amplification stage with low-noise instrumentation amplifiers, followed by feature extraction (Root Mean Square, Mean Absolute Value, Waveform Length) and a real-time machine learning classifier achieving high responsiveness and low false-positive rates.",
      "hardware": ["EMG Muscle Sensor", "ESP32 MCU", "Instrumentation Amp", "H-Bridge Motor Driver", "Chassis & Wheelchair Rig"],
      "software": ["Python", "Scikit-Learn", "Arduino C++", "NumPy", "Real-time Signal DSP"],
      "github_url": "https://github.com/Aravindkumar1718"
    },
    "4": {
      "id": 4, "title": "Smart Agriculture AI & Threat Detection Platform", "category_label": "Smart Agriculture",
      "full_desc": "A smart precision agriculture ecosystem combining computer vision and edge IoT nodes. Deep convolutional neural networks (CNNs) analyze real-time camera feeds to identify foliar crop diseases across 15+ plant species and detect nocturnal wildlife/animal intrusions. Environmental sensor nodes (soil moisture, temperature, humidity, light) dynamically regulate irrigation valves and send instant SMS/Telegram alerts to farmers.",
      "hardware": ["ESP32-CAM", "Raspberry Pi", "Soil Moisture Sensors", "DHT22 Sensor", "Solenoid Water Valves", "Solar Power Unit"],
      "software": ["Python", "TensorFlow / Keras", "OpenCV", "CNN Architecture", "Flask Dashboard", "Twilio API"],
      "github_url": "https://github.com/Aravindkumar1718"
    },
    "5": {
      "id": 5, "title": "Airbag Collision Detection & Safety System", "category_label": "Safety System",
      "full_desc": "An automotive safety module that utilizes high-speed polling of an MPU6050 triple-axis accelerometer. When severe G-force deceleration exceeding pre-calibrated safety boundaries is detected, the controller triggers instantaneous servo-motor airbag deployment in under 25 milliseconds, while concurrently dispatching automated distress SMS messages containing vehicle telemetry to emergency services.",
      "hardware": ["Arduino Nano / ESP32", "MPU6050 IMU", "High-Torque Servo Motor", "SIM800L GSM Module", "Buzzer & Strobe LED"],
      "software": ["Embedded C++", "Kalman Filter Algorithm", "GSM AT Command Protocol"],
      "github_url": "https://github.com/Aravindkumar1718"
    },
    "6": {
      "id": 6, "title": "Non-Invasive Anemia Screening System", "category_label": "Healthcare",
      "full_desc": "A non-invasive, painless diagnostic screening tool developed to evaluate hemoglobin concentrations. Utilizing multi-wavelength optical PPG sensors and machine learning regression algorithms, the device correlates light absorption differentials through the fingertip/palpebral conjunctiva to estimate hemoglobin levels, offering instant screening in rural and resource-limited clinics.",
      "hardware": ["MAX30102 / Optical Sensor", "ESP32 Microcontroller", "OLED Display 0.96 inch", "Rechargeable LiPo Battery"],
      "software": ["Python", "Scikit-Learn Regression", "Arduino IDE", "Data Preprocessing"],
      "github_url": "https://github.com/Aravindkumar1718"
    },
    "7": {
      "id": 7, "title": "Automatic Railway Level Gate Control", "category_label": "Automation",
      "full_desc": "An automated infrastructure safety solution engineered to eliminate accidents at un-manned railway crossings. Infrared obstacle and proximity sensor pairs deployed at track boundaries calculate train approach velocity and arrival timestamps, automatically triggering gate barrier servomotors, signal lights, and warning sirens, with failsafe override mechanisms.",
      "hardware": ["Arduino Mega", "IR Transceiver Sensor Arrays", "Servo Motors", "LED Light Columns", "Alarm Siren"],
      "software": ["Embedded C++", "State Machine Logic", "Timer Interrupts"],
      "github_url": "https://github.com/Aravindkumar1718"
    },
    "8": {
      "id": 8, "title": "Alcohol Detection & Smart Engine Lock for Cars", "category_label": "Driver Safety",
      "full_desc": "A smart preventative automotive system designed to eradicate drunk driving. An MQ-3 semiconductor sensor continuously samples cabin air near the steering column. If blood alcohol content (BAC) surpasses safe thresholds, the system disables the ignition relay preventing engine start, sounds an intermittent alert, and dispatches a GPS-tagged SMS alert to fleet managers or family members.",
      "hardware": ["MQ-3 Gas Sensor", "Arduino Uno / ESP32", "5V Relay Module", "NEO-6M GPS Module", "SIM800L GSM"],
      "software": ["C++ / Arduino", "GPS NMEA Parser", "GSM Alert System"],
      "github_url": "https://github.com/Aravindkumar1718"
    }
  };

  function showProjectModal(project) {
    populateProjectModal(project);
    if (projectModal) projectModal.show();
  }

  document.querySelectorAll('.btn-proj-details').forEach(function (button) {
    button.addEventListener('click', function () {
      var projectId = this.getAttribute('data-project-id');

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
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        showToast('Direct Mail', 'Opening default mail app...', 'info');
        window.location.href = 'mailto:aravidkumaradarsh@gmail.com?subject=' +
          encodeURIComponent(subject || 'Portfolio Inquiry from ' + name) +
          '&body=' + encodeURIComponent('Hi Aravind,\n\n' + message + '\n\nFrom: ' + name + ' (' + email + ')');
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

    revealElements.forEach(function (el, index) {
      // Stagger children inside reveal-stagger containers
      var parent = el.parentElement;
      if (parent && parent.classList.contains('reveal-stagger')) {
        el.style.setProperty('--i', index);
      }
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---------------------------------------------------
  // 11. HERO CANVAS — Connected Particles Network
  // ---------------------------------------------------
  var canvas = document.getElementById('heroCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;
    var connectionDistance = 120;
    var mouseX = -9999;
    var mouseY = -9999;
    var animFrame;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            var opacity = (1 - dist / connectionDistance) * 0.3;
            ctx.strokeStyle = getParticleColor(opacity);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (var k = 0; k < particles.length; k++) {
        var p = particles[k];
        ctx.fillStyle = getParticleColor(0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction (subtle attraction)
        var mx = mouseX - p.x;
        var my = mouseY - p.y;
        var mDist = Math.sqrt(mx * mx + my * my);
        if (mDist < 200) {
          p.vx += mx * 0.00005;
          p.vy += my * 0.00005;
        }

        // Limit velocity
        var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1) {
          p.vx = (p.vx / speed) * 1;
          p.vy = (p.vy / speed) * 1;
        }
      }

      animFrame = requestAnimationFrame(drawParticles);
    }

    // Check reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      resizeCanvas();
      createParticles();
      drawParticles();

      window.addEventListener('resize', function () {
        resizeCanvas();
        createParticles();
      });

      canvas.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });

      canvas.addEventListener('mouseleave', function () {
        mouseX = -9999;
        mouseY = -9999;
      });
    }
  }

}); // end DOMContentLoaded
