/* ============================================
   CALCULADORA DE COSTOS - TEXTOS MOI
   Presupuesto dinámico para sitios web de autor
   ============================================ */

// ============================================
// ESTADO DE LA CALCULADORA
// ============================================

const calculatorState = {
  hourlyRate: 75,        // USD/hora
  estimatedHours: 50,    // horas
  dolarType: 'blue',     // blue | oficial | mep
  dolarRate: 0,          // se carga de la API
  featuresMultiplier: 0, // suma de features seleccionadas
  rushMultiplier: 0      // 0 | 0.3 | 0.5
};

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const elements = {
  // Sliders
  hourlyRateSlider: null,
  hoursSlider: null,
  hourlyRateDisplay: null,
  hoursDisplay: null,
  
  // Dólar
  dolarButtons: [],
  dolarValues: {},
  dolarDate: null,
  
  // Features
  featureCheckboxes: [],
  
  // Rush
  rushRadios: [],
  
  // Resultados
  baseUsd: null,
  featuresUsd: null,
  rushUsd: null,
  totalUsd: null,
  arsRate: null,
  arsType: null,
  totalArs: null
};

// ============================================
// INICIALIZACIÓN
// ============================================

function initCalculator() {
  cacheElements();
  setupEventListeners();
  loadDolarRates();
  updateCalculations();
  
  console.log('✨ Calculadora inicializada');
}

function cacheElements() {
  // Sliders
  elements.hourlyRateSlider = document.getElementById('hourly-rate');
  elements.hoursSlider = document.getElementById('estimated-hours');
  elements.hourlyRateDisplay = document.getElementById('hourly-rate-display');
  elements.hoursDisplay = document.getElementById('hours-display');
  
  // Dólar
  elements.dolarButtons = document.querySelectorAll('.dolar-btn');
  elements.dolarValues = {
    blue: document.getElementById('dolar-blue'),
    oficial: document.getElementById('dolar-oficial'),
    mep: document.getElementById('dolar-mep')
  };
  elements.dolarDate = document.getElementById('dolar-date');
  
  // Features
  elements.featureCheckboxes = document.querySelectorAll('.feature');
  
  // Rush
  elements.rushRadios = document.querySelectorAll('input[name="rush"]');
  
  // Resultados
  elements.baseUsd = document.getElementById('base-usd');
  elements.featuresUsd = document.getElementById('features-usd');
  elements.rushUsd = document.getElementById('rush-usd');
  elements.totalUsd = document.getElementById('total-usd');
  elements.arsRate = document.getElementById('ars-rate');
  elements.arsType = document.getElementById('ars-type');
  elements.totalArs = document.getElementById('total-ars');
}

function setupEventListeners() {
  // Sliders
  elements.hourlyRateSlider?.addEventListener('input', handleHourlyRateChange);
  elements.hoursSlider?.addEventListener('input', handleHoursChange);
  
  // Dólar buttons
  elements.dolarButtons.forEach(btn => {
    btn.addEventListener('click', handleDolarTypeChange);
  });
  
  // Features
  elements.featureCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleFeaturesChange);
  });
  
  // Rush
  elements.rushRadios.forEach(radio => {
    radio.addEventListener('change', handleRushChange);
  });
}

// ============================================
// HANDLERS
// ============================================

function handleHourlyRateChange(e) {
  calculatorState.hourlyRate = parseInt(e.target.value);
  elements.hourlyRateDisplay.textContent = `$${calculatorState.hourlyRate}`;
  updateRateLevelsHighlight();
  updateCalculations();
}

function handleHoursChange(e) {
  calculatorState.estimatedHours = parseInt(e.target.value);
  elements.hoursDisplay.textContent = `${calculatorState.estimatedHours}h`;
  updateCalculations();
}

function handleDolarTypeChange(e) {
  const btn = e.currentTarget;
  const type = btn.dataset.type;
  
  calculatorState.dolarType = type;
  
  // Update active button
  elements.dolarButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  updateCalculations();
}

function handleFeaturesChange() {
  let multiplier = 0;
  elements.featureCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      multiplier += parseFloat(checkbox.value);
    }
  });
  calculatorState.featuresMultiplier = multiplier;
  updateCalculations();
}

