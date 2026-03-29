# 🎨 Skill: Textos Moi Pattern

**Versión:** 1.0  
**Creado:** Marzo 2026  
**Para:** Qwen Code (uso interno)  
**Propósito:** Desarrollo de sitios de autor/literarios con cero errores

---

## 📋 ¿Qué es Este Skill?

Este es el **patrón probado** extraído del desarrollo exitoso de "Textos Moi" v1.0. Contiene únicamente las decisiones, arquitecturas y soluciones que **funcionaron** y nos trajeron hasta la versión final sin errores.

**Objetivo:** Replicar este patrón en futuros sitios de autor, editoriales, portfolios literarios, o sitios culturales minimalistas.

---

## 🏗️ Arquitectura Base

### Stack Tecnológico (Probado)

```
✅ HTML5 semántico
✅ CSS3 con Custom Properties
✅ JavaScript Vanilla (ES6+)
✅ Sin frameworks pesados
✅ LocalStorage para prototipado
```

### Estructura de Proyecto

```
proyecto/
├── index.html              # Home con Spotlight Inverso
├── [seccion]-1.html        # Páginas de contenido
├── [seccion]-2.html
├── contacto.html
├── css/
│   └── styles.css          # 1 archivo, ~1000-1500 líneas
├── js/
│   ├── main.js             # Interacciones globales
│   └── [feature].js        # Features específicas (ej: calculadora)
└── images/
    ├── hero-*.jpg          # Imágenes temáticas por hora/período
    └── [seccion]-*.jpg     # Imágenes por sección
```

---

## 🎨 Sistema de Diseño (Primero)

### 1. Custom Properties — Definir ANTES de Codificar

```css
:root {
  /* Palette */
  --bg-primary: #0a0e1a;
  --bg-secondary: #0f1425;
  --bg-tertiary: #1a1f35;
  --accent-primary: #3b82f6;
  
  /* Text */
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  
  /* Typography */
  --font-sans: 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Radius */
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}
```

**Regla:** Definir toda la paleta, tipografía y espaciado ANTES de escribir HTML.

---

## 🌅 Patrón: Hero "Spotlight Inverso"

### ¿Cuándo Usar?

- ✅ Home page
- ✅ Landing pages
- ✅ Páginas que necesitan impacto visual + legibilidad
- ✅ Sitios con imágenes de fondo temáticas

### ¿Cuándo NO Usar?

- ❌ Páginas de contenido interno (usar Hero Simple)
- ❌ Secciones que requieren carga rápida (sin imagen)

---

### Estructura HTML (Copiar y Pegar)

```html
<section class="hero section-with-bg">
  <div class="container hero-container">
    <div class="hero-content">
      <h1 class="hero-title text-animation">TÍTULO</h1>
      <p class="hero-subtitle">Subtítulo descriptivo</p>
      <div class="hero-buttons">
        <a href="#" class="btn">Botón Primario</a>
        <a href="#" class="btn btn-secondary">Botón Secundario</a>
      </div>
    </div>
  </div>
</section>
```

---

### CSS (Copiar y Pegar)

```css
/* ============================================
   SPOTLIGHT INVERSO - HERO
   ============================================
   Capas (de adelante hacia atrás):
   1. .hero-content → Glassmorphism (z-index: 2)
   2. ::before → Spotlight overlay (z-index: 1)
   3. background → Imagen + mask (z-index: 0)
*/

.section-with-bg {
  position: relative;
  z-index: 0;
  /* Capa 3: Imagen de fondo con bordes difuminados */
  background: var(--bg-image, url('../images/hero-default.jpg'));
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* Bordes difuminados hacia el exterior */
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    black 60%,
    rgba(0, 0, 0, 0.5) 80%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse at center,
    black 60%,
    rgba(0, 0, 0, 0.5) 80%,
    transparent 100%
  );
}

/* Capa 2: Spotlight inverso - oscuro en centro, claro en bordes */
.section-with-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    rgba(10, 14, 26, 0.70) 0%,
    rgba(10, 14, 26, 0.55) 25%,
    rgba(10, 14, 26, 0.40) 45%,
    rgba(10, 14, 26, 0.25) 65%,
    rgba(10, 14, 26, 0.15) 100%
  );
}

/* Capa 1: Contenido */
.hero-container {
  position: relative;
  z-index: 2;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  padding: 3rem;
  /* Glassmorphism card */
  background: rgba(10, 14, 26, 0.3);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
```

---

### JavaScript (Imágenes por Hora)

