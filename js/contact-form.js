(function () {
  'use strict';

  var EMAILJS_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  };

  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.querySelector('.form-ok');
  var button = form.querySelector('button[type="submit"]');
  var originalButtonText = button ? button.textContent.trim() : '';

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!window.emailjs || !EMAILJS_CONFIG.serviceId ||
        !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      showStatus('No se cargó la configuración de EmailJS desde .env. Inicia el sitio con npm run dev.', false);
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = 'Enviando…';
    }
    showStatus('', true);

    window.emailjs.sendForm(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      form,
      { publicKey: EMAILJS_CONFIG.publicKey }
    ).then(function () {
      showStatus('¡Gracias! Tu mensaje fue enviado. ✦', true);
      form.reset();
    }).catch(function (error) {
      console.error('No se pudo enviar el formulario:', error);
      showStatus('No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por correo.', false);
    }).finally(function () {
      if (button) {
        button.disabled = false;
        button.innerHTML = originalButtonText + ' <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17M14 6l6 6-6 6" /></svg>';
      }
    });
  });

  function showStatus(message, success) {
    if (!status) return;
    status.textContent = message;
    status.style.display = message ? 'block' : 'none';
    status.style.background = success ? 'var(--vino)' : '#8b2525';
  }
})();
