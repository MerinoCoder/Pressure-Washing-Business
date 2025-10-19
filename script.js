document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del menú hamburguesa para móviles
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Cambia el icono de hamburguesa a X y viceversa
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Cierra el menú cuando se hace clic en un enlace de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Filtro de proyectos en la sección "Nuestros Trabajos"
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remueve la clase 'active' de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añade la clase 'active' al botón clicado
            button.classList.add('active');

            const filter = button.dataset.filter; // Obtiene el valor del atributo data-filter

            projectCards.forEach(card => {
                const category = card.dataset.category; // Obtiene la categoría de la tarjeta
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block'; // Muestra la tarjeta
                } else {
                    card.style.display = 'none'; // Oculta la tarjeta
                }
            });
        });
    });

    // 3. Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. Navegación activa al hacer scroll
    const sections = document.querySelectorAll('section');
    const navList = document.querySelector('.nav-list'); // Obtenemos el contenedor de los enlaces
    
    function highlightNavOnScroll() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajusta el offset para que la sección se active un poco antes de llegar a su parte superior
            if (pageYOffset >= sectionTop - 150) { 
                current = section.getAttribute('id');
            }
        });

        navList.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Llama la función al cargar para establecer el estado inicial


    // 5. Redireccionar botón "Solicitar presupuesto" del header al formulario de contacto
    const solicitarPresupuestoBtn = document.getElementById('solicitar-presupuesto-nav');
    if (solicitarPresupuestoBtn) {
        solicitarPresupuestoBtn.addEventListener('click', () => {
            document.querySelector('#contacto').scrollIntoView({
                behavior: 'smooth'
            });
            // Opcional: enfocar el primer campo del formulario de contacto
            setTimeout(() => {
                document.getElementById('nombre').focus();
            }, 800); // Pequeño retraso para que el scroll termine
        });
    }

    // 6. Validación básica del formulario (opcional, el HTML ya tiene 'required')
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Aquí podrías añadir una validación JS más compleja si es necesario,
            // pero los atributos 'required' en HTML ya hacen un buen trabajo para lo básico.
            if (!document.getElementById('acepto-privacidad').checked) {
                alert('Debes aceptar la política de privacidad.');
                e.preventDefault(); // Evita que el formulario se envíe
            } else {
                // Si todo está bien, podrías enviar los datos con Fetch API o XMLHttpRequest
                // Para este ejemplo simple, solo mostraremos una alerta
                alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
                // e.preventDefault(); // Descomenta esta línea si no quieres que el formulario se recargue
                contactForm.reset(); // Limpia el formulario después del envío
            }
        });
    }
});

// Modern Before/After Slider functionality
class ModernSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.isAnimating = false;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        // Inicializar primer slide
        this.updateSlider();
        
        // Event listeners para botones
        document.querySelector('.prev-btn')?.addEventListener('click', () => this.prevSlide());
        document.querySelector('.next-btn')?.addEventListener('click', () => this.nextSlide());
        
        // Event listeners para dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
    }

    prevSlide() {
        if (this.isAnimating) return;
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.updateSlider();
    }

    nextSlide() {
        if (this.isAnimating) return;
        this.currentSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
        this.updateSlider();
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {
        this.isAnimating = true;

        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index < this.currentSlide) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        // Reset animating flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slider = document.querySelector('.slider-container');
        if (!slider) return;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
}

// Legacy functions para compatibilidad con HTML onclick
function changeSlide(n) {
    if (window.modernSlider) {
        if (n > 0) window.modernSlider.nextSlide();
        else window.modernSlider.prevSlide();
    }
}

function currentSlide(n) {
    if (window.modernSlider) {
        window.modernSlider.goToSlide(n - 1);
    }
}

// Initialize slider cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.modernSlider = new ModernSlider();
});