# ONG Sociedad y Medio Ambiente (Entorno) — Sitio Web Institucional

Plataforma estática de estética editorial e institucional para la **ONG de Desarrollo, Sociedad y Medio Ambiente (Entorno)** de Chile (Personalidad Jurídica otorgada por Decreto Supremo N° 1120, 29 de noviembre de 2000).

Diseñado bajo la concepción de un *think tank* y espacio de consulta técnica independiente, combinando rigor tipográfico, narrativa socioambiental no autorreferente y ausencia total de llamadas comerciales a la acción (CERO CTAs).

---

## 🏛️ Principios Rectores

- **Autoridad silenciosa:** Sin botones de donación, afiliación, captura ni formularios intrusivos. La web opera como un espacio editorial de consulta y archivo documental.
- **Narrativa no autorreferente:** El foco reside en el desarrollo humano integral, el territorio chileno, la dignidad del trabajo y el diálogo democrático.
- **Sobriedad visual:** Sin clichés ecológicos (hojas, planetas, iconos de reciclaje). El peso visual recae en la apertura audiovisual, la retícula tipográfica y las líneas divisorias de 1px.

---

## 🎨 Sistema Visual y Paleta Cromática

- **Fondo Papel (`--bg-papel`):** `#F6EFE0`
- **Beige Institucional (`--bg-beige`):** `#ECDEBB`
- **Tinta Oscura (`--tinta-oscura`):** `#2C221A`
- **Café Estructural (`--cafe-estructura`):** `#9E8066`
- **Naranja Acento (`--naranja-acento`):** `#F29400`
- **Velo Hero (`--velo-hero`):** `rgba(28, 22, 17, 0.56)`
- **Tipografía:**
  - Titulares y Tesis: `'Newsreader'` (Google Fonts, pesos 400 y 500, regular e itálica).
  - Cuerpo, Menú y Metadatos: `'DM Sans'` (Google Fonts, pesos 400, 500 y 700).

---

## 📁 Estructura del Proyecto

```text
├── index.html            # Portada institucional estructurada en 5 Actos
├── publicaciones.html    # Catálogo bibliográfico con filtro interactivo por área y ficha modal
├── articulos.html        # Cuaderno de análisis coyuntural con lectura expandible in situ
├── miembros.html         # Directorio multidisciplinario por áreas del conocimiento
├── enlaces.html          # Mapa de articulación con redes laborales, educativas y territoriales
├── css/
│   └── estilos.css       # Sistema CSS3 moderno, variables nativas, mobile-first y accesibilidad
├── js/
│   └── script.js         # Menú sticky camaleónico, accesibilidad de video, filtros y modales
├── imagenes/
│   └── logo.png          # Logotipo con placa editorial en Hero y multiply blend-mode en fondos claros
├── videos/
│   └── san-pedro.webm    # Video de apertura en bucle silencioso para el Hero
└── README.md
```

---

## 🚀 Despliegue y Visualización Local

Al ser un sitio web estático nativo (HTML5, CSS3, JavaScript Vanilla), no requiere dependencias ni compiladores:

1. **Abrir directamente:** Puede abrirse cualquier archivo `.html` en cualquier navegador web moderno.
2. **Servidor local (opcional):**
   ```bash
   # Con Python
   python -m http.server 8000
   ```
   Abrir `http://localhost:8000` en el navegador.

---

## ⚖️ Licencia y Atribución Jurídica

Contenidos y documentos técnicos disponibles bajo criterios de consulta pública e investigación.
ONG de Desarrollo, Sociedad y Medio Ambiente (Entorno). Santiago de Chile.
