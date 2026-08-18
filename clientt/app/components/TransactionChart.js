"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionChart = ({ transactions }) => {
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const incomeAmount = incomeTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const expenseAmount = expenseTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount ($)",
        data: [incomeAmount, expenseAmount],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Income vs Expense",
      },
    },
  };

  return (
    <div className="bg-white p-3 sm:p-4 shadow-md rounded-lg w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black">
        Income vs Expense
      </h2>

      <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;