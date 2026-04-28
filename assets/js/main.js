document.addEventListener('DOMContentLoaded', function() {
    // ✅ 1. PARTÍCULAS CON CONEXIONES
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
        function createParticles() {
            particles = [];
            const count = window.innerWidth < 768 ? 50 : 100;
            for (let i = 0; i < count; i++) particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 2 + 1, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6, alpha: Math.random() * 0.4 + 0.2 });
        }
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 120) { ctx.beginPath(); ctx.strokeStyle = `rgba(220, 38, 38, ${(1 - dist/120)*0.3})`; ctx.lineWidth = 0.8; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
                }
            }
            for (let p of particles) { ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2); ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha})`; ctx.fill(); p.x += p.vx; p.y += p.vy; if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0; if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0; }
            requestAnimationFrame(drawParticles);
        }
        resizeCanvas(); createParticles(); drawParticles();
        window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
    }

    // ✅ 2. MODAL (SOLO PARA .core-card)
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const modalIcon = document.getElementById('modalIcon');
    if (modal && modalContent) {
        const modalTitle = document.getElementById('modalTitle'), modalDesc = document.getElementById('modalDescription'), modalBenefits = document.getElementById('modalBenefits'), modalPhrase = document.getElementById('modalPhrase');
        const servicesData = {
            1: { icon: '<i class="fas fa-comment-dots"></i>', title: 'Chatbots 24/7', desc: 'Atención al cliente automática 24/7', benefits: ['Respuesta inmediata', 'Ahorro en costos', 'Integración con WhatsApp', 'Disponible 24/7'], phrase: '"Mis clientes siempre reciben respuesta"' },
            2: { icon: '<i class="fas fa-chart-line"></i>', title: 'Analítica Predictiva', desc: 'Anticipa tendencias del mercado', benefits: ['Predicciones precisas', 'Decisiones basadas en datos', 'Ventaja competitiva', 'Reportes automáticos'], phrase: '"Me adelanto a la competencia"' },
            3: { icon: '<i class="fas fa-shield-alt"></i>', title: 'Ciberseguridad IA', desc: 'Protección avanzada contra amenazas', benefits: ['Detección en tiempo real', 'Bloqueo automático', 'Reportes de seguridad', 'Protección 24/7'], phrase: '"Mi negocio está protegido"' }
        };

        document.addEventListener('click', function(e) {
            const card = e.target.closest('.core-card');
            if (!card) return;
            const id = card.getAttribute('data-id'), data = servicesData[id];
            if (!data) return;
            modalIcon.innerHTML = data.icon; modalTitle.textContent = data.title; modalDesc.textContent = data.desc;
            modalBenefits.innerHTML = data.benefits.map(b => `<li><i class="fas fa-check-circle"></i> ${b}</li>`).join('');
            modalPhrase.innerHTML = `<i class="fas fa-quote-left"></i> ${data.phrase}`;
            modal.style.display = 'flex'; void modal.offsetWidth; modal.classList.add('active');
            setTimeout(() => modalIcon.classList.add('float-active'), 50); document.body.style.overflow = 'hidden';
        });

        function closeModal() { modal.classList.remove('active'); modalIcon.classList.remove('float-active'); setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = ''; }, 300); }
        document.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }

    // ✅ 3. FAQ ACORDEÓN
    document.querySelectorAll('.faq-question').forEach(q => q.addEventListener('click', () => q.parentElement.classList.toggle('active')));

    // ✅ 4. CONTADORES
    function animateCounter(el) { if (!el) return; const target = parseInt(el.getAttribute('data-target'))||0, suffix = el.getAttribute('data-suffix')||''; let cur=0; const dur=2000, steps=60, inc=target/steps, t=dur/steps; const timer=setInterval(()=>{cur+=inc; if(cur>=target){el.textContent=target+suffix;clearInterval(timer);}else{el.textContent=Math.floor(cur)+suffix;}},t); }
    const counters = document.querySelectorAll('.resultado-number');
    if ('IntersectionObserver' in window && counters.length>0) { const obs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting){animateCounter(en.target);obs.unobserve(en.target);}}),{threshold:0.3,rootMargin:'0px 0px -50px 0px'}); counters.forEach(c=>obs.observe(c)); } else { counters.forEach(animateCounter); }

    // ✅ 5. FORMULARIO
    const form = document.getElementById('contactForm');
    if (form) { form.addEventListener('submit', function(e) { e.preventDefault(); const n=document.getElementById('contactName').value.trim(), em=document.getElementById('contactEmail').value.trim(), t=document.getElementById('contactPhone').value.trim(); if(!n||!em){alert('Por favor completa tu nombre y email');return;} window.location.href=`mailto:xpidercl@gmail.com?subject=${encodeURIComponent('Contacto Xpider IA - '+n)}&body=${encodeURIComponent('Nombre: '+n+'\nEmail: '+em+'\nTeléfono: '+(t||'No especificado')+'\n\nMensaje enviado desde xpider.cl')}`; form.reset(); }); }

    // ✅ 6. HEADER & FECHAS
    const header = document.querySelector('.site-header');
    if (header) window.addEventListener('scroll', () => header.style.boxShadow = window.scrollY > 50 ? '0 4px 6px rgba(0,0,0,0.1)' : 'none');
    const now = new Date(), copy = document.getElementById('copyright-text');
    if (copy) copy.textContent = `${now.getFullYear()} Xpider - Inteligencia Artificial para empresas. Todos los derechos reservados.`;
});
