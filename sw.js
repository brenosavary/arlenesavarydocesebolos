self.addEventListener('install', event => {
  console.log('Service Worker instalado.');
});

self.addEventListener('sync', event => {
  if (event.tag === 'get-notifications') {
    console.log('Service Worker: Recebido evento de sync "get-notifications"');
    event.waitUntil(getAndShowNotification());
  }
});

function getAndShowNotification() {
  return fetch('/notifications.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      const latestNotification = data.notifications[data.notifications.length - 1];
      const { title, body } = latestNotification;

      return self.registration.showNotification(title, {
        body: body,
        icon: 'icon.png' // Opcional: adicione um ícone para a notificação
      });
    })
    .catch(error => {
      console.error('Service Worker: Erro ao buscar ou exibir notificação:', error);
    });
}
