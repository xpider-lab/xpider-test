document.addEventListener('DOMContentLoaded', function() {
    // ✅ 1. PARTÍCULAS (Optimizado para Apache/Hosting gratuito)
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2.5 + 1,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    alpha: Math.random() * 0.4 + 0.15
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha})`;
                ctx.fill();
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            }
            requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();
        window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
    }

    // ✅ 2. MODAL / POPUPS
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    
    if (modal && modalContent) {
        const modalIcon = document.getElementById('modalIcon');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDescription');
        const modalBenefits = document.getElementById('modalBenefits');
        const modalPhrase = document.getElementById('modalPhrase');

        const servicesData = {
            1: { icon: '<i class="fas fa-comment-dots"></i>', title: 'Chatbots Inteligentes', desc: 'Atención al cliente automática 24/7', benefits: ['Respuesta inmediata', 'Ahorro en costos', 'Integración con WhatsApp'], phrase: '"Mis clientes siempre reciben respuesta"' },
            2: { icon: '<i class="fas fa-chart-line"></i>', title: 'Analítica Predictiva', desc: 'Anticipa tendencias del mercado', benefits: ['Predicciones precisas', 'Decisiones basadas en datos', 'Ventaja competitiva'], phrase: '"Me adelanto a la competencia"' },
            3: { icon: '<i class="fas fa-shield-alt"></i>', title: 'Ciberseguridad IA', desc: 'Protección avanzada contra amenazas', benefits: ['Detección en tiempo real', 'Bloqueo automático', 'Reportes de seguridad'], phrase: '"Mi negocio está protegido"' }
        };
        for (let i = 4; i <= 15; i++) {
            servicesData[i] = { icon: '<i class="fas fa-robot"></i>', title: 'Solución IA Avanzada', desc: 'Tecnología de punta para tu negocio', benefits: ['Tecnología avanzada', 'Soporte especializado', 'Resultados garantizados'], phrase: '"La mejor inversión que hice"' };
        }

        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const data = servicesData[id];
                if (!data) return;

                modalIcon.innerHTML = data.icon;
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                modalBenefits.innerHTML = data.benefits.map(b => `<li><i class="fas fa-check-circle"></i> ${b}</li>`).join('');
                modalPhrase.innerHTML = `<i class="fas fa-quote-left"></i> ${data.phrase}`;

                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
                setTimeout(() => modalContent.classList.add('float-animate'), 300);
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            modal.classList.remove('active');
            modalContent.classList.remove('float-animate');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }

        document.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }

    // ✅ 3. FAQ ACORDEÓN
    document.querySelectorAll('.faq-question').forEach(q => q.addEventListener('click', () => q.parentElement.classList.toggle('active')));

    // ✅ 4. CONTADORES
    function animateCounter(el) {
        if (!el) return;
        const target = parseInt(el.getAttribute('data-target')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) { el.textContent = target + suffix; clearInterval(timer); } 
            else { el.textContent = Math.floor(current) + suffix; }
        }, stepTime);
    }

    const counters = document.querySelectorAll('.resultado-number');
    if ('IntersectionObserver' in window && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
        counters.forEach(counter => observer.observe(counter));
    } else {
        counters.forEach(animateCounter);
    }

    // ✅ 5. FORMULARIO (MAILTO NATIVO)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const telefono = document.getElementById('contactPhone').value.trim();
            if (!nombre || !email) { alert('Por favor completa tu nombre y email'); return; }
            const subject = encodeURIComponent(`Contacto Xpider IA - ${nombre}`);
            const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono || 'No especificado'}\n\nMensaje enviado desde xpider.cl`);
            window.location.href = `mailto:xpidercl@gmail.com?subject=${subject}&body=${body}`;
            form.reset();
            alert('Se abrirá tu cliente de correo para enviar el mensaje. ¡Gracias!');
        });
    }

    // ✅ 6. HEADER & FECHAS
    const header = document.querySelector('.site-header');
    if (header) window.addEventListener('scroll', () => header.style.boxShadow = window.scrollY > 50 ? '0 4px 6px rgba(0,0,0,0.1)' : 'none');
    
    const now = new Date();
    const copy = document.getElementById('copyright-text');
    if (copy) copy.textContent = `${now.getFullYear()} Xpider - Inteligencia Artificial para empresas. Todos los derechos reservados.`;
});