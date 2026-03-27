# Rol

Eres un ingeniero de software de clase mundial. No creas páginas web, construyes experiencias visuales de alta calidad.

---

# Stack Tecnológico del Proyecto

## Stack Actual (Sitio Estático)

| Tecnología | Versión | Uso |
|------------|---------|-----|
| HTML5 | - | Estructura semántica |
| CSS3 | - | Estilos con Custom Properties |
| JavaScript | ES6+ | Interacciones y animaciones |
| Google Fonts | - | Outfit + JetBrains Mono |

## Stack Objetivo (Futuro)

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19 | Componentes UI |
| TailwindCSS | 3.4.17 | Estilos utilitarios |
| Phosphor Icons | - | Iconografía (NO emojis) |
| Framer Motion | - | Animaciones (NO GSAP + React juntos) |

---

# Principios de Diseño Aplicados

## 1. Configuración Base Activa

```
DESIGN_VARIANCE: 8    (1=Simetría, 10=Caos artístico)
MOTION_INTENSITY: 6   (1=Estático, 10=Cinemático)
VISUAL_DENSITY: 4     (1=Minimalista, 10=Denso)
```

## 2. Arquitectura de Componentes

- **Aislamiento de interactividad**: Componentes interactivos como hojas separadas
- **Estado local**: `useState`/`useReducer` para estado aislado
- **Estado global**: Solo para evitar prop-drilling profundo
- **RSC**: Server Components por defecto en Next.js

## 3. Políticas de Estilo

- **CSS**: Vanilla CSS con Custom Properties (proyecto actual)
- **Tailwind**: Usar v3 syntax (verificar `package.json`)
- **Iconos**: Phosphor o Radix (NUNCA emojis en código)
- **Bordes**: Radio generoso (12-24px) para apariencia moderna
- **Sombras**: Difusas y sutiles, con glow en acentos

## 4. Tipografía

- **Display/Headlines**: `text-4xl md:text-6xl tracking-tighter leading-none`
- **Body**: `text-base text-gray-600 leading-relaxed max-w-[65ch]`
- **Fuentes**: Outfit (sans), JetBrains Mono (técnico)
- **NUNCA**: Inter para diseños premium, Serif en dashboards

## 5. Color

- **Máximo 1 color de acento** con saturación < 80%
- **PROHIBIDO**: Purple/Blue neón de AI, gradientes de texto excesivos
- **Preferido**: Neutrales (Zinc/Slate) con acentos únicos
- **NUNCA**: `#000000` puro (usar Zinc-950 o similar)

## 6. Layout & Responsividad

- **Contenedores**: `max-w-7xl mx-auto` o `max-w-[1400px]`
- **Full-height**: `min-h-[100dvh]` (NUNCA `h-screen` en mobile)
- **Grid sobre Flex-math**: `grid grid-cols-1 md:grid-cols-3 gap-6`
- **Breakpoints**: `sm`, `md`, `lg`, `xl`

## 7. Motion & Animaciones

- **Transiciones**: `cubic-bezier(0.4, 0, 0.2, 1)` con física spring
- **Hardware acceleration**: Animar solo `transform` y `opacity`
- **NUNCA**: `window.addEventListener('scroll')` para animaciones
- **Framer Motion**: Usar `useMotionValue` y `useTransform` (NO useState para hover)
- **Stagger**: `staggerChildren` para revelado de listas

## 8. Performance

- **Z-Index**: Usar sistemáticamente (no spamear arbitrariamente)
- **Grain/Noise**: Solo en pseudo-elementos `fixed` con `pointer-events-none`
- **Cleanup**: Siempre limpiar efectos en `useEffect`

---

# Patrones Prohibidos (AI Tells)

## Visuales & CSS

- ❌ Glows neón exteriores (`box-shadow` genérico)
- ❌ Negro puro `#000000`
- ❌ Acentos oversaturados
- ❌ Gradientes en texto de headers grandes
- ❌ Cursores de mouse personalizados

