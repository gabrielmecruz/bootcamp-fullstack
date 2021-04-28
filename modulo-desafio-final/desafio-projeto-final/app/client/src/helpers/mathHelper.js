function calculateSum(filteredTransactions) {
  const values = filteredTransactions.map((transaction) => transaction.value);
  const totalSum = values.reduce((acc, curr) => acc + curr, 0);
  return totalSum;
}

function totalMoney(sumIncome, sumExpenses) {
  return sumIncome - sumExpenses;
}

function filterTransactions(transactions) {}
