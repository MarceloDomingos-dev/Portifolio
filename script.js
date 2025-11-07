    /* ===== Tema (com imagens PNG) ===== */
    (function () {
      const toggleBtn = document.getElementById('themeToggle');
      const themeIcon = document.getElementById('themeIcon');

      function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.src = theme === 'dark' ? 'img/sun.png' : 'img/moon.png';
      }

      // Inicializa tema salvo
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }

      // Alternar tema ao clicar
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    })();


    
    /* ===== Hero Animation (linhas conectadas) ===== */
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
    window.addEventListener('resize', resize);
    resize();
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - .5) * 0.8, vy: (Math.random() - .5) * 0.8 });
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(63,182,168,0.3)';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
        }
      }
      requestAnimationFrame(draw);
    } draw();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(63,182,168,0.4)'; // um pouquinho mais forte
      ctx.lineWidth = 1.5; // <<< aumenta a espessura das linhas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    /* ===== Typing Effect ===== */
    const text = "Desenvolvedor BackEnd";
    const typingEl = document.getElementById('typing');
    let idx = 0;
    function typing() {
      typingEl.textContent = text.slice(0, idx);
      idx++;
      if (idx <= text.length) setTimeout(typing, 100);
    } typing();

    /* ===== Projetos Modal ===== */
    const projetos = document.querySelectorAll('.projeto');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLink = document.getElementById('modalLink');
    const details = {
      1: { t: "E-commerce", d: "Site de e-commerce minimalista de roupas básicas — apresenta coleções e promoções.", l: "https://marcelodomingos-dev.github.io/B-sico/index.html" },
      2: { t: "Reprodução de Site - Grid", d: "Layout moderno recriado com CSS Grid.", l: "https://marcelodomingos-dev.github.io/Tulen/index.html" },
      3: { t: "Reprodução de Site - Flex", d: "Layout responsivo recriado com Flexbox.", l: "https://marcelodomingos-dev.github.io/Bitmap/index.html" }
    };
    projetos.forEach(p => p.addEventListener('click', () => {
      const id = p.getAttribute('data-projeto');
      const { t, d, l } = details[id];
      modalTitle.textContent = t; modalDesc.textContent = d; modalLink.href = l;
      modal.classList.add('show'); document.body.style.overflow = 'hidden';
    }));
    closeModal.addEventListener('click', () => { modal.classList.remove('show'); document.body.style.overflow = ''; });
    modal.addEventListener('click', e => { if (e.target === modal) { modal.classList.remove('show'); document.body.style.overflow = ''; } });

    /* ===== Scroll Reveal ===== */
    const reveals = document.querySelectorAll('.scroll-reveal');
    function revealOnScroll() {
      const windowHeight = window.innerHeight;
      reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) { el.classList.add('visible'); }
      });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    /* ===== Scroll ===== */
    document.getElementById('btnProjects').addEventListener('click', () => {
      document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' });
    });

    /* ===== Hamburger ===== */
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav ul');
    hamburger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

    /* ===== Ano ===== */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ===== Máscaras e validações ===== */

    // === Máscara de telefone ===
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
      if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

      // Formata conforme o tamanho
      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // (31) 98765-4321
      } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3'); // (31) 9876-4321
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2'); // (31) 98765
      } else {
        value = value.replace(/^(\d*)$/, '($1'); // (
      }
      e.target.value = value;
    });

    // === Máscara de nome (permite apenas letras e espaços) ===
    const nameInput = document.getElementById('name');
    nameInput.addEventListener('input', (e) => {
      e.target.value = e.target.value
        .replace(/[^a-zA-ZÀ-ÿ\s]/g, '') // apenas letras e espaços
        .replace(/\s{2,}/g, ' '); // evita espaços duplos
    });

    // === Máscara de e-mail (validação simples) ===
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\s/g, ''); // remove espaços
    });

    // === Máscara de mensagem (limita o tamanho e remove caracteres especiais estranhos) ===
    const messageInput = document.getElementById('message');
    messageInput.addEventListener('input', (e) => {
      e.target.value = e.target.value
        .replace(/[^a-zA-Z0-9À-ÿ.,!?()"'´`\s-]/g, '') // remove símbolos estranhos
        .slice(0, 500); // limita a 500 caracteres
    });

    // === Validação rápida no envio ===
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();
      const msg = messageInput.value.trim();

      let valid = true;

      // limpa erros
      document.querySelectorAll('.error').forEach(el => el.textContent = '');

      // Nome
      if (name.length < 3) {
        document.getElementById('errName').textContent = 'Digite seu nome completo.';
        valid = false;
      }

      // Telefone
      if (phone.length < 14) {
        document.getElementById('errPhone').textContent = 'Digite um número válido.';
        valid = false;
      }

      // E-mail
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('errEmail').textContent = 'Digite um e-mail válido.';
        valid = false;
      }

      // Mensagem
      if (msg.length < 5) {
        document.getElementById('errMsg').textContent = 'Digite uma mensagem.';
        valid = false;
      }

      if (valid) {
        alert('Mensagem enviada com sucesso!');
        form.reset();
      }
    });

