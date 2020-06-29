importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/favicon.ico', revision: '1' },
        { url: '/images/logo192.png', revision: '1' },
        { url: '/images/logo512.png', revision: '1' },
        { url: '/src/components/nav.html', revision: '1' },
        { url: '/src/pages/home.html', revision: '1' },
        { url: '/src/pages/teams.html', revision: '1' },
        { url: '/src/pages/favourite.html', revision: '1' },
        { url: '/assets/css/main.css', revision: '1' },
        { url: '/assets/css/materialize.min.css', revision: '1' },
        { url: '/assets/js/index.js', revision: '1' },
        { url: '/assets/js/idb.js', revision: '1' },
        { url: '/assets/js/materialize.min.js', revision: '1' },
        { url: '/assets/js/modules/api.js', revision: '1' },
        { url: '/assets/js/modules/nav.js', revision: '1' },
        { url: '/assets/js/modules//page.js', revision: '1' },
        { url: '/assets/js/modules/database.js', revision: '1' },
        { url: '/assets/js/modules/listener.js', revision: '1' },
        { url: '/assets/js/modules/pwa.js', revision: '1' },
        ]);

        workbox.routing.registerRoute(
            /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
            workbox.strategies.cacheFirst({
                cacheName: 'image-cache',
                plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 34 * 60 * 60,
                }),
                ]
            })
            );


    workbox.routing.registerRoute(
        new RegExp('/'),
        workbox.strategies.staleWhileRevalidate()
        );

        workbox.routing.registerRoute(
            new RegExp('/src/pages/'),
              workbox.strategies.staleWhileRevalidate()
          );    

          // Caching Google Fonts
        workbox.routing.registerRoute(
            /.*(?:googleapis|gstatic)\.com/,
            workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
            );

        workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-resources',
        })
        );

        workbox.routing.registerRoute(
            new RegExp('https://api.football-data.org'),
            workbox.strategies.staleWhileRevalidate({
              cacheExpiration: {
                    maxAgeSeconds: 60 * 20 //cache diperbarui setiap 20 menit
              }
            })
        );
      }
else{
  console.log(`Workbox gagal dimuat`);
}


//Respon untuk Push Notification
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/images/logo192.png',
      image: '/images/logo512.png',
      badge: '/images/logo192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

