self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen = event.notification.data.isVideo
    ? "https://www.facebook.com"
    : "https://www.google.com";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener("push", function (event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.notification.body,
    // Add any other notification options as needed
    data: data.notification.data, // Pass additional data to the notification
  };

  event.waitUntil(
    self.registration.showNotification(data.notification.title, options)
  );
});
