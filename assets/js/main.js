document.addEventListener('DOMContentLoaded', function() {
    // ✅ 1. PARTÍCULAS MULTI-CANVAS (Hero + Resultados)
    document.querySelectorAll('.particle-canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resizeCanvas() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
        function createParticles() {
            particles = [];
            const count = window.innerWidth < 768 ? 40 : 80;
            for (let i = 0; i < count; i++) particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 2 + 1, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6, alpha: Math.random() * 0.4 + 0.15 });
        }
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 120) { ctx.beginPath(); ctx.strokeStyle = `rgba(220, 38, 38, ${(1 - dist/120)*0.25})`; ctx.lineWidth = 0.8; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
                }
            }
            for (let p of particles) { ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2); ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha})`; ctx.fill(); p.x += p.vx; p.y += p.vy; if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0; if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0; }
            requestAnimationFrame(drawParticles);
        }
        resizeCanvas(); createParticles(); drawParticles();
        window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
    });

    // ✅ 2. MODAL UNIVERSAL CON PROBLEMA + SOLUCIÓN
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const modalIcon = document.getElementById('modalIcon');
    if (modal && modalContent) {
        const modalTitle = document.getElementById('modalTitle'), modalDesc = document.getElementById('modalDescription'), modalBenefits = document.getElementById('modalBenefits'), modalPhrase = document.getElementById('modalPhrase');
        const servicesData = {
            100: { icon: '<i class="fas fa-bolt"></i>', title: 'Automatización Inteligente', desc: `<strong>🔹 PROBLEMA:</strong> Tu equipo pierde 15+ horas semanales en tareas repetitivas. La saturación frena el crecimiento y genera errores costosos.<br><br><strong>✅ SOLUCIÓN:</strong> Implementamos chatbots con IA 24/7, automatizamos flujos con RPA e integramos tus herramientas. Resultado: tu equipo se enfoca en vender y crecer.`, benefits: ['Atención 24/7 sin aumentar nómina', 'Eliminación de errores humanos', 'Integración con WhatsApp/Web/CRM', 'Escalabilidad inmediata'], phrase: '"La automatización es el superpoder de los negocios modernos."' },
            101: { icon: '<i class="fas fa-chart-line"></i>', title: 'Datos & Estrategia', desc: `<strong>🔹 PROBLEMA:</strong> Datos dispersos en hojas de cálculo. No sabes qué se venderá, ni por qué pierdes tráfico, ni cómo optimizar presupuesto.<br><br><strong>✅ SOLUCIÓN:</strong> Centralizamos información en dashboards en tiempo real, aplicamos analítica predictiva y optimizamos SEO con IA. Resultado: decisiones basadas en evidencia, con ROI medible.`, benefits: ['Predicciones con +85% de precisión', 'Visualización de KPIs en tiempo real', 'Posicionamiento orgánico automatizado', 'Reportes ejecutivos automáticos'], phrase: '"Sin datos, solo eres una persona más con una opinión."' },
            102: { icon: '<i class="fas fa-shield-alt"></i>', title: 'Seguridad & Soporte', desc: `<strong>🔹 PROBLEMA:</strong> Una caída de servidor o un ransomware pone en riesgo datos críticos. Sin backups ni soporte rápido, pierdes dinero y credibilidad.<br><br><strong>✅ SOLUCIÓN:</strong> Blindamos infraestructura con ciberseguridad IA, hosting de alta disponibilidad, backups inmutables y soporte 24/7 real. Resultado: operaciones seguras, cero downtime.`, benefits: ['Detección y bloqueo proactivo de amenazas', 'Uptime garantizado 99.9%', 'Recuperación ante desastres en minutos', 'Correos corporativos seguros con tu dominio'], phrase: '"La seguridad no es un gasto, es tu seguro de vida digital."' },
            1: { icon: '<i class="fas fa-bolt"></i>', title: 'Talleres Prácticos', desc: `<strong>🔹 PROBLEMA:</strong> Tu equipo escucha sobre IA pero no sabe por dónde empezar. Pierden tiempo probando herramientas al azar sin resultados.<br><br><strong>✅ SOLUCIÓN:</strong> Sesiones 100% prácticas adaptadas a tu industria. Salen con flujos listos, prompts optimizados y casos reales aplicados a su trabajo.`, benefits: ['Aprendizaje hands-on desde el día 1', 'Casos reales de tu industria', 'Plantillas y herramientas listas para usar', 'Resultados medibles en la primera semana'], phrase: '"Aprende haciendo, implementa desde el día 1."' },
            2: { icon: '<i class="fas fa-graduation-cap"></i>', title: 'Programas de Capacitación', desc: `<strong>🔹 PROBLEMA:</strong> Quieren digitalizarse pero hay resistencia al cambio y procesos anclados en métodos manuales.<br><br><strong>✅ SOLUCIÓN:</strong> Programa estructurado (4-8 semanas) que transforma mentalidades y procesos. Incluye IA aplicada, gestión del cambio y un proyecto piloto real.`, benefits: ['Transformación cultural guiada', 'Proyecto piloto con resultados reales', 'Certificación de competencias', 'Equipo alineado y autónomo'], phrase: '"El conocimiento es poder, pero la aplicación es rentabilidad."' },
            3: { icon: '<i class="fas fa-rocket"></i>', title: 'Consultoría e Implementación', desc: `<strong>🔹 PROBLEMA:</strong> Sabes que la IA puede mejorar tu negocio, pero no tienes claridad estratégica. El riesgo de invertir en la solución equivocada es alto.<br><br><strong>✅ SOLUCIÓN:</strong> Diagnóstico digital, identificación de oportunidades de mayor impacto e implementación end-to-end con acompañamiento continuo.`, benefits: ['Diagnóstico estratégico personalizado', 'Implementación sin interrupciones', 'Métricas de ROI claras y trazables', 'Soporte post-lanzamiento incluido'], phrase: '"No solo te damos un mapa, te acompañamos en el viaje."' },
            4: { icon: '<i class="fas fa-microphone-alt"></i>', title: 'Charlas Ejecutivas', desc: `<strong>🔹 PROBLEMA:</strong> Los directivos escuchan buzzwords como "IA generativa", pero no tienen claridad sobre el impacto real en su industria.<br><br><strong>✅ SOLUCIÓN:</strong> Sesiones de alto nivel, sin tecnicismos innecesarios. Entregamos tendencias, casos de éxito en tu sector y un roadmap práctico de adopción.`, benefits: ['Visión estratégica 12-24 meses', 'Roadmap de implementación claro', 'Decisiones directivas aceleradas', 'Liderazgo tecnológico informado'], phrase: '"El futuro pertenece a quienes se preparan para él hoy."' }
        };

        document.addEventListener('click', function(e) {
            const card = e.target.closest('[data-id]'); if (!card) return;
            const id = card.getAttribute('data-id'), data = servicesData[id]; if (!data) return;
            modalIcon.innerHTML = data.icon; modalTitle.textContent = data.title; modalDesc.innerHTML = data.desc;
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
