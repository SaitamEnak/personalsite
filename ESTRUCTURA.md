# Estructura del proyecto

## Raíz del proyecto

| Carpeta / Archivo | Descripción |
|---|---|
| `src/` | Todo el código fuente de la aplicación |
| `public/` | Archivos estáticos servidos tal cual (favicon, íconos SVG) |
| `.github/workflows/` | Configuración del deploy automático a GitHub Pages |
| `.claude/` | Archivos de configuración y notas para Claude Code |

---

## Dentro de `src/`

### `components/`
Piezas de UI reutilizables que no son páginas completas.

- `Sidebar.jsx` — La card fija de la izquierda con perfil, bio y links
- `Tabs.jsx` — El selector segmentado (Articles / Portfolio / Lab)
- `BentoGrid.jsx` — Grid de cards (actualmente sin uso directo, reemplazado por las páginas)
- `Cursor.jsx` — El cursor personalizado circular

### `pages/`
Las vistas completas de la aplicación. Cada archivo corresponde a una sección navegable.

- `Home.jsx` — Contenedor principal que monta los tabs
- `Articles.jsx` — Lista de artículos en formato cards
- `ArticleDetail.jsx` — Vista de lectura de un artículo individual
- `Portfolio.jsx` — Grid de proyectos
- `Lab.jsx` — Grid de experimentos y exploraciones

### `context/`
Estado global compartido entre componentes.

- `ThemeContext.jsx` — Maneja el tema light/dark y lo persiste en `localStorage`

### `data/`
Contenido estático de la aplicación.

- `articles.js` — Array con todos los artículos: título, tag, fecha, tiempo de lectura y cuerpo de texto

### `assets/`
Imágenes e íconos importados directamente en el código.

---

## Flujo general

```
main.jsx
  └── App.jsx
        ├── Cursor
        ├── /articles/:slug → ArticleDetail  (sin sidebar)
        └── /* → Layout
                  ├── Sidebar
                  └── Home
                        └── Tabs
                              ├── Articles
                              ├── Portfolio
                              └── Lab
```
