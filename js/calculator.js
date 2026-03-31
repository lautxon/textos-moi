/* ============================================
   CALCULADORA DE PROYECTOS - LÓGICA COMPLETA
   API: dolarapi.com (gratis, sin auth)
   ============================================ */

// ============================================
// ESTADO DE LA CALCULADORA
// ============================================

let dolarData = {
  blue: { compra: 0, venta: 0, fecha: '' },
  oficial: { compra: 0, venta: 0, fecha: '' },
  mep: { compra: 0, venta: 0, fecha: '' }
};

let currentDolarType = 'blue';

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
// CONSUMO DE API - DÓLARAPI.COM
// ============================================

async function fetchDolarData() {
  try {
    console.log('📡 Consultando dolarapi.com...');
    
    const response = await fetch('https://dolarapi.com/v1/dolares');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extraer los tipos que nos interesan
    const blue = data.find(d => d.casa === 'blue');
    const oficial = data.find(d => d.casa === 'oficial');
    const mep = data.find(d => d.casa === 'bolsa'); // MEP = bolsa
    
    if (blue) {
      dolarData.blue = {
        compra: blue.compra,
        venta: blue.venta,
        fecha: blue.fechaActualizacion
      };
    }
    
    if (oficial) {
      dolarData.oficial = {
        compra: oficial.compra,
        venta: oficial.venta,
        fecha: oficial.fechaActualizacion
      };
    }
    
    if (mep) {
      dolarData.mep = {
        compra: mep.compra,
        venta: mep.venta,
        fecha: mep.fechaActualizacion
      };
    }
    
    console.log('✅ Dólares cargados:', dolarData);
    updateDolarUI();
    calculateTotal(); // Recalcular con los nuevos valores
    
  } catch (error) {
    console.error('❌ Error al consultar la API:', error);
    
    // Fallback: valores fijos por si la API falla
    dolarData = {
      blue: { compra: 1150, venta: 1170, fecha: new Date().toISOString() },
      oficial: { compra: 980, venta: 1020, fecha: new Date().toISOString() },
      mep: { compra: 1100, venta: 1120, fecha: new Date().toISOString() }
    };
    
    console.warn('⚠️ Usando valores fallback');
    updateDolarUI();
    calculateTotal();
  }
}

// ============================================
// ACTUALIZAR UI DE DÓLARES
// ============================================

function updateDolarUI() {
  // Actualizar botones con los valores
  document.getElementById('dolar-blue').textContent = `$${dolarData.blue.venta.toLocaleString('es-AR')}`;
  document.getElementById('dolar-oficial').textContent = `$${dolarData.oficial.venta.toLocaleString('es-AR')}`;
  document.getElementById('dolar-mep').textContent = `$${dolarData.mep.venta.toLocaleString('es-AR')}`;
  
  // Actualizar fecha (usar la del blue como referencia)
  const fechaEl = document.getElementById('dolar-date');
  if (dolarData.blue.fecha) {
    const fecha = new Date(dolarData.blue.fecha);
    const fechaStr = fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    fechaEl.textContent = `Actualizado: ${fechaStr}`;
  } else {
    fechaEl.textContent = 'Actualizado: hoy';
  }
  
  // Actualizar conversión ARS
  updateArsConversion();
}

function updateArsConversion() {
  const rate = dolarData[currentDolarType].venta;
  document.getElementById('ars-rate').textContent = `$${rate.toLocaleString('es-AR')}`;
  document.getElementById('ars-type').textContent = `(${currentDolarType.charAt(0).toUpperCase() + currentDolarType.slice(1)})`;
}

// ============================================
// CÁLCULO DEL PRESUPUESTO
// ============================================

