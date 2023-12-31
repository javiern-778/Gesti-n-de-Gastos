document.addEventListener('DOMContentLoaded', function() {
  const firebaseConfig = {
    // Configuración de Firebase aquí
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto-id.firebaseapp.com",
    projectId: "tu-proyecto-id",
    // databaseURL: "http://localhost:9090" // Esto no es necesario para Firestore
    // Agrega otras configuraciones si es necesario
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Verificación si se está ejecutando localmente para usar el emulador Firestore
  if (location.hostname === 'localhost') {
    db.useEmulator('localhost', 8080);
  }

  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');
  const searchByDateBtn = document.getElementById('search-by-date');
  let total = 0;

  // Evento para agregar un nuevo gasto
  expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const date = new Date();

    if (description && !isNaN(amount)) {
      const expenseItem = document.createElement('div');
      expenseItem.classList.add('expense-item');
      expenseItem.innerHTML = `<p>${description} - $${amount.toFixed(2)} - ${category}</p>`;
      expenseList.appendChild(expenseItem);

      total += amount;
      totalExpenses.textContent = `Total: $${total.toFixed(2)}`;

      // Limpiar campos después de agregar gasto
      document.getElementById('expense-description').value = '';
      document.getElementById('expense-amount').value = '';

      // Guardar el gasto en Firestore
      db.collection('gastos').add({
        description,
        amount,
        category,
        date: date.toLocaleString()
      })
      .then((docRef) => {
        console.log("Gasto agregado con ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error al agregar el gasto: ", error);
      });
    }
  });

  // Evento para buscar gastos por fecha
  searchByDateBtn.addEventListener('click', function() {
    const dateInput = document.getElementById('date-input').value;

    // Realizar la consulta a Firestore para obtener los gastos con la fecha ingresada
    db.collection('gastos').where('date', '==', dateInput).get()
      .then(snapshot => {
        // Obtener los datos que coinciden con la fecha ingresada
        snapshot.forEach(doc => {
          const gasto = doc.data();
          console.log(`Descripción: ${gasto.description}, Monto: ${gasto.amount}`);
          // Hacer algo con los datos obtenidos, por ejemplo, mostrarlos en la interfaz de usuario
        });
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
      });
  });
});
