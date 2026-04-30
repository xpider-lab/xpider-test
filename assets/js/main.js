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

    // ✅ 2. MODAL UNIVERSAL (CAPACITA PILARES + SOLUCIONES + CAPACITACIÓN)
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const modalIcon = document.getElementById('modalIcon');
    
    if (modal && modalContent) {
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDescription');
        const modalBenefits = document.getElementById('modalBenefits');
        const modalPhrase = document.getElementById('modalPhrase');

        const servicesData = {
            1: { icon: '<i class="fas fa-bolt"></i>', title: 'Talleres Prácticos', desc: 'Capacitaciones intensivas orientadas a resultados rápidos y aplicables desde el primer día.', benefits: ['Uso de IA en tareas reales del negocio', 'Herramientas como ChatGPT', 'Automatización de procesos repetitivos', 'Casos prácticos según industria'], phrase: '"Aprende haciendo, implementa desde el día 1."' },
            2: { icon: '<i class="fas fa-graduation-cap"></i>', title: 'Programas de Capacitación', desc: 'Formación estructurada para incorporar inteligencia artificial dentro de la empresa.', benefits: ['Fundamentos de IA y transformación digital', 'Automatización de procesos internos', 'Cultura digital y gestión del cambio', 'Toma de decisiones basada en datos'], phrase: '"El conocimiento es poder, pero la aplicación es rentabilidad."' },
            3: { icon: '<i class="fas fa-rocket"></i>', title: 'Consultoría e Implementación', desc: 'Servicio estratégico enfocado en resultados reales y medibles dentro del negocio.', benefits: ['Diagnóstico digital de la empresa', 'Identificación de oportunidades con IA', 'Implementación de automatizaciones y chatbots', 'Acompañamiento continuo'], phrase: '"No solo te damos un mapa, te acompañamos en el viaje."' },
            4: { icon: '<i class="fas fa-microphone-alt"></i>', title: 'Charlas Ejecutivas', desc: 'Instancias estratégicas para líderes que buscan entender el impacto real de la IA.', benefits: ['Tendencias actuales en inteligencia artificial', 'Impacto en distintas industrias', 'Oportunidades para la empresa', 'Roadmap de transformación digital'], phrase: '"El futuro pertenece a quienes se preparan para él hoy."' },
            100: { icon: '<i class="fas fa-bolt"></i>', title: 'Automatización Inteligente', desc: 'Elimina tareas manuales y escala tu operación sin aumentar costos de personal.', benefits: ['Chatbots 24/7 integrados a WhatsApp y Web', 'Automatización RPA para procesos repetitivos', 'Desarrollo de Webs optimizadas con IA', 'Aplicaciones móviles inteligentes y escalables'], phrase: '"La automatización es el superpoder de los negocios modernos."' },
            101: { icon: '<i class="fas fa-chart-line"></i>', title: 'Datos & Estrategia', desc: 'Convierte información dispersa en decisiones rentables y altamente visibles.', benefits: ['Analítica Predictiva para anticipar tendencias', 'Dashboards interactivos de KPIs en tiempo real', 'SEO Inteligente para posicionamiento orgánico', 'Procesamiento inteligente de documentos y datos'], phrase: '"Sin datos, solo eres una persona más con una opinión."' },
            102: { icon: '<i class="fas fa-shield-alt"></i>', title: 'Seguridad & Soporte', desc: 'Protege tus activos digitales y mantén tu operación encendida 24/7.', benefits: ['Ciberseguridad IA con detección proactiva', 'Hosting Blindado con alta disponibilidad', 'Backups automáticos inmutables y seguros', 'Soporte técnico 24/7 + Correos corporativos'], phrase: '"La seguridad no es un gasto, es tu seguro de vida digital."' }
        };

        // ✅ Event Delegation Universal
        document.addEventListener('click', function(e) {
            const card = e.target.closest('[data-id]');
            if (!card) return;
            
            const id = card.getAttribute('data-id');
            const data = servicesData[id];
            if (!data) return;

            modalIcon.innerHTML = data.icon;
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;
            modalBenefits.innerHTML = data.benefits.map(b => `<li><i class="fas fa-check-circle"></i> ${b}</li>`).join('');
            modalPhrase.innerHTML = `<i class="fas fa-quote-left"></i> ${data.phrase}`;

            modal.style.display = 'flex';
            void modal.offsetWidth; 
            modal.classList.add('active');
            setTimeout(() => modalIcon.classList.add('float-active'), 50);
            document.body.style.overflow = 'hidden';
        });

        function closeModal() { 
            modal.classList.remove('active'); 
            modalIcon.classList.remove('float-active'); 
            setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = ''; }, 300); 
        }
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
