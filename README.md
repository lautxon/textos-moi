# Textos Moi | Sitio de Autor

Un sitio web literario minimalista diseñado para compartir relatos, ensayos y poesía.

## 📖 Descripción

**Textos Moi** es un espacio íntimo donde las palabras cobran vida a través de diferentes géneros literarios. El sitio ofrece una experiencia de lectura inmersiva con un diseño elegante en tonos marrón oscuro, azul mate y detalles dorados.

## ✨ Características

- **Diseño responsive** - Adaptable a dispositivos móviles y desktop
- **Animaciones sutiles** - Destellos dorados en el fondo y transiciones suaves
- **Secciones literarias**:
  - 📖 **Relato** - Narrativas que exploran la condición humana
  - 📝 **Ensayo** - Reflexiones sobre literatura, arte y cultura
  - ✨ **Poesía** - Versos que capturan instantes y emociones
  - 📰 **Blog** - Publicaciones periódicas y reflexiones
  - 💌 **Contacto** - Formulario de contacto y redes sociales
- **Panel de administración** - Sistema de autenticación para publicar contenido
- **Sistema de comentarios** - Los visitantes pueden comentar en las publicaciones
- **Modo oscuro elegante** - Paleta de colores cuidadosamente seleccionada

## 🎨 Paleta de Colores

| Variable | Color | Uso |
|----------|-------|-----|
| `--bg-dark` | #2C1810 | Fondo principal |
| `--bg-darker` | #1A0F0A | Fondo secundario |
| `--bg-light` | #3D2318 | Tarjetas y elementos |
| `--blue-matte` | #5B7C99 | Botones y acentos |
| `--gold` | #D4AF37 | Títulos y detalles |
| `--text-primary` | #E8D5C4 | Texto principal |
| `--text-secondary` | #B8A090 | Texto secundario |

## 📁 Estructura del Proyecto

```
textos moi/
├── index.html          # Página principal
├── relato.html         # Sección de relatos
├── ensayo.html         # Sección de ensayos
├── poesia.html         # Sección de poesía
├── blog.html           # Blog con publicaciones
├── contacto.html       # Página de contacto
├── admin.html          # Login de administrador
├── admin-panel.html    # Panel de administración
├── css/
│   └── styles.css      # Hoja de estilos principal
├── js/
│   └── main.js         # JavaScript para animaciones e interacciones
└── images/             # Imágenes locales
    ├── relato-*.jpg    # Imágenes para sección de relatos
    ├── ensayo-*.jpg    # Imágenes para sección de ensayos
    └── poesia-*.jpg    # Imágenes para sección de poesía
```

## 🚀 Uso

1. **Explorar contenido**: Navega por las diferentes secciones literarias
2. **Leer el blog**: Consulta las últimas publicaciones
3. **Contactar**: Usa el formulario para enviar mensajes
4. **Administrar** (solo autor):
   - Accede a `admin.html`
   - Credenciales por defecto:
     - Email: `autor@ejemplo.com`
     - Password: `autor123`

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables CSS y animaciones
- **JavaScript (Vanilla)** - Interacciones y animaciones
- **LocalStorage** - Almacenamiento de posts y autenticación

## 🎯 Funcionalidades JavaScript

- `createSparkles()` - Genera destellos dorados animados en el fondo
- `setupScrollAnimations()` - Animaciones de elementos al hacer scroll
- `setupAuthForm()` - Manejo del formulario de autenticación
- `setupAdminPanel()` - Panel para publicar nuevo contenido
- `setupComments()` - Sistema de comentarios para posts
- `loadBlogPosts()` - Carga dinámica de publicaciones desde localStorage

## 📝 Notas

- El sistema de autenticación y almacenamiento usa **LocalStorage** para fines demostrativos
- En producción, se recomienda implementar un backend real para:
  - Autenticación segura
  - Persistencia de datos
  - Gestión de comentarios
  - Subida de imágenes

## 📄 Licencia

© 2026 Textos Moi. Todos los derechos reservados.

---

*Un espacio donde las palabras encuentran su hogar.*
