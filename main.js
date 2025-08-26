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
      alert('Permissão para notificações concedida!');
      notificationButton.disabled = true;
    } else {
      alert('Permissão para notificações negada.');
    }
  });
});
