/* ============================================
   JAVASCRIPT - SITIO DE AUTOR
   Destellos dorados | Animaciones | Interacciones
   ============================================ */

// ============================================
// FONDO DINÁMICO SEGÚN HORA DEL DÍA
// ============================================

function setDynamicBackground() {
  const hour = new Date().getHours();
  // Usamos el módulo 23 para obtener un índice entre 0-22
  const imageIndex = (hour % 23) + 1;
  const bgImage = `url('../images/bg-hero-${imageIndex}.jpg')`;
  document.documentElement.style.setProperty('--bg-image', bgImage);
}

// ============================================
// DESTELLOS DORADOS EN EL FONDO
// ============================================

function createSparkles() {
  const sparklesContainer = document.querySelector('.golden-sparkles');
  if (!sparklesContainer) return;
  
  const numberOfSparkles = 50;
  
  for (let i = 0; i < numberOfSparkles; i++) {
    createSparkle(sparklesContainer);
  }
}

function createSparkle(container) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  
  // Posición aleatoria
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.top = Math.random() * 100 + '%';
  
  // Retraso aleatorio para la animación
  sparkle.style.animationDelay = Math.random() * 3 + 's';
  sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
  
  // Tamaño variable
  const size = Math.random() * 4 + 2;
  sparkle.style.width = size + 'px';
  sparkle.style.height = size + 'px';
  
  // Algunas chispas tienen animación diferente
  if (Math.random() > 0.7) {
    sparkle.classList.add('twinkle');
  }
  
  container.appendChild(sparkle);
  
  // Eliminar y recrear después de un tiempo para mantener el rendimiento
  setTimeout(() => {
    sparkle.remove();
    createSparkle(container);
  }, 8000);
}

// ============================================
// ANIMACIÓN DE TEXTO CON RETRASO
// ============================================

function animateTextElements() {
  const textElements = document.querySelectorAll('.text-animation');
  
  textElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    const words = text.split(' ');
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.animationDelay = (index * 0.1) + 's';
      element.appendChild(span);
    });
  });
}

// ============================================
// INTERSECCIÓN OBSERVER PARA ANIMACIONES AL SCROLL
// ============================================

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar elementos animables
  document.querySelectorAll('.content-card, .blog-post, .photo-frame').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Clase para cuando el elemento es visible
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});

// ============================================
// FORMULARIO DE AUTENTICACIÓN
// ============================================

function setupAuthForm() {
  const authForm = document.getElementById('auth-form');
  if (!authForm) return;
  
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulación de autenticación (en producción usar backend real)
    const isAuthenticated = await simulateAuth(email, password);
    
    if (isAuthenticated) {
      localStorage.setItem('authorAuthenticated', 'true');
      window.location.href = 'admin-panel.html';
    } else {
      showNotification('Credenciales incorrectas', 'error');
    }
  });
}

async function simulateAuth(email, password) {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Credenciales de ejemplo (en producción usar backend)
  const validEmail = 'autor@ejemplo.com';
  const validPassword = 'autor123';
  
  return email === validEmail && password === validPassword;
}

// ============================================
// PANEL DE ADMINISTRACIÓN
// ============================================

function setupAdminPanel() {
  const contentForm = document.getElementById('content-form');
  if (!contentForm) return;
  
  // Verificar autenticación
  if (!localStorage.getItem('authorAuthenticated')) {
    window.location.href = 'admin.html';
    return;
  }
  
  contentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const section = document.getElementById('post-section').value;
    const type = document.getElementById('post-type').value;
    
    // Simular guardado de contenido
    const postData = {
      id: Date.now(),
      title,
      content,
      section,
      type,
      date: new Date().toISOString()
    };
    
    // Guardar en localStorage (en producción usar backend)
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    existingPosts.unshift(postData);
    localStorage.setItem('blogPosts', JSON.stringify(existingPosts));
    
    showNotification('Contenido publicado exitosamente', 'success');
    contentForm.reset();
  });
  
  // Botón de cerrar sesión
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('authorAuthenticated');
      window.location.href = 'index.html';
    });
  }
}

// ============================================
// SISTEMA DE COMENTARIOS
// ============================================

function setupComments() {
  const commentForms = document.querySelectorAll('.comment-form');
  
  commentForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = form.querySelector('.commenter-name');
      const commentInput = form.querySelector('.commenter-comment');
      
      if (!nameInput || !commentInput) return;
      
      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();
      
      if (name && comment) {
        addComment(form.closest('.comments-section'), name, comment);
        nameInput.value = '';
        commentInput.value = '';
        showNotification('Comentario publicado', 'success');
      }
    });
  });
}

function addComment(commentsSection, name, comment) {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  commentDiv.innerHTML = `
    <div class="comment-author">${escapeHtml(name)}</div>
    <div class="comment-date">${dateStr}</div>
    <div class="comment-text">${escapeHtml(comment)}</div>
  `;
  
  // Insertar al principio de la lista de comentarios
  const commentsList = commentsSection.querySelector('.comments-list');
  if (commentsList) {
    commentsList.insertBefore(commentDiv, commentsList.firstChild);
  } else {
    commentsSection.insertBefore(commentDiv, commentsSection.firstChild);
  }
}

// ============================================
// NOTIFICACIONES
// ============================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.classList.add('notification', `notification-${type}`);
  notification.textContent = message;
  
  // Estilos inline para la notificación
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 2rem',
    background: type === 'success' ? '#2d5a27' : type === 'error' ? '#8b2727' : '#5B7C99',
    color: '#E8D5C4',
    borderRadius: '4px',
    zIndex: '1000',
    animation: 'slideIn 0.3s ease',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  });
  
  document.body.appendChild(notification);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Agregar animaciones de notificación
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyles);

// ============================================
// UTILIDADES
// ============================================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// CARGA DE CONTENIDO DINÁMICO (BLOG)
// ============================================

function loadBlogPosts() {
  const blogContainer = document.getElementById('blog-posts-container');
  if (!blogContainer) return;
  
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  
  if (posts.length === 0) {
    blogContainer.innerHTML = `
      <div class="text-center" style="color: var(--text-muted); padding: 3rem;">
        <p>No hay publicaciones aún. Sé el primero en comentar.</p>
      </div>
    `;
    return;
  }
  
  blogContainer.innerHTML = posts.map(post => `
    <article class="blog-post">
      <h2 class="blog-post-title">${escapeHtml(post.title)}</h2>
      <div class="blog-post-date">
        ${new Date(post.date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
        ${post.section ? ` • <span class="text-gold">${post.section}</span>` : ''}
      </div>
      <div class="blog-post-content">
        ${escapeHtml(post.content)}
      </div>
    </article>
  `).join('');
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Establecer fondo dinámico según hora del día
  setDynamicBackground();

  // Crear destellos dorados
  createSparkles();

  // Animar elementos de texto
  animateTextElements();

  // Configurar animaciones al scroll
  setupScrollAnimations();

  // Configurar formulario de autenticación
  setupAuthForm();

  // Configurar panel de administración
  setupAdminPanel();

  // Configurar comentarios
  setupComments();

  // Cargar posts del blog
  loadBlogPosts();

  // Marcar link activo en navegación
  setActiveNavLink();

  console.log('✨ Sitio de autor inicializado');
});
