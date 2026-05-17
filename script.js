document.addEventListener("DOMContentLoaded", () => {
  
  // 1. LÓGICA DEL MODAL +18
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

  btnDecline.addEventListener('click', () => {
    window.location.href = "https://www.google.com";
  });


  // 2. LÓGICA DEL MODO OSCURO
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


  // 3. CARGA DINÁMICA DE PAÍSES DESDE EL JSON
  function loadCountries() {
    const countryOptionsContainer = document.getElementById('country-options');
    if (!countryOptionsContainer) return;
    
    fetch('paises.json')
      .then(response => {
        if (!response.ok) throw new Error('No se pudo cargar la lista de países');
        return response.json();
      })
      .then(data => {
        data.forEach(pais => {
          const optionDiv = document.createElement('div');
          optionDiv.className = 'custom-option';
          optionDiv.setAttribute('data-value', pais.code);
          optionDiv.textContent = pais.name;
          countryOptionsContainer.appendChild(optionDiv);
        });
      })
      .catch(error => console.error('Error cargando JSON:', error));
  }
  loadCountries();


  // 4. GENERACIÓN DINÁMICA DE AÑOS DE NACIMIENTO (Límite +18 automático)
  function populateYears() {
    const yearOptions = document.getElementById('year-options');
    if (!yearOptions) return;

    const currentYear = new Date().getFullYear();
    const maxAllowedYear = currentYear - 18; // Solo muestra años que garantizan la mayoría de edad

    for(let i = maxAllowedYear; i >= 1926; i--) {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'custom-option';
      optionDiv.setAttribute('data-value', i);
      optionDiv.textContent = i;
      yearOptions.appendChild(optionDiv);
    }
  }
  populateYears();


  // 5. LÓGICA DE LOS DESPLEGABLES PERSONALIZADOS (Países y Año)
  const customSelects = document.querySelectorAll('.custom-select-wrapper');

  customSelects.forEach(wrapper => {
    const trigger = wrapper.querySelector('.custom-select-trigger');
    const optionsContainer = wrapper.querySelector('.custom-options');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');

    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      customSelects.forEach(otherWrapper => {
        if (otherWrapper !== wrapper) otherWrapper.classList.remove('open');
      });
      wrapper.classList.toggle('open');
    });

    optionsContainer.addEventListener('click', function(e) {
      const targetOption = e.target.closest('.custom-option');
      if (!targetOption) return;

      trigger.value = targetOption.textContent;
      hiddenInput.value = targetOption.getAttribute('data-value');
      trigger.classList.remove('error');
      wrapper.classList.remove('open');
      
      // Lanzamos el cambio para activar la validación en tiempo real
      hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  document.addEventListener('click', () => {
    customSelects.forEach(wrapper => wrapper.classList.remove('open'));
  });


  // 6. LÓGICA DEL CONTADOR DE CARACTERES
  const textarea = document.getElementById('busqueda');
  const charCount = document.getElementById('char-count');

  textarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    charCount.textContent = currentLength;
    if (currentLength >= 200) charCount.style.color = 'var(--error-color)';
    else charCount.style.color = 'var(--text-muted)';
  });


  // 7. VALIDACIÓN EN CASCADA COMPLETA E INSTANTÁNEA
  const form = document.getElementById('findomForm');
  const submitBtn = document.getElementById('ui-btn-submit');

  // Bloques de secciones (Fieldsets)
  const sec2 = document.getElementById('section-2');
  const sec3 = document.getElementById('section-3');
  const sec4 = document.getElementById('section-4');
  const sec5 = document.getElementById('section-5');

  // Inputs a validar
  const s2Alias = document.getElementById('alias');
  const dobYear = document.getElementById('dob-year');
  const s2Country = document.getElementById('country');
  const s2Busqueda = document.getElementById('busqueda');

  const s3Accept = document.getElementById('findom-accept');
  const s3Presupuesto = document.getElementById('presupuesto');
  const s3Limite = document.getElementById('limite-max');
  const s4Usuario = document.getElementById('usuario-contacto');

  function validateForm() {
    // ---- VALIDAR SECCIÓN 1 ----
    const s1Valid = Array.from(document.querySelectorAll('.consent-cb')).every(cb => cb.checked);
    if (s1Valid) sec2.removeAttribute('disabled');
    else sec2.setAttribute('disabled', 'true');

    // ---- VALIDAR SECCIÓN 2 ----
    const expChecked = document.querySelector('input[name="experiencia"]:checked') !== null;
    const s2Valid = s1Valid && 
                    s2Alias.value.trim() !== '' && 
                    dobYear.value !== '' && 
                    s2Country.value !== '' && 
                    expChecked && 
                    s2Busqueda.value.trim() !== '';

    if (s2Valid) sec3.removeAttribute('disabled');
    else sec3.setAttribute('disabled', 'true');

    // ---- VALIDAR SECCIÓN 3 ----
    const s3CbsValid = Array.from(document.querySelectorAll('.s3-cb')).every(cb => cb.checked);
    const s3Valid = s2Valid && 
                    s3Accept.value !== '' && 
                    s3Presupuesto.value !== '' && 
                    s3Limite.value !== '' && 
                    s3CbsValid;

    if (s3Valid) sec4.removeAttribute('disabled');
    else sec4.setAttribute('disabled', 'true');

    // ---- VALIDAR SECCIÓN 4 ----
    const contactoChecked = document.querySelector('input[name="contacto"]:checked') !== null;
    const s4Valid = s3Valid && 
                    contactoChecked && 
                    s4Usuario.value.trim() !== '';

    if (s4Valid) sec5.removeAttribute('disabled');
    else sec5.setAttribute('disabled', 'true');

    // ---- VALIDAR SECCIÓN 5 Y BOTÓN DE ENVÍO FINAL ----
    const s5CbsValid = Array.from(document.querySelectorAll('.s5-cb')).every(cb => cb.checked);
    const s5Valid = s4Valid && s5CbsValid;

    if (s5Valid) submitBtn.removeAttribute('disabled');
    else submitBtn.setAttribute('disabled', 'true');
  }

  // Monitorizar cambios en tiempo real
  form.addEventListener('input', validateForm);
  form.addEventListener('change', validateForm);


  // 8. MANEJO DEL ENVÍO
  form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    alert("¡Perfecto! El formulario ha sido completamente cumplimentado en orden, respetando los datos de privacidad y está listo para ser enviado.");
  });

});
