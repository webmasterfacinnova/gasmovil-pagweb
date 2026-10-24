# Plan de Mejoras de SEO — Zerkio (gasmovil-pagweb)

## Contexto y verificación del estado real

El análisis previo contenía errores. Tras inspeccionar el código fuente actual y la build, el estado real del SEO es:

### Ya está bien (NO repetir)
- ✅ `<html lang="es">` en `src/layouts/Layout.astro:13`
- ✅ `title` y `meta description` únicos por página (`Layout.astro:18,35`; `index.astro:11-12`; `legal/terms.astro:13-14`; `legal/privacy.astro:98-99`)
- ✅ Open Graph básico: `og:type`, `og:title`, `og:description`, `og:image` (`Layout.astro:20-23`)
- ✅ Twitter Card: `twitter:card`, `twitter:title`, `twitter:description` (`Layout.astro:24-26`)
- ✅ `robots.txt` existe en `public/robots.txt` y apunta a `https://zerkio.com/sitemap-index.xml` (correcto)
- ✅ `@astrojs/sitemap` está integrado (`astro.config.mjs:6,10`) y **genera** `sitemap-index.xml` + `sitemap-0.xml` al compilar (visible en `dist/`). Incluye `/`, `/legal/privacy/`, `/legal/terms/`.
- ✅ Un solo `<h1>` por página (`index.astro:30`, `terms.astro:19`, `privacy.astro:104`)
- ✅ `site: "https://zerkio.com"` en `astro.config.mjs:9` (dominio canónico confirmado)
- ✅ `theme-color` y favicon (`Layout.astro:19,28`)

### Problemas reales detectados (a corregir)
1. ❌ **Falta `<link rel="canonical">`** — ausente en `Layout.astro`.
2. ❌ **Open Graph incompleto**: faltan `og:url`, `og:site_name`, `og:locale`; `og:image` es relativa (`/assets/img/logo.jpg`) y no tiene tamaño 1200×630 ideal para social.
3. ❌ **Falta `twitter:image`**.
4. ❌ **Sin datos estructurados (JSON-LD)** — ni Organization, ni WebSite, ni SoftwareApplication.
5. ❌ **Enlaces ancla rotos** en `Navbar.astro` y `Footer.astro`:
   - `#top` → no existe ningún elemento con `id="top"` (hero no tiene id).
   - `#mockups` → no existe (sección real más cercana: `#features` en `DualFeatureSection.astro:6`).
   - `#contacto` → no existe (el id real es `contact` en `index.astro:282`).
   - IDs reales disponibles: `app` (128), `why` (172), `features` (DualFeatureSection:6), `download` (242), `contact` (282).
6. ⚠️ **`dist/` obsoleto**: la build en `dist/` corresponde al sitio anterior "Gasmovil" (tema claro, título "Gasmovil | Gas a domicilio en México", URLs `gasmovil.app`). No refleja el `src/` actual. Tras aplicar los cambios hay que recompilar antes de desplegar.
7. ⚠️ **Falta acento**: "Politica de Privacidad" → "Política de Privacidad" (`privacy.astro:98,99,104`).
8. (Opcional) `favicon.svg` existe en `public/` pero `Layout.astro` solo referencia `favicon.ico`.

## Tareas ordenadas (solo SEO)

### Tarea 1 — Añadir canonical y completar OG/Twitter en `Layout.astro`
Archivo: `src/layouts/Layout.astro`

En el bloque `<head>`, transformar las meta sociales para usar URLs absolutas basadas en `Astro.site` y `Astro.url`:

```astro
---
import '../styles/global.css';
const canonicalURL = new URL(Astro.url.pathname, Astro.site).href;
const { title, description } = Astro.props;
const ogImage = new URL('/assets/img/og-image.jpg', Astro.site).href; // ver Tarea 4
---
<!-- ... -->
<link rel="canonical" href={canonicalURL} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:site_name" content="Zerkio" />
<meta property="og:locale" content="es_MX" />
<meta property="og:image" content={ogImage} />
<meta name="twitter:image" content={ogImage} />
```
Mantener las OG/Twitter ya existentes. Eliminar la `og:image` relativa vieja y reemplazarla por la absoluta.

Nota: `og:image` absoluta es obligatoria para algunos scrapers (WhatsApp, Slack). Si no se crea la imagen dedicada (Tarea 4), usar `new URL('/assets/img/logo.jpg', Astro.site).href` como mínimo absoluto.

