/* ============================================
   CALCULADORA DE PROYECTOS - LÓGICA ESPECÍFICA
   ============================================ */

// ============================================
// FONDO DE IMAGEN PARA CALCULADORA
// ============================================

function setCalculatorBackground() {
  const heroSection = document.getElementById('hero-calculadora');
  if (!heroSection) {
    console.error('❌ No se encontró #hero-calculadora');
    return;
  }

  // Imagen aleatoria de negocios (8 imágenes)
  const randomIndex = Math.floor(Math.random() * 8) + 1;
  const imageUrl = `./images/calculadora/negocios-${randomIndex}.jpg?t=${Date.now()}`;
  
  // Aplicar imagen inline (override total del CSS)
  heroSection.setAttribute('style', 
    `background-image: url('${imageUrl}') !important; 
     background-size: cover !important; 
     background-position: center !important; 
     background-repeat: no-repeat !important;`
  );
  
  console.log(`💼 Fondo calculadora: negocios-${randomIndex}.jpg`);
}

// ============================================
// INICIALIZACIÓN ESPECÍFICA DE CALCULADORA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Aplicar fondo de calculadora
  setCalculatorBackground();
  
  console.log('✨ Calculadora inicializada');
});
