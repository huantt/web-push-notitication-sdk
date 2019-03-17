(function (window) {
    var firebase = require('firebase/app');
    require('firebase/messaging');

    var messaging;
    var publicKey = "BKkywN7mV4fE34OgEBKxdg-1mAuBLj5rTmPqRboSzl6he7TlfqRUNA6rNb9PAuBETWp1jBbR3jhabOxSQgMUrho"
    var firebaseApiKey = "AIzaSyB2tTEzyahnRo51XWOu6fW9N9w1MoceZ_0"
    var messagingSenderId = "651849827303"
    var clientEnpoint = "https://yourserver.com/clients"
    var tags;

    window.webpushInit = function (options = {}) {
        tags = options.tags
        initFirebaseMessaging();
        var serviceWorker = options.service_worker
        if (!serviceWorker) {
            return console.error("Service worker option must be exist!")
        }
        registerServiceWorker(serviceWorker);
        register();
    }

    function initFirebaseMessaging() {
        firebase.initializeApp({
            "apiKey": firebaseApiKey,
            "messagingSenderId": messagingSenderId
        });

        messaging = firebase.messaging();
        messaging.usePublicVapidKey(publicKey);
    }


    function registerServiceWorker(serviceWorker) {
        if (!('serviceWorker' in navigator)) {
            console.warn("Service workers aren\'t supported in this browser.");
            return;
        }
        navigator.serviceWorker.register(serviceWorker)
            .then((registration) => {
                messaging.useServiceWorker(registration);
            });
    }

    function register() {
        if (Notification.permission != 'default') return

        messaging.requestPermission()
            .then(() => {
                messaging.getToken().then(function (currentToken) {
                    messaging.getPushSubscription(messaging.registrationToUse).then((subscription) => {
                        save(currentToken, subscription);
                    })
                }).catch(function (err) {
                    console.log('An error occurred while retrieving token. ', err);
                });
            }).catch(err => {
                console.warn("Subscribe Error:", err);
            });
    }

    function save(token, subscription) {
        fetch(clientEnpoint, {
            method: "POST",
            "headers": {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials:"include",
            body: JSON.stringify({
                subscription: subscription,
                token: token,
                tags: tags
            })
        }).then(function (response) {
            thanks();
        });
    }

    function thanks() {
        console.log("Thank for subscribing")
    }
})(window)