### Tarea 2 — Añadir JSON-LD (datos estructurados)
Archivo: `src/layouts/Layout.astro` (Organization + WebSite, globales a todas las páginas).

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zerkio",
  url: "https://zerkio.com",
  logo: "https://zerkio.com/assets/img/zerkio-logo.png",
  sameAs: ["https://play.google.com/store/apps/details?id=com.faccinnova.gasmovil"]
})} />
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zerkio",
  url: "https://zerkio.com"
})} />
```

Archivo: `src/pages/index.astro` (SoftwareApplication para la app móvil, solo en home):

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zerkio",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Android",
  offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "50000" }
})} />
```
Precaución: `aggregateRating` con "4.9 / 50k" debe reflejar datos reales de la Play Store. Si no son verificables, omitir `aggregateRating` para evitar penalización por datos falsos. **Decisión abierta** — ver más abajo.

### Tarea 3 — Corregir enlaces ancla rotos
- `src/components/Navbar.astro`: cambiar `href="#top"` → mantener pero añadir `id="top"`; cambiar `href="#mockups"` → `href="#features"`; cambiar `href="#contacto"` → `href="#contact"`. Aplicar a ambos bloques de nav (escritorio línea 19-24 y móvil línea 42-46).
- `src/components/Footer.astro:43`: cambiar `href="#contacto"` → `href="#contact"`.
- `src/pages/index.astro`: añadir `id="top"` a la sección hero (línea 20, el `<section>` actual sin id) para que `#top` funcione.

Decisión abierta (menor): "Soy cliente" y "Soy proveedor" acabarían ambos en `#features` (que contiene los dos modos). Alternativa: "Soy cliente"→`#why`, "Soy proveedor"→`#features`. Recomendado: dejar "Soy cliente" en `#features` y "Soy proveedor" también en `#features` por ahora (mínimo cambio), o mapear "Soy cliente"→`#why`. No bloquea; el agente puede elegir la opción que preserve mejor la intención.

### Tarea 4 — (Opcional) Imagen OG dedicada 1200×630
Crear `public/assets/img/og-image.jpg` (1200×630 px) con logo/branding de Zerkio y actualizar la ruta en Tarea 1. Si no se crea, usar `logo.jpg` con URL absoluta. Esta tarea requiere un asset gráfico; queda a discreción del usuario.

### Tarea 5 — Corrección de acentos en privacidad
`src/pages/legal/privacy.astro` líneas 98, 99, 104: "Politica" → "Política".

### Tarea 6 — (Opcional) Favicon SVG
`src/layouts/Layout.astro`: añadir `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` junto al `favicon.ico` existente.

### Tarea 7 — Recompilar y verificar
- Ejecutar `npm run build` para regenerar `dist/` con el dominio `zerkio.com` (la build actual está obsoleta con `gasmovil.app`).
- Verificar en `dist/`:
  - `dist/index.html` contiene `<link rel="canonical">`, `og:url`, `twitter:image`, JSON-LD.
  - `dist/sitemap-index.xml` y `dist/sitemap-0.xml` listan URLs `https://zerkio.com/...`.
  - `dist/robots.txt` mantiene `Sitemap: https://zerkio.com/sitemap-index.xml`.
- No modificar `public/robots.txt` (ya correcto).

## Validación
- Servir `dist/` localmente (`npm run preview`) y comprobar con Lighthouse → sección SEO (meta de canonical, og:image absoluta, structured data válida, enlaces internos sin anchors rotos).
- Validar JSON-LD con https://validator.schema.org/ pegando el markup generado.
- Verificar que no queden anchors `#top`, `#mockups`, `#contacto` sin destino.

## Decisiones abiertas
1. **`aggregateRating` en JSON-LD**: ¿incluir "4.9 / 50k" basado en datos reales de Play Store, u omitirlo? Recomendado: **omitir** si no se puede verificar, para evitar marcado engañoso.
2. **Mapeo de "Soy cliente"/"Soy proveedor"** en el nav (ver Tarea 3). Recomendado: mínima corrección de anchors rotos; ajuste fino de IA queda fuera del alcance SEO.
3. **Imagen OG dedicada** (Tarea 4): ¿el usuario proporcionará una imagen 1200×630? Si no, usar `logo.jpg` con URL absoluta.

## Fuera de alcance (este plan es solo SEO)
- Performance, accesibilidad, seguridad (cubiertos en otros planes/fases).
- PWA/manifest, service workers.
- Google Search Console verification tag (requiere código del usuario).
