# CMS Schema

## Articles

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| `slug` | String | ✓ | Único, URL-friendly. Ej: `"disenar-con-ia"` |
| `title` | String | ✓ | Título del artículo |
| `tag` | String | ✓ | Categoría. Ej: `"IA"`, `"Diseño"`, `"Sistemas"` |
| `date` | String | ✓ | Ej: `"12 mar 2025"` |
| `readingTime` | String | ✓ | Ej: `"6 min"` |
| `cover` | String | | CSS gradient o URL de imagen. Ej: `"linear-gradient(135deg, #1a0533, #7002FF)"` |
| `body` | Text | ✓ | Cuerpo del artículo. Soporta `## Heading` para secciones y párrafos separados por línea en blanco |

---

## Lab

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| `slug` | String | ✓ | Único, URL-friendly. Ej: `"cursor-magnetico"` |
| `title` | String | ✓ | Nombre del experimento |
| `label` | String | ✓ | Badge visible en la card. Ej: `"EXP 01"` |
| `tag` | String | | Categoría interna. Ej: `"IA"`, `"Motion"`, `"Tipografía"` |
| `thumb` | String | | CSS gradient o URL de imagen 4:3 |

---

## Portfolio

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| `title` | String | ✓ | Nombre del proyecto |
| `tag` | String | ✓ | Tipo de trabajo. Ej: `"UX Research"`, `"Producto"`, `"Web"` |
| `desc` | String | ✓ | Descripción corta |
| `year` | String | ✓ | Ej: `"2024"` |
| `gradient` | String | | CSS gradient para el fondo de la card. Ej: `"linear-gradient(140deg, #0f0c29, #302b63)"` |
| `accent` | String | | Color hex para el badge de tag. Ej: `"#a78bfa"` |
