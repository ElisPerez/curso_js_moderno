const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click', () => {
  Notification
    .requestPermission()
    .then(result => {
      console.log('El resultado es:', result); // default | denied | granted
    });
});
