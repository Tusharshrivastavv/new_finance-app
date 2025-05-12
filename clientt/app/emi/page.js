"use client";
import { useEffect, useState } from "react";
import EMINAV from "../components/EmiNav";

const EMI = () => {
  const [amount, setAmount] = useState("");
  const [emiDate, setEmiDate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [emiName, setEmiName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emis, setEmis] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchEMIs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/emi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setEmis(data.emis);
      } else {
        setError("Could not fetch EMI data.");
      }
    } catch (err) {
      setError("Failed to load EMIs.");
    }
  };

  useEffect(() => {
    if (token) fetchEMIs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("User not authenticated!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/emi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, emiDate, monthlyPayment, emiName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      setSuccess("EMI added successfully!");
      setAmount("");
      setEmiDate("");
      setMonthlyPayment("");
      setEmiName("");
      fetchEMIs();
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <EMINAV />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="lg:w-2/5 w-full border border-gray-700 p-6 rounded-lg shadow-md bg-gray-800">
          <h2 className="text-xl font-bold mb-4">Add EMI</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium">EMI Name</label>
              <input
                type="text"
                value={emiName}
                onChange={(e) => setEmiName(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Monthly Payment</label>
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">EMI Start Date</label>
              <input
                type="date"
                value={emiDate}
                onChange={(e) => setEmiDate(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Submit
            </button>
          </form>
          {error && <p className="text-red-400 mt-3">{error}</p>}
          {success && <p className="text-green-400 mt-3">{success}</p>}
        </div>
        {emis.length > 0 && (
          <div className="lg:w-3/5 w-full border border-gray-700 p-6 rounded-lg shadow-md bg-gray-800">
            <h2 className="text-xl font-bold mb-4">Your EMIs</h2>
            <ul className="space-y-4">
              {emis.map((emi) => (
                <li
                  key={emi._id}
                  className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                >
                  <p><span className="font-semibold">EMI Name:</span> {emi.emiName}</p>
                  <p><span className="font-semibold">Total Amount:</span> ₹{emi.amount}</p>
                  <p><span className="font-semibold">Monthly Payment:</span> ₹{emi.monthlyPayment}</p>
                  <p><span className="font-semibold">Remaining:</span> ₹{emi.remainingAmount}</p>
                  <p><span className="font-semibold">Start Date:</span> {new Date(emi.emiDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMI;