function calculateTotal() {
  // Obtener valores de los sliders
  const hourlyRate = parseFloat(document.getElementById('hourly-rate').value);
  const estimatedHours = parseFloat(document.getElementById('estimated-hours').value);
  
  // Calcular base
  const baseUSD = hourlyRate * estimatedHours;
  
  // Calcular features
  let featuresPercentage = 0;
  document.querySelectorAll('.feature:checked').forEach(checkbox => {
    featuresPercentage += parseFloat(checkbox.value);
  });
  const featuresUSD = baseUSD * featuresPercentage;
  
  // Calcular rush delivery
  const rushValue = document.querySelector('input[name="rush"]:checked')?.value || '0';
  const rushPercentage = parseFloat(rushValue);
  const rushUSD = baseUSD * rushPercentage;
  
  // Total USD
  const totalUSD = baseUSD + featuresUSD + rushUSD;
  
  // Total ARS
  const arsRate = dolarData[currentDolarType].venta;
  const totalARS = totalUSD * arsRate;
  
  // Actualizar UI
  updateResultsUI(baseUSD, featuresUSD, rushUSD, totalUSD, totalARS, arsRate);
}

function updateResultsUI(baseUSD, featuresUSD, rushUSD, totalUSD, totalARS, arsRate) {
  // Formato de moneda
  const formatUSD = (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  const formatARS = (value) => `$${value.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  
  // Breakdown
  document.getElementById('base-usd').textContent = formatUSD(baseUSD);
  document.getElementById('features-usd').textContent = `+${formatUSD(featuresUSD)}`;
  document.getElementById('rush-usd').textContent = `+${formatUSD(rushUSD)}`;
  document.getElementById('total-usd').textContent = formatUSD(totalUSD);
  
  // Conversión ARS
  document.getElementById('ars-rate').textContent = `$${arsRate.toLocaleString('es-AR')}`;
  document.getElementById('total-ars').textContent = formatARS(totalARS);
}

// ============================================
// ACTUALIZAR DISPLAY DE SLIDERS
// ============================================

function updateSliderDisplays() {
  const hourlyRate = document.getElementById('hourly-rate');
  const estimatedHours = document.getElementById('estimated-hours');
  
  // Display tarifa
  document.getElementById('hourly-rate-display').textContent = `$${hourlyRate.value}`;
  
  // Display horas
  document.getElementById('hours-display').textContent = `${estimatedHours.value}h`;
  
  // Actualizar nivel (Junior/Mid/Senior)
  const rateLevels = document.querySelectorAll('.rate-level');
  rateLevels.forEach(level => {
    level.classList.remove('active');
    const rateValue = parseInt(level.dataset.rate);
    if (rateValue === parseInt(hourlyRate.value)) {
      level.classList.add('active');
    }
  });
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Slider de tarifa por hora
  const hourlyRateSlider = document.getElementById('hourly-rate');
  if (hourlyRateSlider) {
    hourlyRateSlider.addEventListener('input', () => {
      updateSliderDisplays();
      calculateTotal();
    });
  }
  
  // Slider de horas estimadas
  const hoursSlider = document.getElementById('estimated-hours');
  if (hoursSlider) {
    hoursSlider.addEventListener('input', () => {
      document.getElementById('hours-display').textContent = `${hoursSlider.value}h`;
      calculateTotal();
    });
  }
  
  // Selector de tipo de dólar
  document.querySelectorAll('.dolar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover active de todos
      document.querySelectorAll('.dolar-btn').forEach(b => b.classList.remove('active'));
      // Agregar active al seleccionado
      btn.classList.add('active');
      // Actualizar tipo actual
      currentDolarType = btn.dataset.type;
      // Recalcular
      calculateTotal();
    });
  });
  
  // Features checkboxes
  document.querySelectorAll('.feature').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      calculateTotal();
    });
  });
  
  // Rush delivery radio buttons
  document.querySelectorAll('input[name="rush"]').forEach(radio => {
    radio.addEventListener('change', () => {
      calculateTotal();
    });
  });
}

// ============================================
// INICIALIZACIÓN ESPECÍFICA DE CALCULADORA
// ============================================

function initCalculator() {
  console.log('✨ Inicializando calculadora...');
  
  // Configurar event listeners
  setupEventListeners();
  
  // Actualizar displays iniciales
  updateSliderDisplays();
  
  // Consultar API del dólar
  fetchDolarData();
  
  console.log('✅ Calculadora lista');
}

// ============================================
// INIT AL CARGAR EL DOM
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Aplicar fondo de calculadora
  setCalculatorBackground();
  
  // Inicializar lógica de calculadora
  initCalculator();
});
