self.addEventListener('push', function (event) {
    console.log('[sw]', 'pushed!!', event.data.json());
    var options = event.data.json().data;

    var vibrate = options.vibrate
    if (typeof vibrate == 'string') {
        vibrate = JSON.parse(vibrate)
        options['vibrate'] = vibrate
    }

    var actions = options.actions
    if (typeof actions == 'string') {
        actions = JSON.parse(actions)
        options['actions'] = actions
    }

    var requireInteraction = options.requireInteraction
    if (typeof requireInteraction == 'string') {
        requireInteraction = JSON.parse(requireInteraction)
        options['requireInteraction'] = requireInteraction
    }

    var renotify = options.renotify
    if (typeof renotify == 'string') {
        renotify = JSON.parse(renotify)
        options['renotify'] = renotify
    }

    var silent = options.silent
    if (typeof silent == 'string') {
        silent = JSON.parse(silent)
        options['silent'] = silent
    }

    event.waitUntil(self.registration.showNotification(options.title, options));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    var data = event.notification.data;
    if (typeof data == 'string') {
        data = JSON.parse(data);
    }
    var url = data.url
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function (windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
