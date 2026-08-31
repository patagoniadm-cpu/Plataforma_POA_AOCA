/* ============================================
   Plataforma POA · AOCA — Comportamiento compartido
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {

  // 1) Aparición suave al entrar a la página
  document.body.classList.add('page-enter');
  requestAnimationFrame(function () {
    document.body.classList.remove('page-enter');
  });

  // 2) Fundido de salida al navegar a otra página del sitio
  document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (this.target === '_blank' || /^https?:\/\//.test(href)) return;
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(function () { window.location.href = href; }, 200);
    });
  });

  // 3) Efecto de onda al tocar cualquier botón
  document.querySelectorAll('.btn, button, .card').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);
    });
  });

  // 4) Resalta sola la pestaña del menú que corresponde a la página actual
  const actual = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.app-nav a').forEach(function (a) {
    if (a.getAttribute('href') === actual) a.classList.add('active');
  });
});
