"use client";

import { useEffect, useState } from "react";
import Navbarr from "../components/Navbarr";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionChart from "../components/TransactionChart";
import { getTransactions } from "../utils/api";
import Chatbot from "../components/Chatbot";

// export const dynamic = "force-dynamic";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState("");
  const [total, setTotal] = useState(0);
  const [savings, setSavings] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [currentMonth] = useState(new Date().getMonth());
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [incomePrediction, setIncomePrediction] = useState(null);
  const [expensePrediction, setExpensePrediction] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      fetchTransactions(storedToken);
    }
  }, []);

  const fetchTransactions = async (tk) => {
    try {
      const resp = await getTransactions(tk);
      const txns = resp.data.transactions;

      setTransactions(txns);
      recalculate(txns);
    } catch (err) {
      console.error(err);
    }
  };

  const recalculate = (txns) => {
    let totalSum = 0;
    let monthlySum = 0;
    const categoryMap = {};

    txns.sort((a, b) => new Date(a.date) - new Date(b.date));

    txns.forEach((t) => {
      const value = t.type === "income" ? t.amount : -t.amount;
      const transactionDate = new Date(t.date);

      totalSum += value;

      if (transactionDate.getMonth() === currentMonth) {
        monthlySum += value;
      }

      const category = t.category || "Other";

      if (!categoryMap[category]) {
        categoryMap[category] = 0;
      }

      categoryMap[category] += value;
    });

    setTotal(totalSum);
    setMonthlyTotal(monthlySum);
    setCategoryTotals(categoryMap);

    if (monthlySum > 0) {
      setSavings((prev) => prev + monthlySum);
    }

    if (totalSum < 0) {
      setAlertMessage("⚠️ Negative balance!");
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  };

  const handlePredict = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    const today = now.getDate();

    let currentIncome = 0;
    let currentExpense = 0;

    transactions.forEach((t) => {
      const date = new Date(t.date);

      if (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      ) {
        if (t.type === "income") {
          currentIncome += t.amount;
        } else {
          currentExpense += t.amount;
        }
      }
    });

    const incomePrediction = (currentIncome / today) * daysInMonth;
    const expensePrediction = (currentExpense / today) * daysInMonth;

    setTimeout(() => {
      setIncomePrediction(incomePrediction);
      setExpensePrediction(expensePrediction);
      setShowPrediction(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      <Navbarr />

      <div className="container mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 flex-grow">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Dashboard
        </h1>

        {showAlert && (
          <div className="bg-red-500 text-white p-3 sm:p-4 rounded mb-4 text-sm sm:text-base">
            {alertMessage}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/3 bg-gray-800 p-4 rounded shadow">
            <TransactionForm
              token={token}
              onAdd={(newTxn) => {
                const updated = [...transactions, newTxn];
                setTransactions(updated);
                recalculate(updated);
              }}
            />
          </div>

          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <SummaryCard title="Total Balance" amount={total} />
              <SummaryCard title="Total Savings" amount={savings} />
            </div>

            <div className="flex justify-center sm:justify-end mb-4">
              <button
                onClick={handlePredict}
                className="w-full sm:w-auto px-5 py-3 bg-yellow-500 text-black rounded-full font-semibold text-sm hover:bg-yellow-400 transition"
              >
                Analyze Transactions
              </button>
            </div>

            <div className="bg-gray-800 p-3 sm:p-4 rounded shadow mb-4 overflow-x-auto">
              <div className="min-w-0">
                <TransactionList transactions={transactions} />
              </div>
            </div>

            <Chatbot />

            <div className="bg-gray-800 p-3 sm:p-4 rounded shadow mt-4 overflow-hidden">
              <div className="w-full overflow-x-auto">
                <TransactionChart transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPrediction && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 w-full max-w-md p-5 sm:p-6 rounded shadow-xl relative">
            <button
              onClick={() => setShowPrediction(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
            >
              ✖
            </button>

            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
              📊 Prediction Result
            </h2>

            {incomePrediction !== null &&
            expensePrediction !== null ? (
              <div>
                <p className="text-xl sm:text-2xl text-center text-green-600 break-words">
                  Income Prediction: ₹{incomePrediction.toFixed(2)}
                </p>

                <p className="text-xl sm:text-2xl text-center text-red-600 mt-3 break-words">
                  Expense Prediction: ₹{expensePrediction.toFixed(2)}
                </p>

                <p className="text-2xl sm:text-3xl text-center text-white mt-5 break-words">
                  Total Predicted: ₹
                  {parseInt(
                    incomePrediction - expensePrediction
                  )}
                </p>
              </div>
            ) : (
              <p className="text-red-600 text-center">
                ❌ Not enough data to predict.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, amount }) {
  return (
    <div className="w-full bg-gray-800 p-5 sm:p-6 rounded text-center">
      <h2 className="text-xl sm:text-2xl">{title}</h2>

      <p
        className={`text-2xl sm:text-3xl break-words ${
          amount >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        ₹{amount.toFixed(2)}
      </p>
    </div>
  );
}