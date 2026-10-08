const form = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateTotal() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  totalAmountDisplay.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.description}</span> <strong>Rp ${item.amount.toLocaleString('id-ID')}</strong>`;
    expenseList.appendChild(li);
  });
  updateTotal();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (description && amount) {
    expenses.push({ description, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    descriptionInput.value = '';
    amountInput.value = '';
  }
});

renderExpenses();
