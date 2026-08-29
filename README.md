# CorePalm Soluciones - Proyecto Astro

Sitio web corporativo y plataforma de cotización para **CorePalm Soluciones**, especializado en desarrollo de software, seguridad CCTV, redes de datos y soporte de hardware.

## 🚀 Comandos Rápidos

Una vez instalado [Node.js](https://nodejs.org/), puedes ejecutar los siguientes comandos en la raíz del proyecto:

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala las dependencias del proyecto |
| `npm run dev` | Inicia el servidor de desarrollo local (`http://localhost:4321`) |
| `npm run build` | Compila el sitio estático optimizado para producción en `dist/` |
| `npm run preview` | Previsualiza localmente la compilación de producción |

## 📁 Estructura del Proyecto

```text
├── public/              # Archivos estáticos directos (favicon, imágenes)
├── src/
│   ├── components/      # Componentes modulares .astro (Hero, Services, Quote, FAQ, etc.)
│   ├── layouts/         # Plantillas base (Layout.astro)
│   ├── pages/           # Rutas del sitio (index.astro, tarjeta-presentacion.astro)
│   └── styles/          # Estilos globales y tokens CSS (global.css)
├── astro.config.mjs     # Configuración de Astro
└── package.json         # Dependencias y scripts
```
