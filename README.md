# Proyecto educativo en React "Essences Perfumería On-line"

Este proyecto es una aplicación web de comercio electrónico para una perfumería en línea, desarrollada con React.
El objetivo principal es proporcionar una experiencia de compra fluida y atractiva para los usuarios, permitiéndoles explorar y adquirir productos de perfumería de manera sencilla.

## Entorno de desarrollo

- Gestor de paquetes oficial: `npm`.
- Lockfile oficial: `package-lock.json`.
- No se debe usar `yarn.lock` en este repositorio.

Comandos base:

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Licencia

Este proyecto incluye partes del código original de Muhammed Resvan K (2024), licenciado bajo la Licencia MIT.  
El texto completo de la licencia se encuentra en el archivo [LICENCE](LICENSE).

## Descargo de responsabilidad

Este proyecto se utiliza únicamente con fines de aprendizaje y demostración. No está destinado a uso comercial.

## Modo cacheado y sin conexión

- La aplicación registra un Service Worker desde `src/app/registerServiceWorker.ts`.
- Se cachean recursos estaticos, imagenes y respuestas `GET` de `/backend` en `public/service-worker.js`.
- Si falla la red en navegación, se sirve `public/offline.html`.
- Acciones que requieren servidor (por ejemplo login o carrito para usuarios autenticados) muestran aviso y no continúan sin conexion.
