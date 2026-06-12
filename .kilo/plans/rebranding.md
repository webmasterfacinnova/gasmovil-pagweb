# Plan de Rebranding: GasMovil a Zerkio

## Objetivo
Realizar rebranding completo de GasMovil a Zerkio, incluyendo cambio de nombre, logo y paleta de colores basada en el nuevo logo.

## Hallazgos Iniciales
- Archivo de estilos principal en `public/assets/css/style.css`
- Logo actual en `public/assets/img/logo.jpg`
- Nuevo logo proporcionado: `public/assets/img/LogoV4.jpg` (47.4KB, último modificado 07-jun-2026)

## Análisis del Nuevo Logo
Dado que no se puede acceder al contenido visual del logo, se procederá con el análisis basado en las siguientes suposiciones:

1. El nuevo logo (LogoV4.jpg) contiene la identidad visual completa de Zerkio
2. La paleta de colores principal debe extraerse del nuevo logo
3. El formato y tamaño del nuevo logo son adecuados para reemplazar al actual

## Pasos del Plan

### 1. Análisis de Color del Nuevo Logo
- Utilizar herramientas de procesamiento de imágenes para extraer la paleta de colores dominante del nuevo logo
- Identificar colores primarios, secundarios y de acento
- Documentar los valores hexadecimales de los colores principales

### 2. Actualización de Variables de Color
- Modificar las variables CSS en `:root` en `public/assets/css/style.css`
- Reemplazar `--primary-color` y `--secondary-color` con los nuevos colores de Zerkio
- Ajustar cualquier otro color relacionado según la nueva paleta

### 3. Cambio de Nombres y Textos
- Buscar y reemplazar todas las instancias de "GasMovil" por "Zerkio" en todos los archivos del proyecto
- Actualizar referencias en archivos de configuración, metadatos y código

### 4. Reemplazo del Logo
- Reemplazar `public/assets/img/logo.jpg` con `public/assets/img/LogoV4.jpg`
- Asegurar que las dimensiones y referencias en CSS sean compatibles
- Actualizar el atributo `src` en todos los archivos HTML si es necesario

### 5. Actualización de Metadatos
- Modificar etiquetas meta relevantes en los archivos HTML principales
  - `<title>`
  - `<meta name="description">`
  - `<meta property="og:title">`
  - `<meta property="og:description">`
  - `<meta name="twitter:card">`

### 6. Pruebas
- Verificar que el nuevo logo se muestre correctamente en todas las páginas
- Comprobar que los nuevos colores se aplican consistentemente
- Validar que todos los textos reflejan el nuevo nombre Zerkio
- Probar en diferentes tamaños de pantalla y dispositivos

### 7. Documentación
- Actualizar cualquier archivo de documentación interna
- Registrar los cambios realizados y decisiones de diseño

## Consideraciones
- Respetar la jerarquía visual establecida en el diseño original
- Mantener la accesibilidad y contraste adecuado entre colores
- Asegurar compatibilidad con diferentes navegadores
- Verificar que el tamaño del nuevo logo no afecte el rendimiento

## Siguiente Paso
Ejecutar análisis de color del nuevo logo para determinar la paleta definitiva antes de proceder con los cambios.