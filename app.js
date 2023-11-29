document.addEventListener('DOMContentLoaded', function() {
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalExpenses = document.getElementById('total-expenses');
  let total = 0;

  expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;

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
    }
      expenseForm.addEventListener('submit', function(event) {
event.preventDefault();

const description = document.getElementById('expense-description').value;
const amount = parseFloat(document.getElementById('expense-amount').value);
const category = document.getElementById('expense-category').value;

if (description && !isNaN(amount)) {
  // Resto del código para agregar el gasto y mostrarlo en la lista
}
});

  });
});
