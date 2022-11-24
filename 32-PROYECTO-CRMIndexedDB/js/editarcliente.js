(function () {
  // let DB;
  let idCliente;

  const nombreInput = document.querySelector('#nombre');
  const emailInput = document.querySelector('#email');
  const telefonoInput = document.querySelector('#telefono');
  const empresaInput = document.querySelector('#empresa');

  const formulario = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();

    // Actualizar el registro
    formulario.addEventListener('submit', actualizarCliente);

    // Verificar el id de la url
    const parametrosUrl = new URLSearchParams(window.location.search);

    idCliente = parametrosUrl.get('id');
    // console.log('idCliente:', idCliente);

    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 1000);
    }
  });

  function actualizarCliente(e) {
    e.preventDefault();

    if (
      nombreInput.value === '' ||
      emailInput.value === '' ||
      telefonoInput.value === '' ||
      empresaInput.value === ''
    ) {
      imprimirAlerta('Todos los campos son obligatorios', 'error');
    }

    // Actualizar Cliente
    const clienteActualizado = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: Number(idCliente),
    }
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.put(clienteActualizado);

    transaction.oncomplete = function () {
      imprimirAlerta('Editado correctamente');

      setTimeout(() => {
        window.location.href = 'index.html'
      }, 3000);
    }

    transaction.onerror = function() {
      imprimirAlerta('Hubo un error', 'error')
    }
  }

  function obtenerCliente(id) {
    const transaction = DB.transaction(['crm'], 'readonly');
    const objectStore = transaction.objectStore('crm');
    // console.log(objectStore);

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {
        // console.log(cursor.value);
        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value);
        }
        cursor.continue();
      }
    };
  }

  function llenarFormulario(datosCliente) {
    const { nombre, email, telefono, empresa } = datosCliente;

    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
  }
})();
