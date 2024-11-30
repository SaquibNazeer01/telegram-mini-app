// Get all necessary DOM elements
const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const incomeList = document.getElementById('income-list');
const expenseList = document.getElementById('expense-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');
const showDetailsBtn = document.getElementById('show-details-btn');
const hideDetailsBtn = document.getElementById('hide-details-btn');
const detailsSection = document.getElementById('details-section');

let totalIncome = 0;
let totalExpenses = 0;

// Income Form Submission
incomeForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    const source = document.getElementById('income-source').value;
    const otherSource = document.getElementById('income-other').value;
    const amount = parseFloat(document.getElementById('income-amount').value);
    const incomeSource = source === 'Other' ? otherSource : source;
    const incomeDate = document.getElementById('income-date').value;

    if (incomeSource && amount > 0) {
        // Create a new list item to display the income
        const li = document.createElement('li');
        li.textContent = `${incomeSource} (₹${amount.toFixed(2)}) - ${incomeDate}`;
        incomeList.appendChild(li);
        totalIncome += amount;

        // Update the summary
        updateSummary();
        
        // Reset form after adding income
        incomeForm.reset();
        document.getElementById('income-other').style.display = 'none';
    }
});

// Expense Form Submission
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    const category = document.getElementById('expense-category').value;
    const otherCategory = document.getElementById('expense-other').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const expenseCategory = category === 'Other' ? otherCategory : category;
    const expenseDate = document.getElementById('expense-date').value;

    if (expenseCategory && amount > 0) {
        // Create a new list item to display the expense
        const li = document.createElement('li');
        li.textContent = `${expenseCategory} (₹${amount.toFixed(2)}) - ${expenseDate}`;
        expenseList.appendChild(li);
        totalExpenses += amount;

        // Update the summary
        updateSummary();
        
        // Reset form after adding expense
        expenseForm.reset();
        document.getElementById('expense-other').style.display = 'none';
    }
});

// Function to update the income, expense, and balance totals
function updateSummary() {
    totalIncomeEl.textContent = totalIncome.toFixed(2);
    totalExpensesEl.textContent = totalExpenses.toFixed(2);
    const balance = totalIncome - totalExpenses;
    balanceEl.textContent = balance.toFixed(2);

    // Update balance color (green for positive, red for negative)
    if (balance >= 0) {
        balanceEl.classList.add('positive');
        balanceEl.classList.remove('negative');
    } else {
        balanceEl.classList.add('negative');
        balanceEl.classList.remove('positive');
    }
}

// Show and Hide Expenses Details
showDetailsBtn.addEventListener('click', () => {
    detailsSection.style.display = 'block';
    showDetailsBtn.style.display = 'none';
    hideDetailsBtn.style.display = 'inline';
});

hideDetailsBtn.addEventListener('click', () => {
    detailsSection.style.display = 'none';
    showDetailsBtn.style.display = 'inline';
    hideDetailsBtn.style.display = 'none';
});

// Show and Hide the 'Other' input fields for dynamic category and source
document.getElementById('income-source').addEventListener('change', (e) => {
    document.getElementById('income-other').style.display = e.target.value === 'Other' ? 'block' : 'none';
});

document.getElementById('expense-category').addEventListener('change', (e) => {
    document.getElementById('expense-other').style.display = e.target.value === 'Other' ? 'block' : 'none';
});