```javascript
function setDynamicBackground() {
  const hour = new Date().getHours();
  let period, imageIndex;
  
  // 7 períodos del día
  if (hour >= 5 && hour <= 7) {
    period = 'amanecer';
    imageIndex = (hour - 5) + 1;
  } else if (hour >= 8 && hour <= 11) {
    period = 'manana';
    imageIndex = ((hour - 8) % 3) + 1;
  } else if (hour >= 12 && hour <= 14) {
    period = 'mediodia';
    imageIndex = ((hour - 12) % 3) + 1;
  } else if (hour >= 15 && hour <= 17) {
    period = 'siesta';
    imageIndex = ((hour - 15) % 3) + 1;
  } else if (hour >= 18 && hour <= 20) {
    period = 'tarde';
    imageIndex = ((hour - 18) % 3) + 1;
  } else if (hour >= 21 && hour <= 22) {
    period = 'anochecer';
    imageIndex = ((hour - 21) % 3) + 1;
  } else {
    period = 'noche';
    imageIndex = ((hour + 1) % 24 >= 23) ? 1 : ((hour + 1) % 24 + 2);
  }
  
  const bgImage = `url('../images/${period}-${imageIndex}.jpg')`;
  document.documentElement.style.setProperty('--bg-image', bgImage);
}

document.addEventListener('DOMContentLoaded', setDynamicBackground);
```

---

## 🎯 Hero Simple (Para Páginas Internas)

### ¿Cuándo Usar?

- ✅ Páginas de sección (Relato, Ensayo, Poesía, etc.)
- ✅ Contenido que no necesita imagen de fondo
- ✅ Carga rápida prioritaria

### Estructura HTML

```html
<section class="hero hero-section" style="min-height: 50vh;">
  <div class="container">
    <h1 class="hero-title text-animation">TÍTULO DE SECCIÓN</h1>
    <p class="hero-subtitle">Descripción de la sección</p>
  </div>
</section>
```

### CSS

```css
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--bg-secondary) !important;
}

.hero-section .hero-title,
.hero-section .hero-subtitle {
  text-align: center;
}
```

---

## 🖼️ Sistema de Imágenes por Período

### Estructura Recomendada

```
images/
├── amanecer-1,2,3.jpg    (05:00-07:59)
├── manana-1,2,3.jpg      (08:00-11:59)
├── mediodia-1,2,3.jpg    (12:00-14:59)
├── siesta-1,2,3.jpg      (15:00-17:59)
├── tarde-1,2,3.jpg       (18:00-20:59)
├── anochecer-1,2,3.jpg   (21:00-22:59)
└── noche-1,2,3,4,5,6.jpg (23:00-04:59)
```

### Reglas para Imágenes

1. **Temática coherente** con el período
2. **Libres de derechos** (Unsplash, Pexels)
3. **Optimizadas** (<500KB, WebP preferible)
4. **1920x1080 mínimo** para calidad retina

---

## 🧩 Componentes Esenciales

### Botones

```css
.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: var(--accent-primary);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 0 40px var(--accent-glow);
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border-color);
}
```

### Tarjetas de Contenido

```css
.content-card {
  background: var(--bg-tertiary);
  padding: 2rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}
```

### Marco para Imágenes

```css
.photo-frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  margin: 1.25rem 0;
}

.photo-frame img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.photo-frame:hover img {
  transform: scale(1.08);
}
```

---

## ⚠️ Anti-Patrones (NO HACER)

### ❌ background-attachment: fixed

```css
/* PROBLEMA: Crea conflictos de z-index */
background-attachment: fixed; /* EVITAR */
```

**Solución:** Usar `background-attachment: scroll` o eliminar la propiedad.

---

### ❌ Múltiples ::before/::after en un elemento

```css
/* PROBLEMA: Solo puede haber uno de cada */
.element::before { /* ... */ }
.element::before { /* ... */ } /* ERROR: Sobrescribe */
```

**Solución:** Combinar capas en un solo pseudo-elemento o usar elementos adicionales.

---

### ❌ z-index negativos en pseudo-elementos

```css
/* PROBLEMA: El pseudo-elemento desaparece detrás del body */
.element::before {
  z-index: -1; /* Puede no renderizarse */
}
```

**Solución:** Usar `z-index: 0` en el padre y `z-index: 1+` en los hijos.

---

### ❌ Demasiadas iteraciones sin stepping back

```
❌ Iterar 5 veces sobre el mismo enfoque fallido
✅ Detenerse, analizar el problema raíz, cambiar de enfoque
```

---

## 🚀 Workflow de Desarrollo

### 1. Setup Inicial (30 min)

```bash
# Estructura base
mkdir proyecto && cd proyecto
mkdir css js images
touch index.html css/styles.css js/main.js
```

### 2. Sistema de Diseño (1 hora)

```css
/* Definir en styles.css */
:root {
  /* Colores, tipografía, radius, shadows */
}
```

