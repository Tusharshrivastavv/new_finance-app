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

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchEMIs = async () => {
    try {
      if (!backendUrl) {
        throw new Error("Backend URL is not configured.");
      }

      if (!token) {
        throw new Error("User not authenticated.");
      }

      const response = await fetch(`${backendUrl}/api/emi`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.error ||
            errorData.message ||
            `Failed to fetch EMIs (${response.status})`
        );
      }

      const data = await response.json();

      if (data.success) {
        setEmis(data.emis || []);
        setError("");
      } else {
        setError(data.message || "Could not fetch EMI data.");
      }
    } catch (err) {
      console.error("Fetch EMI Error:", err);
      setError(err.message || "Failed to load EMIs.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchEMIs();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("User not authenticated!");
      return;
    }

    if (!backendUrl) {
      setError("Backend URL is not configured.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/emi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          emiDate,
          monthlyPayment,
          emiName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.error ||
            errorData.message ||
            `Something went wrong (${response.status})`
        );
      }

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message || "Failed to add EMI.");
      }

      setSuccess("EMI added successfully!");

      setAmount("");
      setEmiDate("");
      setMonthlyPayment("");
      setEmiName("");

      await fetchEMIs();
    } catch (error) {
      console.error("Add EMI Error:", error);
      setError(error.message || "Failed to add EMI.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EMINAV />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-2 sm:mt-6">

          <div className="lg:w-2/5 w-full border border-gray-700 p-4 sm:p-6 rounded-lg shadow-md bg-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Add EMI
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">
                  EMI Name
                </label>

                <input
                  type="text"
                  value={emiName}
                  onChange={(e) => setEmiName(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">
                  Amount
                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">
                  Monthly Payment
                </label>

                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">
                  EMI Start Date
                </label>

                <input
                  type="date"
                  value={emiDate}
                  onChange={(e) => setEmiDate(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded transition duration-300"
              >
                Submit
              </button>
            </form>

            {error && (
              <p className="text-red-400 mt-3 text-sm sm:text-base break-words">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-400 mt-3 text-sm sm:text-base break-words">
                {success}
              </p>
            )}
          </div>

          {emis.length > 0 && (
            <div className="lg:w-3/5 w-full border border-gray-700 p-4 sm:p-6 rounded-lg shadow-md bg-gray-800">

              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Your EMIs
              </h2>

              <ul className="space-y-3 sm:space-y-4">
                {emis.map((emi) => (
                  <li
                    key={emi._id}
                    className="bg-gray-700 p-4 sm:p-5 rounded-lg border border-gray-600 overflow-hidden"
                  >
                    <div className="space-y-2 text-sm sm:text-base">

                      <p className="break-words">
                        <span className="font-semibold">
                          EMI Name:
                        </span>{" "}
                        {emi.emiName}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Total Amount:
                        </span>{" "}
                        ₹{emi.amount}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Monthly Payment:
                        </span>{" "}
                        ₹{emi.monthlyPayment}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Remaining:
                        </span>{" "}
                        ₹{emi.remainingAmount}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Start Date:
                        </span>{" "}
                        {new Date(
                          emi.emiDate
                        ).toLocaleDateString()}
                      </p>

                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EMI;