function handleRushChange(e) {
  calculatorState.rushMultiplier = parseFloat(e.target.value);
  updateCalculations();
}

// ============================================
// CÁLCULOS
// ============================================

function updateCalculations() {
  const { hourlyRate, estimatedHours, dolarRate, featuresMultiplier, rushMultiplier } = calculatorState;
  
  // Base
  const base = hourlyRate * estimatedHours;
  
  // Features
  const featuresAmount = base * featuresMultiplier;
  
  // Subtotal antes de rush
  const subtotal = base + featuresAmount;
  
  // Rush
  const rushAmount = subtotal * rushMultiplier;
  
  // Total USD
  const totalUSD = subtotal + rushAmount;
  
  // Total ARS
  const totalARS = totalUSD * dolarRate;
  
  // Update UI
  updateResultsUI(base, featuresAmount, rushAmount, totalUSD, totalARS);
}

function updateResultsUI(base, features, rush, totalUSD, totalARS) {
  // USD
  elements.baseUsd.textContent = formatUSD(base);
  elements.featuresUsd.textContent = `+${formatUSD(features)}`;
  elements.rushUsd.textContent = `+${formatUSD(rush)}`;
  elements.totalUsd.textContent = formatUSD(totalUSD);
  
  // ARS
  elements.arsRate.textContent = formatARS(calculatorState.dolarRate);
  elements.arsType.textContent = `(${capitalize(calculatorState.dolarType)})`;
  elements.totalArs.textContent = formatARS(totalARS);
}

// ============================================
// API DÓLAR
// ============================================

async function loadDolarRates() {
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares');
    const data = await response.json();
    
    // Procesar datos
    const blue = data.find(d => d.casa === 'blue');
    const oficial = data.find(d => d.casa === 'oficial');
    const mep = data.find(d => d.casa === 'bolsa');
    
    if (blue) {
      calculatorState.dolarRate = blue.venta;
      elements.dolarValues.blue.textContent = formatARS(blue.venta);
    }
    if (oficial) {
      elements.dolarValues.oficial.textContent = formatARS(oficial.venta);
    }
    if (mep) {
      elements.dolarValues.mep.textContent = formatARS(mep.venta);
    }
    
    // Fecha de actualización
    if (blue?.fechaActualizacion) {
      const date = new Date(blue.fechaActualizacion);
      elements.dolarDate.textContent = `Actualizado: ${formatDate(date)}`;
    }
    
    // Recalcular con la tasa cargada
    updateCalculations();
    
  } catch (error) {
    console.error('Error cargando cotización del dólar:', error);
    // Fallback
    calculatorState.dolarRate = 1000;
    elements.dolarValues.blue.textContent = '$1.000';
    elements.dolarDate.textContent = 'Usando tasa estimada';
    updateCalculations();
  }
}

// ============================================
// UTILIDADES
// ============================================

function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatARS(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(date) {
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateRateLevelsHighlight() {
  const levels = document.querySelectorAll('.rate-level');
  const currentRate = calculatorState.hourlyRate;
  
  levels.forEach(level => {
    const rate = parseInt(level.dataset.rate);
    if (rate === currentRate) {
      level.classList.add('active');
    } else {
      level.classList.remove('active');
    }
  });
}

// ============================================
// PRINT STYLES
// ============================================

// Agregar estilos de impresión dinámicamente
function addPrintStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      body {
        background: white !important;
        color: black !important;
      }
      
      .nav-header, .golden-sparkles, .results-actions, .hero {
        display: none !important;
      }
      
      .calculator-grid {
        display: block !important;
      }
      
      .calculator-controls {
        display: none !important;
      }
      
      .calculator-results {
        max-width: 100% !important;
      }
      
      .results-card {
        box-shadow: none !important;
        border: 1px solid #ccc !important;
        page-break-inside: avoid;
      }
      
      .footer {
        display: none !important;
      }
      
      .results-disclaimer {
        font-size: 10px !important;
        margin-top: 2rem !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  addPrintStyles();
});
