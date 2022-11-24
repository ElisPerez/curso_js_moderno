const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click', () => {
  // Para preguntar al usuario si desea habilitar las notificaciones en el navegagor:
  Notification.requestPermission().then(result => {
    console.log('El resultado es:', result); // default | denied | granted
  });
});

const verNotificacionBtn = document.querySelector('#verNotificacion');
verNotificacionBtn.addEventListener('click', () => {
  // console.log('click');
  if (Notification.permission == 'granted') {
    const notificacion = new Notification('Esta es la notificación', {
      icon: 'img/ccj.png',
      body: 'Código Líder también aprende con Código con Juan',
    });

    notificacion.onclick = function () {
      window.open('https://www.codigoconjuan.com');
    }
  }
});
