if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(error => {
      console.error('Falha ao registrar o Service Worker:', error);
    });
}

const notificationButton = document.getElementById('notifications');

notificationButton.addEventListener('click', () => {
  if (!('Notification' in window)) {
    alert('Este browser não suporta notificações.');
    return;
  }

  Notification.requestPermission(status => {
    console.log('Status da permissão de notificação:', status);
    if (status === 'granted') {
      notificationButton.disabled = true;
      navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register('get-notifications');
      }).then(() => {
        console.log('Sincronização de fundo "get-notifications" registrada.');
        alert('Permissão para notificações concedida! Você receberá uma notificação em breve.');
      }).catch(err => {
        console.error('Falha ao registrar a sincronização de fundo:', err);
        alert('Permissão para notificações concedida, mas falha ao agendar a notificação.');
      });
    } else {
      alert('Permissão para notificações negada.');
    }
  });
});
