self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (event) {
  var data = {
    title: 'Nueva notificación',
    body: 'Hay una novedad',
    url: '/',
    icon: '/images/favicon.ico',
    badge: '/images/favicon.ico'
  };

  if (event.data) {
    try {
      var payload = event.data.json();
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
  event.notification.close();

  var targetUrl = (event.notification.data && event.notification.data.url) || '/';

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

