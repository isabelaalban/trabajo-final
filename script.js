document.addEventListener('DOMContentLoaded', () => {
    const statusText = document.querySelector('.status');
    const body = document.body;
    const top = document.getElementById('top');
    const pantalon = document.getElementById('pantalon');
    const chaqueta = document.getElementById('chaqueta');

    // 1. Catálogo de prendas: define la variabilidad.
    const assets = {
        top: ['assets/top-1.png', 'assets/top-2.png', 'assets/top-3.png'],
        pantalon: ['assets/pantalon-1.png', 'assets/pantalon-2.png', 'assets/pantalon-3.png'],
        chaqueta: ['assets/chaqueta-1.png', 'assets/chaqueta-2.png', 'assets/chaqueta-3.png'],
        // Puedes añadir más: shoes, accessories, etc.
    };

    // 2. Variables para detectar la velocidad del mouse (Interactividad no convencional)
    let lastX = 0;
    let lastY = 0;
    let velocityThreshold = 100; // El umbral de velocidad del mouse para activar

    // Función para generar un número aleatorio entre un valor mínimo y un máximo
function numeroAleatorio(min, max) {
  return Math.ceil(Math.random() * (max - min) + min - 1);
}

    /**
     * Función principal que genera y renderiza el outfit.
     */
    const generateOutfit = () => {
        top.innerHTML = ''; // Limpia el contenedor
        pantalon.innerHTML = ''; // Limpia el contenedor
        chaqueta.innerHTML = ''; // Limpia el contenedor
        
        
        // 1. Genera cada pieza y la inserta
            const imgSrcTop = assets.top[numeroAleatorio(0, assets.top.length - 1)];
            const imgSrcChaqueta = assets.chaqueta[numeroAleatorio(0, assets.chaqueta.length - 1)];
            const imgSrcPantalon = assets.pantalon[numeroAleatorio(0, assets.pantalon.length - 1)];

            top.src = imgSrcTop;
            chaqueta.src = imgSrcChaqueta;
            pantalon.src = imgSrcPantalon;

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