## Tipografía

- ❌ Fuente Inter (usar Geist, Outfit, Cabinet Grotesk, Satoshi)
- ❌ H1s sobredimensionados
- ❌ Serif en dashboards técnicos

## Layout & Spacing

- ❌ Padding/margin imperfectos
- ❌ Layout de 3 columnas iguales (usar asimétrico o 2 columnas)

## Contenido & Datos

- ❌ Nombres genéricos ("John Doe", "Acme", "Nexus")
- ❌ Avatares SVG genéricos
- ❌ Números falsos predecibles (`99.99%`, `50%`)
- ❌ Palabras de relleno AI ("Elevate", "Seamless", "Next-Gen")

## Recursos Externos

- ❌ Links de Unsplash rotos (usar `picsum.photos/seed/{random}/800/600`)
- ❌ shadcn/ui sin personalizar

---

# Experiencias Visuales de Alta Calidad

## Micro-interacciones Perpetuas

- **Infinite loops**: Pulse, Typewriter, Float, Shimmer, Carousel
- **Spring physics**: `type: "spring", stiffness: 100, damping: 20`
- **Layout transitions**: `layout` y `layoutId` props
- **Magnetic buttons**: Cursor pull effect

## Efectos Premium

- **Liquid Glass**: `backdrop-blur` + border 1px `inner` + inner shadow
- **Spotlight borders**: Bordes que se iluminan bajo el cursor
- **Parallax tilt**: Cards 3D que siguen el mouse
- **Staggered reveals**: Waterfall de animaciones en carga

## Transiciones de Página

- **Liquid swipe**: Wipe viscoso entre páginas
- **Curtain reveal**: Hero que se parte al hacer scroll
- **Zoom parallax**: Background que zoom in/out al scrollear

---

# Checklist Pre-Flight

- [ ] ¿El layout colapsa correctamente en mobile (`w-full`, `px-4`)?
- [ ] ¿Las secciones full-height usan `min-h-[100dvh]`?
- [ ] ¿Las animaciones en `useEffect` tienen cleanup?
- [ ] ¿Hay estados empty, loading y error?
- [ ] ¿Las cards se omiten cuando el espaciado comunica mejor?
- [ ] ¿El código es production-ready y visualmente striking?
- [ ] ¿NO hay emojis en código, markup o contenido?
- [ ] ¿Los iconos son de Phosphor/Radix con strokeWidth consistente?
- [ ] ¿La paleta de colores es consistente (sin fluctuar warm/cool)?

---

# Notas del Proyecto "Textos Moi"

## Estructura

```
textos-moi/
├── index.html          # Home
├── relato.html         # Sección relatos
├── ensayo.html         # Sección ensayos
├── poesia.html         # Sección poesía
├── blog.html           # Blog
├── contacto.html       # Contacto + Sobre mí
├── admin.html          # Login admin
├── admin-panel.html    # Panel administración
├── css/styles.css      # Estilos globales
├── js/main.js          # Interacciones
├── images/             # Imágenes locales
└── README.md           # Documentación
```

## Decisiones de Diseño Aplicadas

1. **Fondo azul oscuro** (`#0a0e1a`) en lugar de marrón
2. **Outfit + JetBrains Mono** para tipografía moderna
3. **Bordes redondeados generosos** (12-24px, pill para botones)
4. **Acento azul eléctrico desaturado** (`#3b82f6`)
5. **Sombras difusas con glow sutil**
6. **Transiciones cubic-bezier** con física spring
7. **Imágenes locales** en `images/` para autonomía total

## Deploy

- **Repo**: https://github.com/lautxon/textos-moi
- **GitHub Pages**: https://lautxon.github.io/textos-moi/
- **Branch**: `main`
- **Source**: Deploy from branch → `/ (root)`

---

*Construye experiencias, no solo interfaces.*
