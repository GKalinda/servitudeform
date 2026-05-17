document.addEventListener("DOMContentLoaded", () => {
  
  // --- 0. DICCIONARIO DE TRADUCCIONES ---
  const translations = {
    es: {
      modal_title: "⚠️ Aviso de Contenido +18",
      modal_desc: "Este sitio web contiene material e información dirigida exclusivamente a personas mayores de 18 años (o la mayoría de edad legal en tu jurisdicción).",
      modal_btn_yes: "Soy mayor de 18 años, Entrar",
      modal_btn_no: "No soy mayor de edad, Salir",
      main_title: "Aplicación D/s",
      important: "IMPORTANTE:",
      intro_1: "Esta aplicación es para adultos interesados en una dinámica consensuada de dominación/sumisión.",
      intro_2: "El respeto, el consentimiento y los límites son obligatorios.",
      intro_3: "Este formulario no implica aceptación automática.",
      sec1_title: "1. Consentimiento general",
      s1_cb1: "Entiendo que esta es una dinámica consensuada entre adultos.",
      s1_cb2: "Participo voluntariamente sin presión externa.",
      s1_cb3: "Puedo retirarme en cualquier momento.",
      sec2_title: "2. Perfil general",
      s2_alias: "Nombre o alias",
      s2_year: "Año de nac.",
      s2_country: "País",
      s2_exp: "Experiencia previa:",
      exp_1: "Ninguna", exp_2: "Básica", exp_3: "Intermedia", exp_4: "Avanzada",
      s2_search: "¿Qué buscas en esta dinámica? (Máx 200 caracteres)",
      sec3_title: "3. Findom",
      s3_accept_lbl: "¿Aceptas dinámica de dominación financiera consensuada?",
      fd_yes: "Sí", fd_no: "No", fd_dep: "Depende de condiciones",
      s3_budget: "Presupuesto mensual voluntario (€/$)",
      s3_limit: "Límite máximo absoluto (€/$)",
      s3_consent: "Entendimiento del consentimiento financiero:",
      s3_cb1: "Entiendo que nunca se me obligará a pagar nada.",
      s3_cb2: "Entiendo que puedo parar en cualquier momento.",
      s3_cb3: "Entiendo que no debo comprometer mi estabilidad financiera.",
      sec4_title: "4. Contacto",
      s4_method: "Método de contacto preferido:",
      s4_mail: "Correo",
      s4_user: "Usuario / Email de contacto",
      sec5_title: "5. Normas y Final",
      s5_rules: "Normas de conducta:",
      s5_cb1: "Entiendo que el respeto es obligatorio en ambas direcciones.",
      s5_cb2: "Entiendo que puedo ser rechazado/a o bloqueado/a si no encajo.",
      s5_cb3: "Entiendo que esta dinámica puede terminar en cualquier momento.",
      s5_confirm: "Confirmación final:",
      s5_cb4: "Confirmo que todo lo anterior es verdadero.",
      s5_cb5: "Confirmo que participo voluntariamente.",
      s5_cb6: "Confirmo que entiendo los límites y condiciones.",
      btn_submit: "Enviar Solicitud",
      sending: "Enviando...",
      alert_success: "¡Formulario enviado con éxito! Los datos han sido enviados correctamente.",
      alert_error: "Hubo un problema al enviar la solicitud. Por favor, inténtalo de nuevo."
    },
    en: {
      modal_title: "⚠️ +18 Content Warning",
      modal_desc: "This website contains material and information directed exclusively to persons over 18 years of age (or the legal age of majority in your jurisdiction).",
      modal_btn_yes: "I am over 18, Enter",
      modal_btn_no: "I am underage, Exit",
      main_title: "D/s Application",
      important: "IMPORTANT:",
      intro_1: "This application is for adults interested in a consensual domination/submission dynamic.",
      intro_2: "Respect, consent, and boundaries are mandatory.",
      intro_3: "This form does not imply automatic acceptance.",
      sec1_title: "1. General Consent",
      s1_cb1: "I understand this is a consensual dynamic between adults.",
      s1_cb2: "I participate voluntarily without external pressure.",
      s1_cb3: "I can withdraw at any time.",
      sec2_title: "2. General Profile",
      s2_alias: "Name or Alias",
      s2_year: "Birth Year",
      s2_country: "Country",
      s2_exp: "Previous experience:",
      exp_1: "None", exp_2: "Basic", exp_3: "Intermediate", exp_4: "Advanced",
      s2_search: "What are you looking for in this dynamic? (Max 200 chars)",
      sec3_title: "3. Findom",
      s3_accept_lbl: "Do you accept a consensual financial domination dynamic?",
      fd_yes: "Yes", fd_no: "No", fd_dep: "Depends on conditions",
      s3_budget: "Voluntary monthly budget (€/$)",
      s3_limit: "Absolute maximum limit (€/$)",
      s3_consent: "Understanding of financial consent:",
      s3_cb1: "I understand I will never be forced to pay anything.",
      s3_cb2: "I understand I can stop at any time.",
      s3_cb3: "I understand I must not compromise my financial stability.",
      sec4_title: "4. Contact",
      s4_method: "Preferred contact method:",
      s4_mail: "Email",
      s4_user: "Contact Username / Email",
      sec5_title: "5. Rules and Final",
      s5_rules: "Code of conduct:",
      s5_cb1: "I understand respect is mandatory in both directions.",
      s5_cb2: "I understand I can be rejected or blocked if I don't fit.",
      s5_cb3: "I understand this dynamic can end at any time.",
      s5_confirm: "Final confirmation:",
      s5_cb4: "I confirm everything above is true.",
      s5_cb5: "I confirm I participate voluntarily.",
      s5_cb6: "I confirm I understand the limits and conditions.",
      btn_submit: "Submit Application",
      sending: "Sending...",
      alert_success: "Form submitted successfully!",
      alert_error: "There was a problem submitting your application."
    }
  };

  let currentLang = 'es';

  function changeLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    loadCountries();
  }

  // --- idioma ---
  document.getElementById('lang-es').addEventListener('click', () => changeLanguage('es'));
  document.getElementById('lang-en').addEventListener('click', () => changeLanguage('en'));

  // --- 18 modal ---
  const ageModal = document.getElementById('age-modal');
  document.getElementById('btn-accept').onclick = () => {
    sessionStorage.setItem('ageVerified', 'true');
    ageModal.classList.add('hidden');
  };
  document.getElementById('btn-decline').onclick = () => location.href = "https://www.google.com";

  if (!sessionStorage.getItem('ageVerified')) ageModal.classList.remove('hidden');

  // --- theme ---
  const themeToggle = document.getElementById('theme-toggle');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme',
      document.body.classList.contains('dark-mode') ? 'dark' : 'light'
    );
  };

  // --- countries ---
  let countriesRawData = [];

  function loadCountries() {
    fetch('paises.json')
      .then(r => r.json())
      .then(data => {
        countriesRawData = data;
      });
  }
  loadCountries();

  // --- validation ---
  const form = document.getElementById('findomForm');
  const submitBtn = document.getElementById('ui-btn-submit');

  function validateForm() {
    const valid = true;
    submitBtn.disabled = !valid;
  }

  form.addEventListener('input', validateForm);

  // --- 9. EMAILJS ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = translations[currentLang].sending;

    const s2Alias = document.getElementById('alias').value;
    const dobYear = document.getElementById('dob-year').value;
    const s2Country = document.getElementById('country').value;
    const s2Busqueda = document.getElementById('busqueda').value;
    const s3Accept = document.getElementById('findom-accept').value;
    const s3Presupuesto = document.getElementById('presupuesto').value;
    const s3Limite = document.getElementById('limite-max').value;
    const s4Usuario = document.getElementById('usuario-contacto').value;

    const expRadio = document.querySelector('input[name="experiencia"]:checked');
    const contactoRadio = document.querySelector('input[name="metodo_contacto"]:checked');

    const templateParams = {
      subject: `Nueva solicitud: ${s2Alias}`,
      alias: s2Alias,
      birth_year: dobYear,
      country: s2Country,
      experience: expRadio ? expRadio.value : "",
      search: s2Busqueda,
      findom_accept: s3Accept,
      budget: s3Presupuesto,
      limit: s3Limite,
      contact_method: contactoRadio ? contactoRadio.value : "",
      contact_user: s4Usuario,
      language: currentLang
    };

    emailjs.send(
      "service_pvx93jh",
      "template_sqp4qrl",
      templateParams
    )
    .then(() => {
      alert(translations[currentLang].alert_success);
      form.reset();
    })
    .catch((err) => {
      console.error(err);
      alert(translations[currentLang].alert_error);
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });

});
