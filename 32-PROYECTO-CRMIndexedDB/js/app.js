(function () {
  let DB;

  document.addEventListener('DOMContentLoaded', () => {
    createDB();
  });

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
})();
