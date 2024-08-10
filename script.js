document.addEventListener('DOMContentLoaded', loadExpenses);

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value.trim());
    const people = document.getElementById('people').value.split(',').map(person => person.trim());

    // Validation
    let errors = [];

    if (description === '') {
        errors.push('Description is required.');
    }
    if (isNaN(amount) || amount <= 0) {
        errors.push('Amount must be a positive number.');
    }
    if (people.length === 0 || people.some(person => person === '')) {
        errors.push('At least one person must be listed and names should not be empty.');
    }

    if (errors.length > 0) {
        displayErrors(errors);
    } else {
        const expense = { description, amount, people };
        addExpense(expense);
        saveExpense(expense);
        clearForm();
    }
});

function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => addExpense(expense));
}


function addExpense(expense) {
  const resultsList = document.getElementById('resultsList');
  const listItem = document.createElement('li');

  const totalPerPerson = (expense.amount / expense.people.length).toFixed(2);
  listItem.innerHTML = `
      <strong>${expense.description}</strong><br>
      Total Amount: $${expense.amount.toFixed(2)}<br>
      Split Among: ${expense.people.join(', ')}<br>
      Each Person Owes: $${totalPerPerson}
  `;

  resultsList.appendChild(listItem);
}
