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
