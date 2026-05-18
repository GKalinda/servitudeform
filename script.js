document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. LÓGICA DEL CAMBIO DE IDIOMA (INGLÉS POR DEFECTO) ---
  let currentLang = 'en';

  function changeLanguage(lang) {
    currentLang = lang;
    
    // Traducir todos los textos con la etiqueta data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    loadCountries();
    populateFetishes(); 
  }

  // Ejecuta la traducción inicial
  changeLanguage('en'); 

  // --- 1.5 INTERRUPTOR DE IDIOMAS DESPLEGABLE ---
  const langDropdown = document.getElementById('lang-dropdown');
  const currentLangSpan = document.getElementById('current-lang');
  const langOptions = langDropdown.querySelectorAll('.lang-dropdown-options span');

  langDropdown.querySelector('.lang-dropdown-trigger').addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
    // Cerrar los otros campos desplegables si se abre el idioma
    document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
  });

  langOptions.forEach(option => {
    option.addEventListener('click', () => {
      const selectedLang = option.getAttribute('data-lang');
      if (currentLang !== selectedLang) {
        currentLangSpan.textContent = option.textContent;
        changeLanguage(selectedLang);
      }
      langDropdown.classList.remove('open');
    });
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


  // --- LÓGICA DEL MODAL DE FINDOM ---
  const findomModal = document.getElementById('findom-modal');
  const btnFindomOk = document.getElementById('btn-findom-ok');

  if (btnFindomOk && findomModal) {
    btnFindomOk.addEventListener('click', (e) => {
      e.preventDefault();
      findomModal.classList.add('hidden');
    });
  }


  // --- LÓGICA DEL MODAL DE RESULTADO (ÉXITO / ERROR) ---
  const resultModal = document.getElementById('result-modal');
  const resultModalTitle = document.getElementById('result-modal-title');
  const resultModalDesc = document.getElementById('result-modal-desc');
  const btnResultOk = document.getElementById('btn-result-ok');

  if (btnResultOk && resultModal) {
    btnResultOk.addEventListener('click', (e) => {
      e.preventDefault();
      resultModal.classList.add('hidden');
    });
  }


  // --- 3. CARGA DINÁMICA DE PAÍSES ---
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


  // --- 4. GENERACIÓN DINÁMICA DE AÑO (+18) ---
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


  // --- 5. GENERACIÓN DINÁMICA DE FETICHES ---
  function populateFetishes() {
    const container = document.getElementById('fetishes-container');
    if (!container) return;

    container.innerHTML = '';

    const fetishes = [
      { value: "Adoracion_pies", key: "fetish_foot_worship" },
      { value: "Bondage", key: "fetish_bondage" },
      { value: "Caning", key: "fetish_caning" },
      { value: "Castidad", key: "fetish_chastity" },
      { value: "CBT", key: "fetish_cbt" },
      { value: "Control Respiracion", key: "fetish_breath_control" },
      { value: "Cuero", key: "fetish_leather" },
      { value: "Degradacion", key: "fetish_degradation" },
      { value: "Findom", key: "fetish_findom" },
      { value: "Humillacion", key: "fetish_humiliation" },
      { value: "Pantyhose Fetish", key: "fetish_food_play" }, 
      { value: "Pedal Pumping", key: "fetish_pedal_pumping" },
      { value: "Sadomasoquismo", key: "fetish_sadomasochism" },
      { value: "Smoking Fetish", key: "fetish_smoking" },
      { value: "Spanking", key: "fetish_spanking" },
      { value: "Sumision Total", key: "fetish_submission" }
    ];

    const col1 = document.createElement('div');
    col1.className = 'name-group'; 
    
    const col2 = document.createElement('div');
    col2.className = 'name-group';

    fetishes.forEach((fetish, index) => {
      const label = document.createElement('label');
      label.className = 'checkbox-container';

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.name = 'fetiches';
      input.value = fetish.value;

      // Evento para Findom (SOLO AL HACER CLIC)
      if (fetish.value === "Findom") {
        input.addEventListener('change', function() {
          if (this.checked && findomModal) {
            findomModal.classList.remove('hidden');
          }
        });
      }

      const spanText = document.createElement('span');
      spanText.setAttribute('data-i18n', fetish.key);
      spanText.textContent = translations[currentLang][fetish.key];
      
      const spanCheck = document.createElement('span');
      spanCheck.className = 'checkmark';

      label.appendChild(input);
      label.appendChild(document.createTextNode(' '));
      label.appendChild(spanText);
      label.appendChild(spanCheck);

      if (index < 8) {
        col1.appendChild(label);
      } else {
        col2.appendChild(label);
      }
    });

    container.appendChild(col1);
    container.appendChild(col2);
  }
  populateFetishes();


  // --- 6. MENÚS DESPLEGABLES PERSONALIZADOS ---
  const customSelects = document.querySelectorAll('.custom-select-wrapper');

  customSelects.forEach(wrapper => {
    const trigger = wrapper.querySelector('.custom-select-trigger');
    const optionsContainer = wrapper.querySelector('.custom-options');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');

    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      customSelects.forEach(w => { if (w !== wrapper) w.classList.remove('open'); });
      // Cierra también el menú de idiomas
      langDropdown.classList.remove('open');
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

  // Cerrar cualquier menú al hacer clic en otra parte de la pantalla
  document.addEventListener('click', () => {
    customSelects.forEach(w => w.classList.remove('open'));
    langDropdown.classList.remove('open');
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
  const sec5 = document.getElementById('section-5');
  
  const s2Alias = document.getElementById('alias');
  const dobYear = document.getElementById('dob-year');
  const s2Country = document.getElementById('country');
  const s2Busqueda = document.getElementById('busqueda');
  const s4Usuario = document.getElementById('usuario-contacto');

  function validateForm() {
    const s1Valid = Array.from(document.querySelectorAll('.consent-cb')).every(cb => cb.checked);
    if (s1Valid) sec2.removeAttribute('disabled'); else sec2.setAttribute('disabled', 'true');

    const expChecked = document.querySelector('input[name="experiencia"]:checked') !== null;
    const s2Valid = s1Valid && s2Alias.value.trim() !== '' && dobYear.value !== '' && 
                    s2Country.value !== '' && expChecked && s2Busqueda.value.trim() !== '';
    if (s2Valid) sec3.removeAttribute('disabled'); else sec3.setAttribute('disabled', 'true');

    const s3Valid = s2Valid; 
    if (s3Valid) sec4.removeAttribute('disabled'); else sec4.setAttribute('disabled', 'true');

    const contactoChecked = document.querySelector('input[name="metodo_contacto"]:checked') !== null;
    const s4Valid = s3Valid && contactoChecked && s4Usuario.value.trim() !== '';
    if (s4Valid) sec5.removeAttribute('disabled'); else sec5.setAttribute('disabled', 'true');

    const s5CbsValid = Array.from(document.querySelectorAll('.s5-cb')).every(cb => cb.checked);
    const s5Valid = s4Valid && s5CbsValid;
    if (s5Valid) submitBtn.removeAttribute('disabled'); else submitBtn.setAttribute('disabled', 'true');
  }

  form.addEventListener('input', validateForm);
  form.addEventListener('change', validateForm);

  
  // --- 9. ENVIAR FORMULARIO POR EMAILJS ---
  form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    submitBtn.setAttribute('disabled', 'true');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = translations[currentLang].sending;

    let paisSeleccionado = s2Country.value;
    const findPais = countriesRawData.find(p => p.code === s2Country.value);
    if (findPais) paisSeleccionado = findPais.es;

    const expRadio = document.querySelector('input[name="experiencia"]:checked');
    const contactoRadio = document.querySelector('input[name="metodo_contacto"]:checked');

    const fetichesSeleccionados = Array.from(document.querySelectorAll('input[name="fetiches"]:checked'))
                                       .map(cb => cb.value)
                                       .join(", ");
    const otrosFetichesText = document.getElementById('otros-fetiches').value.trim();

    const templateParams = {
      subject: `Nueva Solicitud D/s: ${s2Alias.value.trim()}`,
      "1_consentimiento": "Aceptado",
      alias: s2Alias.value.trim(),
      birth_year: dobYear.value,
      country: paisSeleccionado,
      experience: expRadio ? expRadio.value : "",
      search: s2Busqueda.value.trim(),
      fetishes: fetichesSeleccionados || "Ninguno seleccionado",
      other_fetishes: otrosFetichesText || "Ninguno especificado",
      contact_method: contactoRadio ? contactoRadio.value : "",
      contact_user: s4Usuario.value.trim(),
      language: currentLang.toUpperCase()
    };

    emailjs.send(
      "service_pvx93jh",
      "template_sqp4qrl", 
      templateParams
    )
    .then(() => {
        // Modal personalizado de Éxito
        resultModalTitle.innerHTML = "✔️ Solicitud Enviada";
        resultModalTitle.style.color = "var(--accent-color)";
        resultModalDesc.textContent = translations[currentLang].alert_success;
        resultModal.classList.remove('hidden');
        
        form.reset();

        setTimeout(() => {
          form.dispatchEvent(new Event('input', { bubbles: true }));
          form.dispatchEvent(new Event('change', { bubbles: true }));
        }, 50);
    })
    .catch((error) => {
        console.error("EmailJS error:", error);
        
        // Modal personalizado de Error
        resultModalTitle.innerHTML = "❌ Error en el envío";
        resultModalTitle.style.color = "var(--error-color)";
        resultModalDesc.textContent = translations[currentLang].alert_error;
        resultModal.classList.remove('hidden');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        validateForm();
    });
  });

});