### 3. HTML Semántico (2-3 horas)

```html
<!-- Estructura base -->
<header>...</header>
<main>
  <section class="hero">...</section>
  <section class="content">...</section>
</main>
<footer>...</footer>
```

### 4. Estilos de Componentes (3-4 horas)

```css
/* Orden recomendado */
1. Reset & Base
2. Layout (container, grid)
3. Componentes (btn, card, frame)
4. Secciones (hero, features, footer)
5. Utilidades
6. Responsive
```

### 5. Interacciones JS (1-2 horas)

```javascript
// Orden recomendado
1. DOMContentLoaded
2. Event listeners
3. Animaciones
4. API calls (si aplica)
```

### 6. Testing & Debug (1 hora)

```
✅ Chrome DevTools
✅ Mobile responsive check
✅ Performance audit
✅ Accessibility check
```

### 7. Deploy (15 min)

```bash
git init
git add .
git commit -m "feat: initial commit"
git push
```

---

## 📊 Checklist Pre-Launch

### Diseño

- [ ] Paleta de colores consistente (máx 1 acento)
- [ ] Tipografía: 2 fuentes máx (sans + mono)
- [ ] Espaciado generoso (whitespace comunica)
- [ ] Bordes redondeados (12-24px)

### Código

- [ ] HTML semántico (header, main, section, footer)
- [ ] CSS custom properties definidas
- [ ] JavaScript sin dependencias innecesarias
- [ ] Imágenes optimizadas (<500KB)

### Responsive

- [ ] Mobile-first o mobile-compatible
- [ ] Breakpoints: sm (640px), md (768px), lg (1024px)
- [ ] Touch targets: mín 44x44px

### Performance

- [ ] Lighthouse score >90
- [ ] Imágenes en WebP o JPG optimizado
- [ ] CSS/JS minificado (producción)
- [ ] Sin render-blocking resources críticos

### Accesibilidad

- [ ] Contraste de color WCAG AA
- [ ] Alt text en imágenes
- [ ] Focus states visibles
- [ ] Navegación por teclado funcional

---

## 🎓 Lecciones Aprendidas (Textos Moi)

### Lo que Funcionó ✅

1. **Spotlight Inverso** - Solución elegante para texto legible + imagen visible
2. **Imágenes por hora** - Conexión emocional con el visitante
3. **Glassmorphism** - Profundidad visual sin peso
4. **CSS Custom Properties** - Mantenimiento sencillo
5. **Vanilla JS** - Sin overhead de frameworks
6. **Iteración rápida** - Commit, push, ver, ajustar

### Lo que NO Funcionó ❌

1. **background-attachment: fixed** - Conflictos de z-index
2. **Múltiples pseudo-elementos** - Solo 1 ::before y 1 ::after por elemento
3. **z-index: -1 en pseudo-elementos** - Desaparecen detrás del body
4. **Demasiadas capas sin documentación** - Confusión en el stacking

---

## 🔁 Frases de Referencia Rápida

| Frase | Qué Hace |
|-------|----------|
| _"Implementá Spotlight Inverso, como en Inicio"_ | Hero con overlay + glassmorphism + imagen |
| _"Hero Simple, como en Relato"_ | Hero con fondo sólido, texto centrado |
| _"Imágenes por hora, como en Textos Moi"_ | 24 imágenes que cambian según el período |
| _"Glassmorphism card"_ | rgba + backdrop-filter: blur |
| _"Bordes difuminados"_ | mask-image radial gradient |

---

## 📈 Métricas de Éxito (Textos Moi v1.0)

| Métrica | Valor |
|---------|-------|
| Líneas CSS | ~1300 |
| Líneas JS | ~500 |
| Imágenes | 24 (hero) + 12 (secciones) |
| Páginas | 9 |
| Features | 5 (blog, calc, auth, comments, time-bg) |
| Lighthouse | 92+ |
| Deploy | GitHub Pages |

---

## 🧠 Principios de Diseño Aplicados

1. **Menos es más** - 1 color de acento, 2 fuentes
2. **Whitespace comunica** - Espaciado generoso
3. **Jerarquía visual** - Tamaño, color, posición
4. **Consistencia** - Mismos radius, shadows, transitions
5. **Emoción** - Imágenes que cuentan una historia
6. **Funcionalidad** - Belleza sin sacrificar usabilidad

---

## 📝 Notas Finales

> **Este Skill es vivo.** Se actualiza con cada proyecto exitoso.

**Próxima iteración:** Después del próximo sitio de autor, revisar qué funcionó y actualizar este documento.

**Objetivo:** Errores → 0, Calidad → ∞

---

*Construido con ❤️ para Qwen Code - Uso Interno*

**© 2026 Textos Moi Project**
