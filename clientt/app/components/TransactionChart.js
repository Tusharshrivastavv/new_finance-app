"use client"
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionChart = ({ transactions }) => {
  const incomeTransactions = transactions.filter(transaction => transaction.type === 'income');
  const expenseTransactions = transactions.filter(transaction => transaction.type === 'expense');

  const incomeAmount = incomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const expenseAmount = expenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [incomeAmount, expenseAmount],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Income vs Expense',
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Income vs Expense</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionChart;
