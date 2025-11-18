document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('mannequin-container');
    const statusText = document.querySelector('.status');
    const body = document.body;

    // 1. Catálogo de prendas: define la variabilidad.
    const assets = {
        top: ['assets/top-1.png', 'assets/top-2.png', 'assets/top-3.png'],
        bottom: ['assets/pantalon-1.png', 'assets/pantalon-2.png', 'assets/pantalon-3.png'],
        jacket: ['assets/chaqueta-1.png', 'assets/chaqueta-2.png', 'assets/chaqueta-3.png'],
        // Puedes añadir más: shoes, accessories, etc.
    };

    // 2. Variables para detectar la velocidad del mouse (Interactividad no convencional)
    let lastX = 0;
    let lastY = 0;
    let velocityThreshold = 100; // El umbral de velocidad del mouse para activar

    /**
     * Función que selecciona una prenda al azar.
     */
    const getRandomAsset = (category) => {
        const list = assets[category];
        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    };

    /**
     * Función que aplica filtros CSS para la distorsión/glitch (No Linealidad y Expresividad)
     */
    const applyChaosFilters = (element) => {
        const hue = Math.floor(Math.random() * 360);
        const sat = Math.random() * 0.5 + 1; // 1 a 1.5
        const blur = Math.random() * 2; // 0 a 2px
        const contrast = Math.random() * 0.5 + 1.2; // 1.2 a 1.7

        // Aplicar filtros aleatorios y un pequeño offset de posición (glitch)
        element.style.filter = `hue-rotate(${hue}deg) saturate(${sat}) blur(${blur}px) contrast(${contrast})`;
        element.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
    };

    /**
     * Función principal que genera y renderiza el outfit.
     */
    const generateOutfit = () => {
        container.innerHTML = ''; // Limpia el contenedor
        
        // 1. Genera cada pieza y la inserta
        Object.keys(assets).forEach(category => {
            const imgSrc = getRandomAsset(category);
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.className = 'outfit-piece';
            imgElement.style.zIndex = (category === 'jacket') ? 3 : 2; // Controla capas
            
            // 2. Aplica el caos visual a la pieza
            applyChaosFilters(imgElement);

            container.appendChild(imgElement);
        });

        // 3. Activa el efecto de glitch en el body y lo desactiva rápidamente
        body.classList.add('glitch-active');
        statusText.textContent = 'Estado: Generando Caos...';
        setTimeout(() => {
            body.classList.remove('glitch-active');
            statusText.textContent = 'Estado: Listo para otro impulso.';
        }, 500);
    };

    // 4. Lógica de Interacción: Escucha el movimiento del mouse
    document.addEventListener('mousemove', (event) => {
        const deltaX = Math.abs(event.clientX - lastX);
        const deltaY = Math.abs(event.clientY - lastY);
        const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        lastX = event.clientX;
        lastY = event.clientY;

        // Si la velocidad excede el umbral, genera el nuevo outfit.
        if (velocity > velocityThreshold) {
            generateOutfit();
        }
    });

    // Genera el outfit inicial al cargar la página.
    generateOutfit();
});