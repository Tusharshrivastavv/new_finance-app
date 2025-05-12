"use client";
import { useEffect, useState } from "react";
import Navbarr from "../components/Navbarr";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionChart from "../components/TransactionChart";
import Chatbot from "../components/Chatbot";

export default function FamilyDashboard() {
  const [familyTransactions, setFamilyTransactions] = useState([]);
  const [token, setToken] = useState("");
  const [totalSavings, setTotalSavings] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [currentMonth] = useState(new Date().getMonth());
  const [monthlyFamilyTotal, setMonthlyFamilyTotal] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchFamilyTransactions(storedToken);
    }
  }, []);

  const fetchFamilyTransactions = async (tk) => {
    try {
      const response = await fetch("https://your-api-url.com/family-transactions", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${tk}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch family transactions");
      }

      const data = await response.json();
      const txns = data.transactions;
      setFamilyTransactions(txns);
      recalculateFamily(txns);
    } catch (err) {
      console.error(err);
    }
  };

  const recalculateFamily = (txns) => {
    let totalSum = 0;
    let monthlySum = 0;

    txns.forEach((t) => {
      const value = t.type === "income" ? t.amount : -t.amount;
      const transactionDate = new Date(t.date);
      totalSum += value;

      if (transactionDate.getMonth() === currentMonth) {
        monthlySum += value;
      }
    });

    setTotalSavings(totalSum);
    setMonthlyFamilyTotal(monthlySum);

    if (monthlySum > 0) setAlertMessage("💰 Positive Family Balance!");
    else if (monthlySum < 0) setAlertMessage("⚠️ Negative Family Balance!");
    setShowAlert(true);
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <Navbarr />
      <div className="container mx-auto p-4 flex-grow flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Family Dashboard</h1>

        {showAlert && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">{alertMessage}</div>
        )}

        <div className="flex flex-col md:flex-row gap-4 flex-grow">
          <div className="md:w-1/3 bg-gray-800 p-4 rounded shadow">
            <TransactionForm
              token={token}
              onAdd={(newTxn) => {
                const updated = [...familyTransactions, newTxn];
                setFamilyTransactions(updated);
                recalculateFamily(updated);
              }}
            />
          </div>

          <div className="md:w-2/3 flex flex-col">
            <div className="flex gap-4 mb-4">
              <SummaryCard title="Family Total Balance" amount={totalSavings} />
              <SummaryCard title="Monthly Family Balance" amount={monthlyFamilyTotal} />
            </div>

            <div className="overflow-auto bg-gray-800 p-4 rounded shadow mb-4 flex-1 max-h-96">
              <TransactionList transactions={familyTransactions} />
            </div>

            <Chatbot />

            <div className="bg-gray-800 p-4 rounded shadow mt-4">
              <TransactionChart transactions={familyTransactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, amount }) {
  return (
    <div className="flex-1 bg-gray-800 p-6 rounded text-center">
      <h2 className="text-2xl">{title}</h2>
      <p className={`text-3xl ${amount >= 0 ? "text-green-600" : "text-red-600"}`}>
        ₹{amount.toFixed(2)}
      </p>
    </div>
  );
}
