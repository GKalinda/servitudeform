document.addEventListener("DOMContentLoaded", () => {
  
  // --- 0. DICCIONARIO DE TRADUCCIONES ---
  const translations = {
    es: {
      modal_title: "⚠️ Aviso de Contenido +18",
      modal_desc: "Este sitio web contiene material e información dirigida exclusivamente a personas mayores de 18 años (o la mayoría de edad legal en tu jurisdicción).",
      modal_btn_yes: "Soy mayor de 18 años, Entrar",
      modal_btn_no: "No soy mayor de edad, Salir",
      main_title: "Solicitud Servidumbre",
      important: "IMPORTANTE:",
      intro_1: "Este formulario es para adultos interesados en una dinámica consensuada de dominación/sumisión.",
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
      s2_search: "¿Qué buscas en esta dinámica?",
      sec3_title: "3. Contacto",
      s3_method: "Método de contacto preferido:",
      s3_mail: "Correo",
      s3_user: "Usuario / Email de contacto",
      sec4_title: "4. Normas y Final",
      s4_rules: "Normas de conducta:",
      s4_cb1: "Entiendo que el respeto es obligatorio.",
      s4_cb2: "Entiendo que puedo ser rechazado/a o bloqueado/a si no encajo.",
      s4_cb3: "Entiendo que esta dinámica puede terminar en cualquier momento.",
      s4_confirm: "Confirmación final:",
      s4_cb4: "Confirmo que todo lo anterior es verdadero.",
      s4_cb5: "Confirmo que participo voluntariamente.",
      s4_cb6: "Confirmo que entiendo los límites y condiciones.",
      btn_submit: "Enviar Solicitud",
      sending: "Enviando...",
      alert_success: "¡Formulario enviado con éxito! Los datos han sido enviados correctamente a Goddess Kalinda.",
      alert_error: "Hubo un problema al enviar la solicitud. Por favor, inténtalo de nuevo."
    },
    en: {
      modal_title: "⚠️ +18 Content Warning",
      modal_desc: "This website contains material and information directed exclusively to persons over 18 years of age (or the legal age of majority in your jurisdiction).",
      modal_btn_yes: "I am over 18, Enter",
      modal_btn_no: "I am underage, Exit",
      main_title: "Servitude Form",
      important: "IMPORTANT:",
      intro_1: "This form is for adults interested in a consensual domination/submission dynamic.",
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
      s2_search: "What are you looking for in this dynamic?",
      sec3_title: "3. Contact",
      s3_method: "Preferred contact method:",
      s3_mail: "Email",
      s3_user: "Contact Username / Email",
      sec4_title: "4. Rules and Final",
      s4_rules: "Code of conduct:",
      s4_cb1: "I understand that respect is mandatory.",
      s4_cb2: "I understand I can be rejected or blocked if I don't fit.",
      s4_cb3: "I understand this dynamic can end at any time.",
      s4_confirm: "Final confirmation:",
      s4_cb4: "I confirm everything above is true.",
      s4_cb5: "I confirm I participate voluntarily.",
      s4_cb6: "I confirm I understand the limits and conditions.",
      btn_submit: "Submit Application",
      sending: "Sending...",
      alert_success: "Form submitted successfully! Your data has been successfully sent to Goddess Kalinda.",
      alert_error: "There was a problem submitting your application. Please try again."
    }
  };

  let currentLang = 'es';

  // --- 1. LÓGICA DEL CAMBIO DE IDIOMA ---
  function changeLanguage(lang) {
    currentLang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    loadCountries();
  }

  // --- 1.5 LÓGICA DEL INTERRUPTOR DE IDIOMA VISUAL ---
  const langEsBtn = document.getElementById('lang-es');
  const langEnBtn = document.getElementById('lang-en');

  langEsBtn.addEventListener('click', () => {
    if (currentLang !== 'es') {
      langEsBtn.classList.add('active');
      langEnBtn.classList.remove('active');
      changeLanguage('es');
    }
  });

  langEnBtn.addEventListener('click', () => {
    if (currentLang !== 'en') {
      langEnBtn.classList.add('active');
      langEsBtn.classList.remove('active');
      changeLanguage('en');
    }
  });


  // --- 2. MODAL DE AVISO +18 ---
  const ageModal = document.getElementById('age-modal');
  const btnAccept = document.getElementById('btn-accept');
  const btnDecline = document.getElementById('btn-decline');

  if (!sessionStorage.getItem('ageVerified')) {
    ageModal.classList.remove('hidden');
  } else {
    ageModal.classList.add('hidden');
  }

  btnAccept.addEventListener('click', () => {
    sessionStorage.setItem('ageVerified', 'true');
    ageModal.classList.add('hidden');
  });

  btnDecline.addEventListener('click', () => window.location.href = "https://www.google.com");


  // --- 3. MODO CLARO / OSCURO ---
  const themeToggle = document.getElementById('theme-toggle');

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });


  // --- 4. CARGA DINÁMICA DE PAÍSES ---
  let countriesRawData = []; 
  function loadCountries() {
    const countryOptionsContainer = document.getElementById('country-options');
    if (!countryOptionsContainer) return;
    
    countryOptionsContainer.innerHTML = '';
    
    fetch('paises.json')
      .then(response => response.json())
      .then(data => {
        countriesRawData = data;
        data.sort((a, b) => a[currentLang].localeCompare(b[currentLang]));
        
        data.forEach(pais => {
          const optionDiv = document.createElement('div');
          optionDiv.className = 'custom-option';
          optionDiv.setAttribute('data-value', pais.code);
          optionDiv.textContent = pais[currentLang];
          countryOptionsContainer.appendChild(optionDiv);
        });

        const cInput = document.getElementById('country');
        const cDisplay = document.getElementById('country-display');
        if (cInput.value) {
          const selectedCountry = data.find(p => p.code === cInput.value);
          if(selectedCountry) cDisplay.value = selectedCountry[currentLang];
        }
      })
      .catch(error => console.error('Error cargando JSON:', error));
  }
  loadCountries();


  // --- 5. GENERACIÓN DINÁMICA DE AÑO (+18) ---
  function populateYears() {
    const yearOptions = document.getElementById('year-options');
    if (!yearOptions) return;
    
    const maxAllowedYear = new Date().getFullYear() - 18; 
    
    for(let i = maxAllowedYear; i >= 1926; i--) {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'custom-option';
      optionDiv.setAttribute('data-value', i);
      optionDiv.textContent = i;
      yearOptions.appendChild(optionDiv);
    }
  }
  populateYears();


  // --- 6. MENÚS DESPLEGABLES PERSONALIZADOS ---
  const customSelects = document.querySelectorAll('.custom-select-wrapper');

  customSelects.forEach(wrapper => {
    const trigger = wrapper.querySelector('.custom-select-trigger');
    const optionsContainer = wrapper.querySelector('.custom-options');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');

    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      customSelects.forEach(w => { if (w !== wrapper) w.classList.remove('open'); });
      wrapper.classList.toggle('open');
    });

    optionsContainer.addEventListener('click', function(e) {
      const targetOption = e.target.closest('.custom-option');
      if (!targetOption) return;

      trigger.value = targetOption.textContent;
      hiddenInput.value = targetOption.getAttribute('data-value');
      trigger.classList.remove('error');
      wrapper.classList.remove('open');
      
      hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  document.addEventListener('click', () => {
    customSelects.forEach(w => w.classList.remove('open'));
  });


  // --- 7. CONTADOR DE CARACTERES ---
  const textarea = document.getElementById('busqueda');
  const charCount = document.getElementById('char-count');
  
  textarea.addEventListener('input', function() {
    charCount.textContent = this.value.length;
    if (this.value.length >= 200) charCount.style.color = 'var(--error-color)';
    else charCount.style.color = 'var(--text-muted)';
  });


  // --- 8. VALIDACIÓN EN CASCADA ---
  const form = document.getElementById('findomForm');
  const submitBtn = document.getElementById('ui-btn-submit');
  
  const sec2 = document.getElementById('section-2');
  const sec3 = document.getElementById('section-3');
  const sec4 = document.getElementById('section-4');
  
  const s2Alias = document.getElementById('alias');
  const dobYear = document.getElementById('dob-year');
  const s2Country = document.getElementById('country');
  const s2Busqueda = document.getElementById('busqueda');
  const s3Usuario = document.getElementById('usuario-contacto');

  function validateForm() {
    // SECCIÓN 1 -> Abre SECCIÓN 2
    const s1Valid = Array.from(document.querySelectorAll('.consent-cb')).every(cb => cb.checked);
    if (s1Valid) sec2.removeAttribute('disabled'); else sec2.setAttribute('disabled', 'true');

    // SECCIÓN 2 -> Abre SECCIÓN 3 (Contacto)
    const expChecked = document.querySelector('input[name="experiencia"]:checked') !== null;
    const s2Valid = s1Valid && s2Alias.value.trim() !== '' && dobYear.value !== '' && 
                    s2Country.value !== '' && expChecked && s2Busqueda.value.trim() !== '';
    if (s2Valid) sec3.removeAttribute('disabled'); else sec3.setAttribute('disabled', 'true');

    // SECCIÓN 3 (Contacto) -> Abre SECCIÓN 4 (Normas)
    const contactoChecked = document.querySelector('input[name="metodo_contacto"]:checked') !== null;
    const s3Valid = s2Valid && contactoChecked && s3Usuario.value.trim() !== '';
    if (s3Valid) sec4.removeAttribute('disabled'); else sec4.setAttribute('disabled', 'true');

    // SECCIÓN 4 -> Desbloquea el BOTÓN
    const s4CbsValid = Array.from(document.querySelectorAll('.s4-cb')).every(cb => cb.checked);
    const s4Valid = s3Valid && s4CbsValid;
    if (s4Valid) submitBtn.removeAttribute('disabled'); else submitBtn.setAttribute('disabled', 'true');
  }

  form.addEventListener('input', validateForm);
  form.addEventListener('change', validateForm);

  
  // --- 9. ENVIAR FORMULARIO POR EMAILJS ---
  form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    submitBtn.setAttribute('disabled', 'true');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = translations[currentLang].sending;

    // Traducir país seleccionado para el email
    let paisSeleccionado = s2Country.value;
    const findPais = countriesRawData.find(p => p.code === s2Country.value);
    if (findPais) paisSeleccionado = findPais.es;

    const expRadio = document.querySelector('input[name="experiencia"]:checked');
    const contactoRadio = document.querySelector('input[name="metodo_contacto"]:checked');

    const templateParams = {
      subject: `Nueva Solicitud D/s: ${s2Alias.value.trim()}`,
      "1_consentimiento": "Aceptado",
      alias: s2Alias.value.trim(),
      birth_year: dobYear.value,
      country: paisSeleccionado,
      experience: expRadio ? expRadio.value : "",
      search: s2Busqueda.value.trim(),
      contact_method: contactoRadio ? contactoRadio.value : "",
      contact_user: s3Usuario.value.trim(),
      language: currentLang.toUpperCase()
    };

    emailjs.send(
      "service_pvx93jh",
      "template_sqp4qrl", // Recuerda verificar que la plantilla en EmailJS ya no dependa de las variables borradas
      templateParams
    )
    .then(() => {
        alert(translations[currentLang].alert_success);
        form.reset();

        // 🔥 IMPORTANTE: reactivar validación SIN romper selects
        setTimeout(() => {
          form.dispatchEvent(new Event('input', { bubbles: true }));
          form.dispatchEvent(new Event('change', { bubbles: true }));
        }, 50);
    })
    .catch((error) => {
        console.error("EmailJS error:", error);
        alert(translations[currentLang].alert_error);
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        validateForm();
    });
  });

});
