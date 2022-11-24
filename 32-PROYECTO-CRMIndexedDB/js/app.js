(function () {
  let DB;
  const listadoClientes = document.querySelector('#listado-clientes');

  document.addEventListener('DOMContentLoaded', () => {
    createDB();

    if (window.indexedDB.open('crm', 1)) {
      obtenerClientes();
    }

    listadoClientes.addEventListener('click', eliminarRegistro);
  });

  // Eliminar Registro
  function eliminarRegistro(e) {
    // console.log(e.target.classList);
    if (e.target.classList.contains('eliminar')) {
      const idEliminar = Number(e.target.dataset.cliente);

      const confirmar = confirm('¿Deseas eliminar este cliente?') // confirm() es nativa de Javascript
      // console.log(confirmar);

      if (confirmar) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.delete(idEliminar)

        transaction.oncomplete = function() {
          console.log('eliminado...');

          e.target.parentElement.parentElement.remove();
        }

        transaction.onerror = function() {
          console.log('Hubo un error');
        }
      }
    }
  }

  // Crea la base de datos de indexedDB
  function createDB() {
    const createDB = window.indexedDB.open('crm', 1);

    createDB.onerror = () => console.log('Hubo un error');

    createDB.onsuccess = () => {
      DB = createDB.result;
    };

    createDB.onupgradeneeded = e => {
      const db = e.target.result;

      const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

      // Crear la tabla
      // Los 3 argumentos son: 1: El Nombre, 2: El KeyPath para hacer referencia, 3: Opciones.
      // Se acostumbra colocar en el Nombre y en el KeyPath el mismo valor.
      objectStore.createIndex('nombre', 'nombre', { unique: false }); //Name-KeyPath-Options
      objectStore.createIndex('email', 'email', { unique: true }); //Name-KeyPath-Options
      objectStore.createIndex('telefono', 'telefono', { unique: false }); //Name-KeyPath-Options
      objectStore.createIndex('empresa', 'empresa', { unique: false }); //Name-KeyPath-Options
      objectStore.createIndex('id', 'id', { unique: true }); //Name-KeyPath-Options

      console.log('DB lista y creada');
    };
  }

  function obtenerClientes() {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = () => {
      console.log('Hubo un error');
    };

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;

      const objectStore = DB.transaction('crm').objectStore('crm');

      objectStore.openCursor().onsuccess = function (e) {
        const cursor = e.target.result;

        if (cursor) {
          // console.log(cursor.value);
          const { nombre, empresa, email, telefono, id } = cursor.value;

          listadoClientes.innerHTML += `
            <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                  <p class="text-sm leading-10 text-gray-700"> ${email} </p>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                  <p class="text-gray-700">${telefono}</p>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                  <p class="text-gray-600">${empresa}</p>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                  <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                  <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
              </td>
            </tr>
          `;

          cursor.continue();
        } else {
          console.log('No hay más registros');
        }
      };
    };
  }
})();
