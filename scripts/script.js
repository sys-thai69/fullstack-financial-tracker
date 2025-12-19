let transactions = []; 

const nextId = (function() {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
})();

const calculateBalance = (data) => {
  return data.reduce((accumulator, transaction) => accumulator + transaction.amount, 0); 
};

const updateDisplay = () => {
  const currentBalance = calculateBalance(transactions);
  
  const totalEntriesEl = document.getElementById('total-entries');
  const currentAmount
   = document.getElementById('balance-amount');
  const historyBody = document.getElementById('history-body');

  totalEntriesEl.textContent = transactions.length;
  currentAmount
  .textContent = currentBalance.toFixed(2);
  
  currentAmount
  .classList.remove('total-balance-positive', 'total-balance-negative');
  if (currentBalance >= 0) {
    currentAmount
    .classList.add('total-balance-positive');
  } else {
    currentAmount
    .classList.add('total-balance-negative');
  }

  historyBody.innerHTML = ''; 

  transactions.forEach(transaction => {
    const classType = transaction.amount >= 0 ? 'income' : 'expense';
    
    const runningBalance = calculateBalance(transactions.filter(t => t.id <= transaction.id));

    const row = historyBody.insertRow();
    
    row.insertCell(0).textContent = transaction.id;
    row.insertCell(1).textContent = transaction.description;
    
    const amountCell = row.insertCell(2);
    amountCell.innerHTML = `<span class="${classType}">${transaction.amount.toFixed(2)}</span>`;
    
    row.insertCell(3).textContent = transaction.amount >= 0 ? 'Income' : 'Expense';
  });
};

const addExpense = (e) => {
  if (e) e.preventDefault(); 
  
  const amountInput = document.getElementById('amount');
  const descriptionInput = document.getElementById('description');
  
  const amount = parseFloat(amountInput.value);
  const description = descriptionInput.value.trim();

  if (isNaN(amount) || amount === 0 || description === '') {
    alert("Please enter a valid amount or description.");
    return;
  }
  
  const newTransaction = {
    id: nextId(),
    amount: amount,
    description: description,
  };

  transactions = [...transactions, newTransaction]; 

  updateDisplay();
  
  amountInput.value = '';
  descriptionInput.value = '';
};

document.getElementById('add-expense').addEventListener('click', addExpense);

updateDisplay();