document.addEventListener('DOMContentLoaded', function() {
    // ✅ 1. PARTÍCULAS CON CONEXIONES
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
            const count = window.innerWidth < 768 ? 50 : 100;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    alpha: Math.random() * 0.4 + 0.2
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(220, 38, 38, ${(1 - dist / 120) * 0.3})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
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

        resizeCanvas(); createParticles(); drawParticles();
        window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
    }

    // ✅ 2. MODAL CON ICONO FLOTANTE (SOLO EL ICONO)
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const modalIcon = document.getElementById('modalIcon');
    
    if (modal && modalContent) {
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDescription');
        const modalBenefits = document.getElementById('modalBenefits');
        const modalPhrase = document.getElementById('modalPhrase');

        const servicesData = {
            1: { icon: '<i class="fas fa-comment-dots"></i>', title: 'Chatbots 24/7', desc: 'Atención al cliente automática que resuelve dudas al instante.', benefits: ['Respuesta inmediata', 'Ahorro en costos', 'Integración con WhatsApp', 'Disponible 24/7'], phrase: '"Mis clientes siempre reciben respuesta"' },
            2: { icon: '<i class="fas fa-chart-line"></i>', title: 'Analítica Predictiva', desc: 'Anticipa tendencias y toma decisiones basadas en datos.', benefits: ['Predicciones precisas', 'Decisiones basadas en datos', 'Ventaja competitiva', 'Reportes automáticos'], phrase: '"Me adelanto a la competencia"' },
            3: { icon: '<i class="fas fa-shield-alt"></i>', title: 'Ciberseguridad IA', desc: 'Protección avanzada contra amenazas en tiempo real.', benefits: ['Detección en tiempo real', 'Bloqueo automático', 'Reportes de seguridad', 'Protección 24/7'], phrase: '"Mi negocio está protegido"' },
            4: { icon: '<i class="fas fa-robot"></i>', title: 'Automatización RPA', desc: 'Automatiza tareas repetitivas y ahorra tiempo.', benefits: ['Ahorro de tiempo', 'Reducción de errores', 'Escalabilidad', 'ROI inmediato'], phrase: '"Mi equipo se enfoca en lo importante"' },
            5: { icon: '<i class="fas fa-globe"></i>', title: 'Webs con IA', desc: 'Sitios web optimizados que convierten visitantes en clientes.', benefits: ['Diseño inteligente', 'SEO optimizado', 'Conversión mejorada', 'Carga ultrarrápida'], phrase: '"Mi web vende por mí"' },
            6: { icon: '<i class="fas fa-search"></i>', title: 'SEO Inteligente', desc: 'Aparece primero en Google con optimización automática.', benefits: ['Posicionamiento orgánico', 'Tráfico cualificado', 'Visibilidad 24/7', 'ROI sostenible'], phrase: '"Mis clientes me encuentran primero"' },
            7: { icon: '<i class="fas fa-mobile-alt"></i>', title: 'Apps con IA', desc: 'Aplicaciones móviles inteligentes para tus usuarios.', benefits: ['Experiencia personalizada', 'Funciones inteligentes', 'Alta retención', 'Monetización integrada'], phrase: '"Mis usuarios aman mi app"' },
            8: { icon: '<i class="fas fa-database"></i>', title: 'Backups Automáticos', desc: 'Tus datos siempre seguros con copias diarias.', benefits: ['Copia diaria automática', 'Recuperación rápida', 'Almacenamiento seguro', 'Tranquilidad total'], phrase: '"Mis datos están siempre a salvo"' },
            9: { icon: '<i class="fas fa-cloud-upload-alt"></i>', title: 'Hosting Blindado', desc: 'Servidores rápidos y protegidos contra ataques.', benefits: ['Uptime 99.9%', 'Protección DDoS', 'Velocidad máxima', 'Soporte técnico'], phrase: '"Mi sitio nunca se cae"' },
            10: { icon: '<i class="fas fa-envelope"></i>', title: 'Correos Corporativos', desc: 'Email profesional con dominio propio.', benefits: ['Imagen profesional', 'Dominio personalizado', 'Seguridad avanzada', 'Sin publicidad'], phrase: '"Mi marca se ve profesional"' },
            11: { icon: '<i class="fas fa-chart-pie"></i>', title: 'Dashboards IA', desc: 'Visualiza tus datos en tiempo real.', benefits: ['Datos en tiempo real', 'Visualización intuitiva', 'KPIs personalizados', 'Toma de decisiones ágil'], phrase: '"Veo todo lo que importa"' },
            12: { icon: '<i class="fas fa-microchip"></i>', title: 'Procesamiento de Datos', desc: 'Análisis de grandes volúmenes de información.', benefits: ['Big Data', 'Procesamiento rápido', 'Insights accionables', 'Escalabilidad total'], phrase: '"Mis datos trabajan para mí"' },
            13: { icon: '<i class="fas fa-image"></i>', title: 'Generación de Imágenes', desc: 'Crea imágenes profesionales con IA.', benefits: ['Calidad profesional', 'Rápido y económico', 'Sin derechos de autor', 'Personalización total'], phrase: '"Creo contenido único"' },
            14: { icon: '<i class="fas fa-file-alt"></i>', title: 'Procesa Documentos', desc: 'Extrae información de documentos automáticamente.', benefits: ['OCR inteligente', 'Extracción automática', 'Ahorro de tiempo', 'Precisión 99%'], phrase: '"Los documentos se leen solos"' },
            15: { icon: '<i class="fas fa-headset"></i>', title: 'Soporte 24/7', desc: 'Asistencia humana + chatbot siempre disponibles.', benefits: ['Atención 24/7', 'Respuesta inmediata', 'Equipo humano', 'Chatbot inteligente'], phrase: '"Nunca dejo a mis clientes solos"' }
        };

        // ✅ CORRECCIÓN: Ahora escucha clics en .cat-card (tu nueva clase)
        document.querySelectorAll('.cat-card').forEach(card => {
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
                setTimeout(() => modalIcon.classList.add('float-active'), 300);
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            modal.classList.remove('active');
            modalIcon.classList.remove('float-active');
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

    // ✅ 5. FORMULARIO (MAILTO)
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
        });
    }

    // ✅ 6. HEADER & FECHAS
    const header = document.querySelector('.site-header');
    if (header) window.addEventListener('scroll', () => header.style.boxShadow = window.scrollY > 50 ? '0 4px 6px rgba(0,0,0,0.1)' : 'none');
    
    const now = new Date();
    const copy = document.getElementById('copyright-text');
    if (copy) copy.textContent = `${now.getFullYear()} Xpider - Inteligencia Artificial para empresas. Todos los derechos reservados.`;
});
