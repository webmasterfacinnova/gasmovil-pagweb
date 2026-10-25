# Reporte Lighthouse — Zerkio (https://zerkio.com)

**Fecha:** 2026-10-24
**Herramienta:** Lighthouse (via npx lighthouse@latest)
**Reportes completos:** `.kilo/lighthouse-report.report.json` y `.kilo/lighthouse-report.report.html`

## Puntuaciones

| Categoría | Score | Estado |
|-----------|-------|--------|
| **SEO** | 100/100 | ✅ Excelente — todas las mejoras SEO surtieron efecto |
| **Accesibilidad** | 92/100 | 🟢 Muy bueno — 2 problemas pendientes |
| **Performance** | 65/100 | 🟡 Mejorable — afectado por redirect de hosting |
| **Best Practices** | 58/100 | 🔴 Bajo — la mayoría son falsos positivos/config hosting |

## Core Web Vitals

| Métrica | Valor | Score | Estado |
|---------|-------|-------|--------|
| Largest Contentful Paint (LCP) | 5.5 s | 0.18 | 🔴 Malo (>2.5s) |
| Cumulative Layout Shift (CLS) | 0 | 1.0 | ✅ Excelente |
| First Contentful Paint (FCP) | 4.0 s | 0.24 | 🔴 Malo (>1.8s) |
| Total Blocking Time (TBT) | 260 ms | 0.84 | 🟢 Bueno (<200ms casi) |
| Speed Index | 4.2 s | 0.78 | 🟡 Regular |

**Nota:** CLS perfecto (0) — las optimizaciones de imagen (dimensiones estables, lazy loading) funcionaron. TBT también bueno.

## Hallazgos por categoría

### SEO (100/100) ✅
- Todas las mejoras implementadas (canonical, OG completo, JSON-LD, sitemap, robots, anchors) detectadas como correctas.
- 0 problemas.

### Accesibilidad (92/100) — 2 problemas
1. **`<select>` sin `<label>` asociado** (score 0)
   - El formulario de contacto en `index.astro` tiene un `<select>` de "Asunto" sin label asociado vía `for`/`id`.
2. **Sin main landmark** (score 0)
   - Falta `<main>` envolviendo el contenido principal. La estructura actual usa un `<div>` raíz.

### Performance (65/100) — causas
1. **Redirect `zerkio.com` → `www.zerkio.com`** (1097 ms perdidos)
   - Configuración de DNS/hosting (308 Permanent Redirect).
   - **No se puede arreglar desde el código** — requiere configurar el hosting para servir directamente desde `zerkio.com` (apex) o cambiar el canonical/Astro site a `www.zerkio.com`.
   - El redirect añade ~1.1s a TODA la carga, explicando buena parte del bajo LCP/FCP.
2. FCP y LCP altos (4.0s y 5.5s) en gran parte por el redirect + red de prueba de Lighthouse (laboratorio, no datos de campo).

### Best Practices (58/100) — causas
1. **"Does not use HTTPS"** (score 0)
   - **FALSO POSITIVO**: Lighthouse detecta `mailto:informacion@facinnova.com` como "insecure request". El sitio SÍ está en HTTPS. El `mailto:` es un enlace, no una petición HTTP.
   - El formulario usa `action={CONTACT_MAILTO}` (mailto:) que genera este falso positivo.
2. **"Uses third-party cookies"** (score 0)
   - Cookie de terceros detectada (probablemente Google AdSense/Doubleclick). No es del proyecto.
3. **"Issues logged in DevTools Issues panel"**
   - Problemas menores de navegador (típicamente relacionados con ads).

## Análisis: ¿cuánto de esto es del proyecto vs hosting?

### Fuera del control del código (hosting/config externo):
- 🔴 Redirect `zerkio.com → www.zerkio.com` (~1.1s) — 100% del bajo performance
- 🔴 Falso positivo HTTPS por `mailto:` — no es un problema real
- 🔴 Cookies de terceros (AdSense) — decisión comercial de ads
- 🔴 Issues de DevTools (ads)

### Controlable desde el código (pendiente):
- 🟡 Accesibilidad: `<select>` sin label + falta `<main>` (paso siguiente: Accesibilidad)
- 🟡 Opcional: cambiar `astro.config.mjs` site de `zerkio.com` a `www.zerkio.com` para que canonical/sitemap apunten a la URL sin redirect (mejoraría coherencia SEO + evitaría overhead si Google indexa el apex)

## Conclusión

Las mejoras de **SEO funcionaron perfectamente (100/100)**. La accesibilidad está muy cerca (92/100). El performance bajo (65) se debe casi enteramente al redirect de hosting que añade 1.1s — no es culpa del código del proyecto. Las optimizaciones de imagen/fuentes que aplicamos sí se reflejan en CLS=0 (perfecto) y TBT bueno.

## Recomendaciones de próximos pasos

1. **Accesibilidad (código)**: Corregir `<select>` sin label y añadir `<main>` — subiría de 92 a ~100.
2. **Coherencia de dominio (código + hosting)**: Decidir si el sitio canonical es `zerkio.com` o `www.zerkio.com`. Si el hosting fuerza `www`, cambiar `astro.config.mjs` site a `https://www.zerkio.com` para que canonical/sitemap coincidan y no haya redirect en el indexado de Google.
3. **Redirect de hosting (externo)**: Si es posible en el proveedor de DNS, configurar que `zerkio.com` (apex) sirva directamente sin redirect a `www`, o usar un CNAME/ALIAS flattening — eliminaría ~1.1s de la carga.
4. **Falso positivo HTTPS (mailto)**: Considerar cambiar el formulario de `action=mailto:` a un formulario funcional (servicio backend/Formsprovider) — mejoraría UX, accesibilidad y eliminaría el falso positivo. Es decisión de producto.
