/**
 * ONG SOCIEDAD Y MEDIO AMBIENTE (ENTORNO) — CHILE
 * JavaScript Vanilla para Navegación Camaleónica, Accesibilidad y Archivo Editorial
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. NAVEGACIÓN STICKY CAMALEÓNICA
  // --------------------------------------------------------------------------
  const cabecera = document.querySelector('.header-editorial');
  const seccionHero = document.querySelector('.seccion-hero');

  if (cabecera) {
    if (seccionHero) {
      // Estamos en index.html con Hero de video
      const manejarScrollHero = () => {
        const umbral = seccionHero.offsetHeight - 90;
        if (window.scrollY > 60) {
          cabecera.classList.remove('header-hero');
          cabecera.classList.add('header-scrolled');
        } else {
          cabecera.classList.add('header-hero');
          cabecera.classList.remove('header-scrolled');
        }
      };

      window.addEventListener('scroll', manejarScrollHero, { passive: true });
      manejarScrollHero(); // Evaluación inicial
    } else {
      // Páginas internas: siempre estilo pergamino claro con blend-mode
      cabecera.classList.add('header-scrolled');
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
    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && navLista.classList.contains('abierto')) {
        navLista.classList.remove('abierto');
        btnMenuMovil.setAttribute('aria-expanded', 'false');
        btnMenuMovil.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. CONTROL DE VIDEO HERO Y ACCESIBILIDAD (PREFERS-REDUCED-MOTION)
  // --------------------------------------------------------------------------
  const videoHero = document.querySelector('.hero-video');
  const btnVideoControl = document.getElementById('btn-video-toggle');

  if (videoHero && btnVideoControl) {
    const consultaMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

    const aplicarPreferenciaMovimiento = () => {
      if (consultaMovimiento.matches) {
        videoHero.pause();
        btnVideoControl.textContent = 'Reproducir fondo';
        btnVideoControl.setAttribute('aria-label', 'Reproducir video de fondo');
      } else {
        videoHero.play().catch(() => {
          // Autoplay prevenido por el navegador
        });
        btnVideoControl.textContent = 'Pausar fondo';
        btnVideoControl.setAttribute('aria-label', 'Pausar video de fondo');
      }
    };

    aplicarPreferenciaMovimiento();
    consultaMovimiento.addEventListener('change', aplicarPreferenciaMovimiento);

    btnVideoControl.addEventListener('click', () => {
      if (videoHero.paused) {
        videoHero.play();
        btnVideoControl.textContent = 'Pausar fondo';
        btnVideoControl.setAttribute('aria-label', 'Pausar video de fondo');
      } else {
        videoHero.pause();
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
    filtroBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        filtroBotones.forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');

        const categoria = boton.getAttribute('data-filtro');
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
    botonesLectura.forEach(boton => {
      boton.addEventListener('click', () => {
        const idDestino = boton.getAttribute('aria-controls');
        const panelContenido = document.getElementById(idDestino);

        if (panelContenido) {
          const expandido = boton.getAttribute('aria-expanded') === 'true';
          boton.setAttribute('aria-expanded', !expandido);

          if (!expandido) {
            panelContenido.classList.add('expandido');
            boton.innerHTML = '<span>−</span> Contraer ensayo';
          } else {
            panelContenido.classList.remove('expandido');
            boton.innerHTML = '<span>+</span> Leer ensayo completo';
          }
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. VISUALIZADOR MODAL DE FICHA TÉCNICA Y PDF (publicaciones.html)
  // --------------------------------------------------------------------------
  const capaModal = document.getElementById('modal-pdf-overlay');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');
  const botonesConsultaPdf = document.querySelectorAll('.enlace-documento-pdf');

  if (capaModal && btnCerrarModal) {
    const abrirModal = (datos) => {
      document.getElementById('modal-doc-codigo').textContent = datos.codigo || 'SERIE INVESTIGACIÓN';
      document.getElementById('modal-doc-titulo').textContent = datos.titulo || 'Documento Técnico';
      document.getElementById('modal-doc-ano').textContent = datos.ano || '2024';
      document.getElementById('modal-doc-area').textContent = datos.area || 'General';
      document.getElementById('modal-doc-paginas').textContent = datos.paginas || '48 páginas';
      document.getElementById('modal-doc-resumen').textContent = datos.resumen || '';

      capaModal.classList.add('activo');
      document.body.style.overflow = 'hidden';
      btnCerrarModal.focus();
    };

    const cerrarModal = () => {
      capaModal.classList.remove('activo');
      document.body.style.overflow = '';
    };

    botonesConsultaPdf.forEach(boton => {
      boton.addEventListener('click', (evento) => {
        evento.preventDefault();
        const ficha = boton.closest('.ficha-publicacion');
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

    capaModal.addEventListener('click', (evento) => {
      if (evento.target === capaModal) {
        cerrarModal();
      }
    });

    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && capaModal.classList.contains('activo')) {
        cerrarModal();
      }
    });
  }
});
