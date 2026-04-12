# Proyecto educativo en React "Essences Perfumería On-line"

Este proyecto está basado en el trabajo de [Muhammed Resvan K](https://github.com/Resvan/3legant), publicado originalmente bajo la Licencia MIT.

El código original ha sido adaptado con fines exclusivamente educativos. Se realizaron modificaciones para ilustrar determinados conceptos técnicos dentro del contexto de una aplicación React.

## Licencia

Este proyecto incluye partes del código original de Muhammed Resvan K (2024), licenciado bajo la Licencia MIT.  
El texto completo de la licencia se encuentra en el archivo [LICENCE](LICENSE).

## Descargo de responsabilidad

Este proyecto se utiliza únicamente con fines de aprendizaje y demostración. No está destinado a uso comercial.


# Educational React Project "Essences Perfumería On-line"

This project is based on the work of [Muhammed Resvan K](https://github.com/Resvan/3legant), originally released under the MIT License.

The original code has been adapted for educational purposes only. Modifications were made to better illustrate certain technical concepts in the context of a React application.

## License

This project includes portions of code from the original work by Muhammed Resvan K (2024), which is licensed under the MIT License.  
The full license text is available in the [LICENCE](LICENSE) file.

## Disclaimer

This project is for learning and demonstration purposes only. It is not intended for commercial use.

## Configuracion de API (desarrollo local)

Para conectar el frontend al mismo backend de `requests.http`:

1. Crea un archivo `.env` en la raiz del proyecto.
2. Define la variable:

```env
VITE_API_URL=http://127.0.0.1:8001/api
```

> Si no existe `.env`, la aplicacion usa ese mismo valor por defecto.

## Modo cacheado y sin conexion

- La aplicacion registra un Service Worker desde `src/app/registerServiceWorker.ts`.
- Se cachean recursos estaticos, imagenes y respuestas `GET` de `/backend` en `public/service-worker.js`.
- Si falla la red en navegacion, se sirve `public/offline.html`.
- Acciones que requieren servidor (por ejemplo login o carrito para usuarios autenticados) muestran aviso y no continúan sin conexion.
