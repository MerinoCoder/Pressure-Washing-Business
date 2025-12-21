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

    // 6. Form submission with Web3Forms - no custom validation needed
    // Web3Forms handles the submission automatically
});

// Initialize slider when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Before/After Image Slider functionality
    document.querySelectorAll('.before-after-slider').forEach(slider => {
        const afterContainer = slider.querySelector('.after-container');
        const sliderLine = slider.querySelector('.slider-line');
        let isActive = false;
        
        function updateSlider(e) {
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const sliderPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            afterContainer.style.clipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;
            sliderLine.style.left = `${sliderPosition}%`;
        }
        
        // Activate on mouse enter for immediate response
        slider.addEventListener('mouseenter', (e) => {
            isActive = true;
            updateSlider(e);
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (isActive) {
                updateSlider(e);
            }
        });
        
        // Reset to 50% on mouse leave
        slider.addEventListener('mouseleave', () => {
            isActive = false;
            afterContainer.style.clipPath = 'inset(0 50% 0 0)';
            sliderLine.style.left = '50%';
        });
    });
});