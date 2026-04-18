var CACHE_VERSION = 'v2';
var STATIC_CACHE = 'static-' + CACHE_VERSION;
var IMAGE_CACHE = 'images-' + CACHE_VERSION;
var API_CACHE = 'api-' + CACHE_VERSION;

var CORE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/images/logo_essences.svg',
  '/images/warning.svg'
];

var API_EXCLUDED_PATHS = [
  '/backend/login',
  '/backend/logout',
  '/backend/cliente',
  '/backend/carrito',
  '/backend/checkout',
  '/backend/push/subscribe',
  '/backend/push/unsubscribe'
];

function shouldExcludeApiPath(pathname) {
  return API_EXCLUDED_PATHS.some(function (blockedPath) {
    return pathname.indexOf(blockedPath) === 0;
  });
}

function isApiGetRequest(request, url) {
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return false;
  }

  if (!url.pathname.startsWith('/backend')) {
    return false;
  }

  return !shouldExcludeApiPath(url.pathname);
}

function isStaticAssetRequest(url) {
  return /\.(?:js|css|woff2?|ttf)$/i.test(url.pathname);
}

function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

async function cacheFirst(request, cacheName) {
  var cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  var networkResponse = await fetch(request);

  if (networkResponse && networkResponse.ok) {
    var cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
  }

  return networkResponse;
}

async function staleWhileRevalidate(request, cacheName) {
  var cache = await caches.open(cacheName);
  var cachedResponse = await cache.match(request);

  var networkFetch = fetch(request)
    .then(function (networkResponse) {
      if (networkResponse && networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }

      return networkResponse;
    })
    .catch(function () {
      return null;
    });

  if (cachedResponse) {
    return cachedResponse;
  }

  var networkResponse = await networkFetch;
  if (networkResponse) {
    return networkResponse;
  }

  throw new Error('No hay respuesta en cache ni en red.');
}

async function networkFirstNavigation(request) {
  try {
    var networkResponse = await fetch(request);

    if (networkResponse && networkResponse.ok) {
      var staticCache = await caches.open(STATIC_CACHE);
      staticCache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    var cachedPage = await caches.match(request);
    if (cachedPage) {
      return cachedPage;
    }

    var offlinePage = await caches.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }

    throw error;
  }
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(function (cache) {
        return cache.addAll(CORE_ASSETS);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function (cacheName) {
              return cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE && cacheName !== API_CACHE;
            })
            .map(function (cacheName) {
              return caches.delete(cacheName);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener('push', function (event) {
    console.log('Evento push recibido');
  var data = {
    title: 'Nueva notificación',
    body: 'Hay una novedad',
    url: '/',
    icon: '/images/favicon.ico',
    badge: '/images/favicon.ico'
  };
  if (event.data) {
    try {
      var rawPayload = event.data.text();
      console.log('Push recibido:', rawPayload || 'No hay datos');

      var payload = rawPayload ? JSON.parse(rawPayload) : {};
      var payloadData = payload && typeof payload.data === 'object' && payload.data !== null
        ? payload.data
        : {};

        data = {
        title: payload.title || data.title,
        body: payload.body || data.body,
        // Compatibilidad: acepta url en raiz o dentro de payload.data.url.
        url: payload.url || payloadData.url || data.url,
        // Compatibilidad: acepta icon/badge en raiz o dentro de payload.data.
        icon: payload.icon || payloadData.icon || data.icon,
        badge: payload.badge || payloadData.badge || data.badge
      };
    } catch (error) {
      // Si el payload no llega en JSON, se mantienen los valores por defecto.
      console.warn('Push payload inválido', error);
    }
  } else {
    console.log('Push recibido: No hay datos');
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      data: {
        url: data.url || '/'
      }
    })
  );
});

self.addEventListener('notificationclick', function (event) {
    console.log('Notificación clickeada:', event.notification);
  event.notification.close();

  var rawTargetUrl = (event.notification.data && event.notification.data.url) || '/';
  var targetUrl = new URL(rawTargetUrl, self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
      for (var i = 0; i < windowClients.length; i += 1) {
        var client = windowClients[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }

      return undefined;
    })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  var url = new URL(request.url);

  if (isNavigationRequest(request)) {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (request.method !== 'GET') {
    return;
  }

  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }

  if (isStaticAssetRequest(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  if (isApiGetRequest(request, url)) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE));
  }
});

/*
De https://github.com/ERaufi/LaravelProjects/blob/ffc918dffaf1b753c025e6e5e001a3206d4b3950/public/service-worker.js#L4

self.addEventListener("push", (event) => {
    const notification = event.data.json();

    event.waitUntil(
        self.registration.showNotification(notification.title, {
            body: notification.body,
            icon: "./images/logo.png",
            data: {
                url: notification.url
            }
        })
    )
});


self.addEventListener("notificationclick", (event) => {
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    )
})


*/

