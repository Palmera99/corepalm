/**
 * CorePalm Soluciones - Interactive Front-End Logic
 * Handles Navigation, Scrollspy, Service pre-selection, FAQ Accordion, and Quote Form Validation/Submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Elements Selection ---
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const serviceQuoteButtons = document.querySelectorAll('.js-quote-service');
  const serviceSelect = document.getElementById('form-service');
  const quoteForm = document.getElementById('quote-form');
  const btnSubmit = document.getElementById('btn-submit');
  const successModal = document.getElementById('success-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalSummary = document.getElementById('modal-summary');
  const faqItems = document.querySelectorAll('.faq-item');
  const currentYearSpan = document.getElementById('current-year');

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- Sticky Header with Shadow on Scroll ---
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile Menu Toggle ---
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking outside or on a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // --- Scrollspy: Active Navigation Link Highlight ---
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --- Service Card "Cotizar este servicio" Button Trigger ---
  // Smoothly scrolls to form and automatically selects corresponding option
  serviceQuoteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceValue = button.getAttribute('data-service-value');
      
      const quoteSection = document.getElementById('cotizacion');
      if (quoteSection) {
        const headerOffset = 80;
        const elementPosition = quoteSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      if (serviceSelect && serviceValue) {
        serviceSelect.value = serviceValue;
        
        // Visual focus indicator
        serviceSelect.focus();
        serviceSelect.style.borderColor = 'var(--color-primary-500)';
        serviceSelect.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.25)';

        setTimeout(() => {
          serviceSelect.style.borderColor = '';
          serviceSelect.style.boxShadow = '';
        }, 1800);
      }
    });
  });

  // --- FAQ Accordion Logic ---
  faqItems.forEach(item => {
    const headerBtn = item.querySelector('.faq-item__header');
    if (!headerBtn) return;

    headerBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others for single-open experience
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const btn = otherItem.querySelector('.faq-item__header');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        headerBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        headerBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Quotation Form Validation and Submission ---
  if (quoteForm) {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const phoneInput = document.getElementById('form-phone');
    const messageInput = document.getElementById('form-message');

    // Validation helper
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    const validateField = (input, isValid) => {
      const formGroup = input.closest('.form-group');
      if (!formGroup) return;

      if (!isValid) {
        formGroup.classList.add('has-error');
      } else {
        formGroup.classList.remove('has-error');
      }
    };

    // Live validation events on blur and input
    nameInput.addEventListener('blur', () => validateField(nameInput, nameInput.value.trim().length >= 2));
    nameInput.addEventListener('input', () => {
      if (nameInput.closest('.form-group').classList.contains('has-error')) {
        validateField(nameInput, nameInput.value.trim().length >= 2);
      }
    });

    emailInput.addEventListener('blur', () => validateField(emailInput, validateEmail(emailInput.value.trim())));
    emailInput.addEventListener('input', () => {
      if (emailInput.closest('.form-group').classList.contains('has-error')) {
        validateField(emailInput, validateEmail(emailInput.value.trim()));
      }
    });

    phoneInput.addEventListener('blur', () => validateField(phoneInput, phoneInput.value.trim().length >= 6));
    phoneInput.addEventListener('input', () => {
      if (phoneInput.closest('.form-group').classList.contains('has-error')) {
        validateField(phoneInput, phoneInput.value.trim().length >= 6);
      }
    });

    serviceSelect.addEventListener('change', () => validateField(serviceSelect, serviceSelect.value !== ''));
    
    messageInput.addEventListener('blur', () => validateField(messageInput, messageInput.value.trim().length >= 8));
    messageInput.addEventListener('input', () => {
      if (messageInput.closest('.form-group').classList.contains('has-error')) {
        validateField(messageInput, messageInput.value.trim().length >= 8);
      }
    });

    // Form Submit Handler
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = nameInput.value.trim().length >= 2;
      const isEmailValid = validateEmail(emailInput.value.trim());
      const isPhoneValid = phoneInput.value.trim().length >= 6;
      const isServiceValid = serviceSelect.value !== '';
      const isMessageValid = messageInput.value.trim().length >= 8;

      validateField(nameInput, isNameValid);
      validateField(emailInput, isEmailValid);
      validateField(phoneInput, isPhoneValid);
      validateField(serviceSelect, isServiceValid);
      validateField(messageInput, isMessageValid);

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isServiceValid || !isMessageValid) {
        // Focus first invalid element
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isPhoneValid) phoneInput.focus();
        else if (!isServiceValid) serviceSelect.focus();
        else if (!isMessageValid) messageInput.focus();
        return;
      }

      // Simulate sending state
      const originalBtnHTML = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Procesando Solicitud...</span>
      `;

      // Style for the spinner animation
      if (!document.getElementById('spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
      }

      // Simulate API call delay
      setTimeout(() => {
        // Service label mapping
        const serviceNames = {
          'software': 'Desarrollo de Software y Soluciones a Medida',
          'cctv': 'Sistemas de Cámaras de Seguridad (CCTV)',
          'redes': 'Infraestructura y Cableado de Red',
          'hardware': 'Soporte Técnico y Hardware',
          'integral': 'Proyecto Integral Multidisciplinario'
        };

        const selectedServiceName = serviceNames[serviceSelect.value] || 'Servicio Personalizado';

        // Populate Modal Summary
        if (modalSummary) {
          modalSummary.innerHTML = `
            <div style="margin-bottom: 6px;"><strong>Solicitante:</strong> ${escapeHTML(nameInput.value.trim())}</div>
            <div style="margin-bottom: 6px;"><strong>Servicio:</strong> ${selectedServiceName}</div>
            <div style="margin-bottom: 6px;"><strong>Contacto:</strong> ${escapeHTML(emailInput.value.trim())} | ${escapeHTML(phoneInput.value.trim())}</div>
            <div style="font-size: 0.82rem; color: #64748b; margin-top: 8px;">Un asesor se comunicará contigo en menos de 2 horas hábiles.</div>
          `;
        }

        // Show Modal
        if (successModal) {
          successModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        // Reset form and button
        quoteForm.reset();
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnHTML;
      }, 1000);
    });
  }

  // --- Modal Close Handlers ---
  const closeModal = () => {
    if (successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Helper function to sanitize HTML output
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});
