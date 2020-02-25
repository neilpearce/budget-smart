const doc = document;
const balance = doc.getElementById("balance");
const money_plus = doc.getElementById("money-plus");
const money_minus = doc.getElementById("money-minus");
const list = doc.getElementById("list");
const form = doc.getElementById("form");
const text = doc.getElementById("text");
const amount = doc.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 200 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 }
];

let transactions = dummyTransactions;

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: genRandomId(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionsDOM(transaction);
    updateValues();
    text.value = "";
    amount.value = "";
  }
}

function genRandomId() {
  return Math.floor(Math.random() * 1000000);
}

// Add transactions to DOM list
function addTransactionsDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = doc.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
    `;
  list.appendChild(item);
}

// Update the balance/income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `£${total}`;
  money_plus.innerText = `£${income}`;
  money_minus.innerText = `£${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionsDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
