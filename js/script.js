/**
 * ONG SOCIEDAD Y MEDIO AMBIENTE (ENTORNO) — CHILE
 * JavaScript Vanilla para Navegación Camaleónica, Accesibilidad y Archivo Editorial
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. NAVEGACIÓN STICKY CAMALEÓNICA
  // --------------------------------------------------------------------------
  const header = document.querySelector('.header-editorial');
  const heroSection = document.querySelector('.seccion-hero');

  if (header) {
    if (heroSection) {
      // Estamos en index.html con Hero de video
      const manejarScrollHero = () => {
        const umbral = heroSection.offsetHeight - 90;
        if (window.scrollY > 60) {
          header.classList.remove('header-hero');
          header.classList.add('header-scrolled');
        } else {
          header.classList.add('header-hero');
          header.classList.remove('header-scrolled');
        }
      };

      window.addEventListener('scroll', manejarScrollHero, { passive: true });
      manejarScrollHero(); // Evaluación inicial
    } else {
      // Páginas internas: siempre estilo pergamino claro con blend-mode
      header.classList.add('header-scrolled');
    }
  }

  // --------------------------------------------------------------------------
  // 2. MENÚ MÓVIL ACCESIBLE
  // --------------------------------------------------------------------------
  const btnMenuMovil = document.querySelector('.btn-menu-movil');
  const navLista = document.querySelector('.nav-lista');

  if (btnMenuMovil && navLista) {
    btnMenuMovil.addEventListener('click', () => {
      const estaAbierto = navLista.classList.toggle('abierto');
      btnMenuMovil.setAttribute('aria-expanded', estaAbierto);
    });

    // Cerrar al hacer clic en un enlace de navegación
    navLista.querySelectorAll('.nav-enlace').forEach(enlace => {
      enlace.addEventListener('click', () => {
        navLista.classList.remove('abierto');
        btnMenuMovil.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar con la tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLista.classList.contains('abierto')) {
        navLista.classList.remove('abierto');
        btnMenuMovil.setAttribute('aria-expanded', 'false');
        btnMenuMovil.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. CONTROL DE VIDEO HERO Y ACCESIBILIDAD (PREFERS-REDUCED-MOTION)
  // --------------------------------------------------------------------------
  const heroVideo = document.querySelector('.hero-video');
  const btnVideoControl = document.getElementById('btn-video-toggle');

  if (heroVideo && btnVideoControl) {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const aplicarPreferenciaMovimiento = () => {
      if (motionQuery.matches) {
        heroVideo.pause();
        btnVideoControl.textContent = 'Reproducir fondo';
        btnVideoControl.setAttribute('aria-label', 'Reproducir video de fondo');
      } else {
        heroVideo.play().catch(() => {
          // Autoplay prevenido por el navegador
        });
        btnVideoControl.textContent = 'Pausar fondo';
        btnVideoControl.setAttribute('aria-label', 'Pausar video de fondo');
      }
    };

    aplicarPreferenciaMovimiento();
    motionQuery.addEventListener('change', aplicarPreferenciaMovimiento);

    btnVideoControl.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        btnVideoControl.textContent = 'Pausar fondo';
        btnVideoControl.setAttribute('aria-label', 'Pausar video de fondo');
      } else {
        heroVideo.pause();
        btnVideoControl.textContent = 'Reproducir fondo';
        btnVideoControl.setAttribute('aria-label', 'Reproducir video de fondo');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. FILTRADO DE PUBLICACIONES (publicaciones.html)
  // --------------------------------------------------------------------------
  const filtroBotones = document.querySelectorAll('.filtro-btn');
  const publicaciones = document.querySelectorAll('.ficha-publicacion');
  const contadorPub = document.getElementById('contador-publicaciones-texto');

  if (filtroBotones.length > 0 && publicaciones.length > 0) {
    filtroBotones.forEach(btn => {
      btn.addEventListener('click', () => {
        filtroBotones.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');

        const categoria = btn.getAttribute('data-filtro');
        let visibles = 0;

        publicaciones.forEach(pub => {
          const areaPub = pub.getAttribute('data-area');
          if (categoria === 'todas' || areaPub === categoria) {
            pub.style.display = 'block';
            visibles++;
          } else {
            pub.style.display = 'none';
          }
        });

        if (contadorPub) {
          contadorPub.textContent = `Mostrando ${visibles} de ${publicaciones.length} documentos`;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. LECTURA EXPANDIBLE DE ARTÍCULOS (articulos.html)
  // --------------------------------------------------------------------------
  const botonesLectura = document.querySelectorAll('.btn-toggle-lectura');

  if (botonesLectura.length > 0) {
    botonesLectura.forEach(btn => {
      btn.addEventListener('click', () => {
        const idDestino = btn.getAttribute('aria-controls');
        const panelContenido = document.getElementById(idDestino);

        if (panelContenido) {
          const expandido = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', !expandido);

          if (!expandido) {
            panelContenido.classList.add('expandido');
            btn.innerHTML = '<span>−</span> Contraer ensayo';
          } else {
            panelContenido.classList.remove('expandido');
            btn.innerHTML = '<span>+</span> Leer ensayo completo';
          }
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. VISUALIZADOR MODAL DE FICHA TÉCNICA Y PDF (publicaciones.html)
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('modal-pdf-overlay');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');
  const botonesConsultaPdf = document.querySelectorAll('.enlace-documento-pdf');

  if (modalOverlay && btnCerrarModal) {
    const abrirModal = (datos) => {
      document.getElementById('modal-doc-codigo').textContent = datos.codigo || 'SERIE INVESTIGACIÓN';
      document.getElementById('modal-doc-titulo').textContent = datos.titulo || 'Documento Técnico';
      document.getElementById('modal-doc-ano').textContent = datos.ano || '2024';
      document.getElementById('modal-doc-area').textContent = datos.area || 'General';
      document.getElementById('modal-doc-paginas').textContent = datos.paginas || '48 páginas';
      document.getElementById('modal-doc-resumen').textContent = datos.resumen || '';

      modalOverlay.classList.add('activo');
      document.body.style.overflow = 'hidden';
      btnCerrarModal.focus();
    };

    const cerrarModal = () => {
      modalOverlay.classList.remove('activo');
      document.body.style.overflow = '';
    };

    botonesConsultaPdf.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const ficha = btn.closest('.ficha-publicacion');
        if (ficha) {
          const datos = {
            codigo: ficha.querySelector('.meta-codigo')?.textContent.trim(),
            titulo: ficha.querySelector('.titulo-publicacion')?.textContent.trim(),
            ano: ficha.querySelector('.meta-ano')?.textContent.trim(),
            area: ficha.querySelector('.meta-area')?.textContent.trim(),
            paginas: ficha.getAttribute('data-paginas') || '36 páginas',
            resumen: ficha.querySelector('.resumen-publicacion')?.textContent.trim()
          };
          abrirModal(datos);
        }
      });
    });

    btnCerrarModal.addEventListener('click', cerrarModal);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        cerrarModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('activo')) {
        cerrarModal();
      }
    });
  }
});
