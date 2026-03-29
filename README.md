# Textos Moi | Sitio de Autor

Un sitio web literario minimalista diseñado para compartir relatos, ensayos y poesía.

## 📖 Descripción

**Textos Moi** es un espacio íntimo donde las palabras cobran vida a través de diferentes géneros literarios. El sitio ofrece una experiencia de lectura inmersiva con un diseño moderno en tonos azul oscuro, acentos eléctricos y tipografía sans-serif contemporánea.

## ✨ Características

- **Diseño responsive** - Adaptable a dispositivos móviles y desktop
- **Animaciones sutiles** - Destellos en el fondo y transiciones suaves con física spring
- **Tipografía moderna** - Outfit para titulares, JetBrains Mono para detalles
- **Bordes redondeados** - Radio generoso en botones, tarjetas y contenedores
- **Paleta oscura premium** - Fondo azul profundo con acentos desaturados
- **Fondo dinámico por hora del día** - 24 imágenes temáticas que cambian según el período del día:
  - 🌅 **Amanecer** (05:00-07:59): 3 imágenes
  - 🌞 **Mañana** (08:00-11:59): 3 imágenes
  - ☀️ **Mediodía** (12:00-14:59): 3 imágenes
  - 🌤️ **Siesta** (15:00-17:59): 3 imágenes
  - 🌇 **Tarde** (18:00-20:59): 3 imágenes
  - 🌆 **Anochecer** (21:00-22:59): 3 imágenes
  - 🌙 **Noche** (23:00-04:59): 6 imágenes
- **Hero "Spotlight Inverso"** - Overlay oscuro en el centro (texto legible) que se aclara hacia los bordes (imagen visible)
- **Glassmorphism card** - Efecto sutil detrás del texto del hero
- **Secciones literarias**:
  - 📖 **Relato** - Narrativas que exploran la condición humana
  - 📝 **Ensayo** - Reflexiones sobre literatura, arte y cultura
  - ✨ **Poesía** - Versos que capturan instantes y emociones
  - 📰 **Blog** - Publicaciones periódicas y reflexiones
  - 💌 **Contacto** - Formulario de contacto y redes sociales
- **Panel de administración** - Sistema de autenticación para publicar contenido
- **Sistema de comentarios** - Los visitantes pueden comentar en las publicaciones
- **🆕 Calculadora de costos** - Presupuesto dinámico con cotización del dólar en tiempo real (dolarapi.com)

## 🎨 Paleta de Colores

| Variable | Color | Uso |
|----------|-------|-----|
| `--bg-primary` | #0a0e1a | Fondo principal |
| `--bg-secondary` | #0f1425 | Fondo secundario |
| `--bg-tertiary` | #1a1f35 | Tarjetas y elementos |
| `--accent-primary` | #3b82f6 | Botones y acentos |
| `--text-primary` | #f1f5f9 | Texto principal |
| `--text-secondary` | #94a3b8 | Texto secundario |
| `--text-tertiary` | #64748b | Texto terciario |

## 🎯 Principios de Diseño

- **Tipografía**: Outfit (sans-serif moderna) + JetBrains Mono (detalles técnicos)
- **Bordes**: Radio generoso (12-24px) para una apariencia suave y contemporánea
- **Sombras**: Difusas y sutiles con glow en acentos
- **Motion**: Transiciones cubic-bezier con física spring
- **Espaciado**: Generoso para crear jerarquía visual
- **Spotlight Inverso**: Overlay radial (70% oscuro en centro → 15% en bordes)

## 📁 Estructura del Proyecto

```
textos moi/
├── index.html          # Página principal
├── relato.html         # Sección de relatos
├── ensayo.html         # Sección de ensayos
├── poesia.html         # Sección de poesía
├── blog.html           # Blog con publicaciones
├── contacto.html       # Página de contacto
├── calculadora.html    # Calculadora de costos (NEW)
├── admin.html          # Login de administrador
├── admin-panel.html    # Panel de administración
├── css/
│   └── styles.css      # Hoja de estilos principal
├── js/
│   ├── main.js         # JavaScript para animaciones e interacciones
│   └── calculator.js   # Calculadora + API dólar (NEW)
└── images/
    ├── amanecer-*.jpg  # 3 imágenes (05:00-07:59)
    ├── manana-*.jpg    # 3 imágenes (08:00-11:59)
    ├── mediodia-*.jpg  # 3 imágenes (12:00-14:59)
    ├── siesta-*.jpg    # 3 imágenes (15:00-17:59)
    ├── tarde-*.jpg     # 3 imágenes (18:00-20:59)
    ├── anochecer-*.jpg # 3 imágenes (21:00-22:59)
    ├── noche-*.jpg     # 6 imágenes (23:00-04:59)
    ├── relato-*.jpg    # Imágenes para sección de relatos
    ├── ensayo-*.jpg    # Imágenes para sección de ensayos
    └── poesia-*.jpg    # Imágenes para sección de poesía
```

## 🚀 Uso

1. **Explorar contenido**: Navega por las diferentes secciones literarias
2. **Leer el blog**: Consulta las últimas publicaciones
3. **Contactar**: Usa el formulario para enviar mensajes
4. **Calcular presupuesto**: Visitá `calculadora.html` para un presupuesto estimado
5. **Administrar** (solo autor):
   - Accede a `admin.html`
   - Credenciales por defecto:
     - Email: `autor@ejemplo.com`
     - Password: `autor123`

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables CSS, animaciones, glassmorphism
- **JavaScript (Vanilla)** - Interacciones, animaciones, lógica de tiempo
- **LocalStorage** - Almacenamiento de posts y autenticación
- **dolarapi.com** - API para cotización del dólar en tiempo real

## 🎯 Funcionalidades JavaScript

- `setDynamicBackground()` - Selecciona imagen según hora del día (7 períodos)
- `createSparkles()` - Genera destellos dorados animados en el fondo
- `setupScrollAnimations()` - Animaciones de elementos al hacer scroll
- `setupAuthForm()` - Manejo del formulario de autenticación
- `setupAdminPanel()` - Panel para publicar nuevo contenido
- `setupComments()` - Sistema de comentarios para posts
- `loadBlogPosts()` - Carga dinámica de publicaciones desde localStorage
- `initCalculator()` - Calculadora de costos con conversión USD/ARS

## 💰 Calculadora de Costos

La calculadora incluye:
- Slider de tarifa por hora ($25-150 USD/h)
- Slider de horas estimadas (10-200h)
- Selector de tipo de dólar (Blue / Oficial / MEP)
- Checklist de features (+10-25% cada uno)
- Toggle de rush delivery (+30-50%)
- Total en USD y ARS (conversión en tiempo real)
- Botón de impresión para exportar cotización

## 📝 Notas

- El sistema de autenticación y almacenamiento usa **LocalStorage** para fines demostrativos
- En producción, se recomienda implementar un backend real para:
  - Autenticación segura
  - Persistencia de datos
  - Gestión de comentarios
  - Subida de imágenes
- Las imágenes de fondo son de **Unsplash** (uso comercial libre de atribución)

## 📄 Licencia

© 2026 Textos Moi. Todos los derechos reservados.

---

*Un espacio donde las palabras encuentran su hogar.*
