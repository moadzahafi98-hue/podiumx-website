document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const toggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const currentPage = body.dataset.page;
  if (currentPage) {
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      if (link.dataset.page === currentPage) {
        link.classList.add('active');
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const testimonials = Array.from(document.querySelectorAll('[data-testimonial]'));
  const nextBtn = document.querySelector('[data-testimonial-next]');
  const prevBtn = document.querySelector('[data-testimonial-prev]');
  let testimonialIndex = 0;

  const showTestimonial = (index) => {
    testimonials.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  };

  if (testimonials.length) {
    showTestimonial(testimonialIndex);

    const advance = (direction) => {
      testimonialIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
      showTestimonial(testimonialIndex);
    };

    nextBtn?.addEventListener('click', () => advance(1));
    prevBtn?.addEventListener('click', () => advance(-1));

    setInterval(() => advance(1), 8000);
  }

  const newsletterForm = document.querySelector('[data-newsletter-form]');
  const newsletterFeedback = document.querySelector('[data-newsletter-feedback]');
  if (newsletterForm && newsletterFeedback) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(newsletterForm);
      const email = formData.get('email');
      if (!email) return;

      newsletterFeedback.textContent = 'Subscribing...';
      setTimeout(() => {
        newsletterFeedback.textContent = 'Welcome to the PodiumX performance community!';
        newsletterForm.reset();
        setTimeout(() => {
          newsletterFeedback.textContent = '';
        }, 4000);
      }, 800);
    });
  }

  document.querySelectorAll('[data-booking-form]').forEach((form) => {
    const feedback = form.nextElementSibling;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (feedback) {
        feedback.textContent = 'Booking request received — a PodiumX coach will contact you within 24 hours.';
        feedback.classList.add('alert');
      }
      form.reset();
    });
  });

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const feedback = form.nextElementSibling;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (feedback) {
        feedback.textContent = 'Message sent! Our front desk will reply shortly.';
        feedback.classList.add('alert');
      }
      form.reset();
    });
  });

  document.querySelectorAll('[data-login-form]').forEach((form) => {
    const feedback = form.nextElementSibling;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (feedback) {
        feedback.textContent = 'Demo login complete. Contact the PodiumX team for full portal access.';
        feedback.classList.add('alert');
      }
      form.reset();
    });
  });

  const chatLog = document.querySelector('[data-ai-chat-log]');
  const chatForm = document.querySelector('[data-ai-chat-form]');
  if (chatLog && chatForm) {
    const messageField = chatForm.querySelector('textarea[name="message"]');
    const quickPrompts = document.querySelectorAll('[data-ai-prompt]');

    const addMessage = (text, role) => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${role}`;
      bubble.textContent = text;
      chatLog.appendChild(bubble);
      chatLog.scrollTop = chatLog.scrollHeight;
    };

    const buildAiResponse = (input) => {
      const lower = input.toLowerCase();
      const recommendations = [];

      if (/(carb|carbohydrate|fuel)/.test(lower)) {
        recommendations.push('Target 1.2-1.4 g of carbohydrates per kg in the 24 hours before priority sessions.');
      }
      if (/(protein|recover|repair)/.test(lower)) {
        recommendations.push('Anchor protein every ~4 hours at 0.35 g per kg to support muscle repair.');
      }
      if (/(hydration|water|fluid)/.test(lower)) {
        recommendations.push('Aim for 35-45 ml per kg plus 500 ml per intense session. Include electrolytes in hot environments.');
      }
      if (/(sore|fatigue|tired|recovery)/.test(lower)) {
        recommendations.push('Dial intensity back to RPE 6-7 and use contrast recovery or mobility work to restore readiness.');
      }
      if (/(speed|sprint|power)/.test(lower)) {
        recommendations.push('Keep neural work early in the session after a full dynamic warm-up and long rest intervals.');
      }
      if (!recommendations.length) {
        recommendations.push('I recommend using the assessment summaries to benchmark calories, sleep, and session readiness this week.');
      }

      return `Here's how I would approach it:\n- ${recommendations.join('\n- ')}\nLet me know how this aligns with your availability on the calendar and we can tighten the plan.`;
    };

    quickPrompts.forEach((button) => {
      button.addEventListener('click', () => {
        if (messageField) {
          messageField.value = button.textContent.trim();
          messageField.focus();
        }
      });
    });

    chatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!messageField) return;
      const message = messageField.value.trim();
      if (!message) return;

      addMessage(message, 'user');
      messageField.value = '';

      setTimeout(() => {
        const response = buildAiResponse(message);
        addMessage(response, 'ai');
      }, 400);
    });
  }

  const nutritionForm = document.querySelector('[data-nutrition-form]');
  const nutritionOutput = document.querySelector('[data-nutrition-output]');
  if (nutritionForm && nutritionOutput) {
    nutritionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(nutritionForm);
      const toNumber = (value) => {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : 0;
      };

      const weight = toNumber(formData.get('weight'));
      const height = toNumber(formData.get('height'));
      const age = toNumber(formData.get('age'));
      const gender = formData.get('gender');
      const goal = formData.get('goal');
      const activity = formData.get('activity');
      const sleep = formData.get('sleep');
      const stress = formData.get('stress');
      const hydration = formData.get('hydration');

      let bmr = 10 * weight + 6.25 * height - 5 * age;
      if (gender === 'male') bmr += 5;
      else if (gender === 'female') bmr -= 161;
      else bmr -= 80;

      const activityFactor = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        athlete: 1.9,
      }[activity] || 1.4;

      let totalCalories = bmr * activityFactor;
      const coachNotes = [];

      if (goal === 'fat-loss') {
        totalCalories *= 0.85;
        coachNotes.push('Maintain a 15% deficit while keeping protein higher to protect lean mass.');
      } else if (goal === 'muscle-gain') {
        totalCalories *= 1.1;
        coachNotes.push('Add a 10% surplus with an emphasis on peri-training carbohydrates.');
      } else {
        coachNotes.push('Fuel at maintenance to support consistent performance and recovery.');
      }

      const proteinMultiplier = goal === 'muscle-gain' ? 2.2 : goal === 'fat-loss' ? 2 : 1.8;
      const fatMultiplier = goal === 'fat-loss' ? 0.9 : 1.1;
      const proteinGrams = Math.max(Math.round(weight * proteinMultiplier), 90);
      const fatGrams = Math.max(Math.round(weight * fatMultiplier * 0.45), 40);
      const proteinCalories = proteinGrams * 4;
      const fatCalories = fatGrams * 9;
      const remainingCalories = Math.max(totalCalories - (proteinCalories + fatCalories), totalCalories * 0.3);
      const carbGrams = Math.max(Math.round(remainingCalories / 4), 90);
      const hydrationTarget = weight ? `${Math.round(weight * 0.04 * 1000) / 1000} L` : '3.0 L';

      if (sleep && Number(sleep) < 7) {
        coachNotes.push('Prioritize 7-9 hours of sleep to normalize appetite hormones.');
      }
      if (stress === 'high') {
        coachNotes.push('Layer in magnesium-rich foods and breathwork to down-regulate stress.');
      }
      if (!hydration) {
        coachNotes.push('Log hydration daily so we can correlate intake to readiness scores.');
      } else {
        coachNotes.push('Hydration notes recorded – we will pair this with sweat testing during evaluations.');
      }

      const formatter = new Intl.NumberFormat('en-US');
      const macroList = `Protein: ${formatter.format(proteinGrams)} g | Carbs: ${formatter.format(carbGrams)} g | Fats: ${formatter.format(fatGrams)} g`;
      const energyLine = `${formatter.format(Math.round(totalCalories))} kcal per day`;

      nutritionOutput.innerHTML = `
        <div class="output-grid">
          <div>
            <h4>Daily Energy</h4>
            <p>${energyLine}</p>
            <p>Activity factor: ${activityFactor.toFixed(2)}</p>
          </div>
          <div>
            <h4>Macro Targets</h4>
            <p>${macroList}</p>
          </div>
          <div>
            <h4>Hydration Baseline</h4>
            <p>${hydrationTarget} minimum</p>
          </div>
        </div>
        <div>
          <h4>Practitioner Notes</h4>
          <ul class="list-check">${coachNotes.map((note) => `<li>${note}</li>`).join('')}</ul>
        </div>
      `;
    });
  }

  const trainingForm = document.querySelector('[data-training-form]');
  const trainingOutput = document.querySelector('[data-training-output]');
  if (trainingForm && trainingOutput) {
    trainingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(trainingForm);
      const experience = Number(formData.get('experience') || 0);
      const goalText = (formData.get('goal') || '').toLowerCase();
      const days = formData.getAll('days');
      const sessionLength = formData.get('sessionLength');
      const preferredTime = formData.get('times');
      const injuries = formData.get('injuries');
      const limiters = formData.get('limiters');
      const support = formData.getAll('support');

      const planKey = goalText.includes('strength') || goalText.includes('power') ? 'strength'
        : goalText.includes('hypertrophy') || goalText.includes('muscle') ? 'hypertrophy'
        : goalText.includes('endurance') || goalText.includes('aerobic') || goalText.includes('marathon') ? 'conditioning'
        : goalText.includes('speed') || goalText.includes('sprint') ? 'speed'
        : 'balanced';

      const focusLibrary = {
        strength: ['Max Strength', 'Dynamic Effort', 'Accessory Hypertrophy', 'Aerobic Flush', 'Mobility & Tissue'],
        hypertrophy: ['Upper Push', 'Lower Strength', 'Upper Pull', 'Metabolic Conditioning', 'Mobility / Abs'],
        conditioning: ['Engine Intervals', 'Tempo Run/Bike', 'Strength Maintenance', 'Skill & Mobility', 'Regeneration'],
        speed: ['Acceleration', 'Max Velocity', 'Strength Support', 'Plyometrics & Mobility', 'Regeneration'],
        balanced: ['Strength Base', 'Power Development', 'Conditioning Interval', 'Mobility & Core', 'Recovery & Breathwork'],
      };

      const focusPlan = focusLibrary[planKey];
      const scheduledSessions = days.map((day, index) => ({
        day,
        focus: focusPlan[index % focusPlan.length],
      }));

      let blockLength = '4-week onboarding block';
      if (experience >= 5) blockLength = '6-week performance block';
      else if (experience >= 2) blockLength = '5-week strength build';

      const supportNotes = support.length ? support.map((item) => item.charAt(0).upper() + item.slice(1)).join(', ') : 'Core coaching only';

      const riskNotes = [];
      if (injuries) riskNotes.push('Flag injuries for regression pathways.');
      if (limiters) riskNotes.push('Integrate limiter work into warm-ups and auxiliaries.');
      if (!riskNotes.length) riskNotes.push('No major constraints reported — progress volume as tolerated.');

      trainingOutput.innerHTML = `
        <div class="output-grid">
          <div>
            <h4>Block Structure</h4>
            <p>${blockLength}</p>
            <p>Session length: ${sessionLength} minutes • Preferred window: ${preferredTime}</p>
          </div>
          <div>
            <h4>Weekly Focus</h4>
            <ul>${scheduledSessions.map(({ day, focus }) => `<li><strong>${day}:</strong> ${focus}</li>`).join('')}</ul>
          </div>
          <div>
            <h4>Support Services</h4>
            <p>${supportNotes}</p>
          </div>
        </div>
        <div>
          <h4>Coach Checklist</h4>
          <ul class="list-check">${riskNotes.map((note) => `<li>${note}</li>`).join('')}</ul>
        </div>
      `;
    });
  }

  const calendarContainer = document.querySelector('[data-session-calendar]');
  const calendarFilter = document.querySelector('[data-calendar-filter]');
  const calendarSummary = document.querySelector('[data-calendar-summary]');
  if (calendarContainer && calendarFilter && calendarSummary) {
    const sessionMatrix = [
      { focus: 'strength', label: 'Strength Pod', start: '06:30', end: '07:30', capacity: 8 },
      { focus: 'conditioning', label: 'Conditioning Track', start: '12:15', end: '13:15', capacity: 10 },
      { focus: 'strength', label: 'Strength Pod', start: '18:00', end: '19:15', capacity: 8 },
      { focus: 'recovery', label: 'Recovery Suite', start: '19:30', end: '20:15', capacity: 6 },
      { focus: 'evaluation', label: 'Performance Evaluation', start: '10:00', end: '10:45', capacity: 3 },
    ];

    const buildCalendar = (filterFocus = 'all') => {
      calendarContainer.innerHTML = '';
      const today = new Date();

      for (let i = 0; i < 14; i += 1) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        const dayCard = document.createElement('div');
        dayCard.className = 'calendar-day';
        const header = document.createElement('header');
        const title = document.createElement('strong');
        title.textContent = dayName;
        const sub = document.createElement('span');
        sub.textContent = monthDay;
        header.appendChild(title);
        header.appendChild(sub);
        dayCard.appendChild(header);

        sessionMatrix.forEach((session) => {
          if (filterFocus !== 'all' && session.focus !== filterFocus) return;
          const slot = document.createElement('div');
          slot.className = 'session-slot';
          slot.dataset.focus = session.focus;
          const label = document.createElement('div');
          label.innerHTML = `<strong>${session.label}</strong>`;
          const timing = document.createElement('div');
          timing.textContent = `${session.start} – ${session.end}`;
          const spots = document.createElement('div');
          spots.textContent = `${session.capacity} spots remaining`;
          const action = document.createElement('button');
          action.type = 'button';
          action.textContent = 'Reserve';

          action.addEventListener('click', () => {
            if (session.capacity <= 0) return;
            session.capacity -= 1;
            spots.textContent = `${session.capacity} spots remaining`;
            if (session.capacity <= 0) {
              action.disabled = true;
              slot.classList.add('full');
            }
            calendarSummary.innerHTML = `<strong>Reserved:</strong> ${session.label} on ${dayName} at ${session.start}. Please confirm in the member portal within 30 minutes.`;
          });

          if (session.capacity <= 0) {
            action.disabled = true;
            slot.classList.add('full');
          }

          slot.appendChild(label);
          slot.appendChild(timing);
          slot.appendChild(spots);
          slot.appendChild(action);
          dayCard.appendChild(slot);
        });

        calendarContainer.appendChild(dayCard);
      }
    };

    buildCalendar();

    calendarFilter.addEventListener('change', () => {
      buildCalendar(calendarFilter.value);
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const indicator = question?.querySelector('[data-indicator]');
    if (indicator) {
      indicator.textContent = item.classList.contains('active') ? '−' : '+';
    }
    question?.addEventListener('click', () => {
      const isActive = item.classList.toggle('active');
      if (indicator) {
        indicator.textContent = isActive ? '−' : '+';
      }
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherIndicator = other.querySelector('[data-indicator]');
          if (otherIndicator) {
            otherIndicator.textContent = '+';
          }
        }
      });
    });
  });
});
