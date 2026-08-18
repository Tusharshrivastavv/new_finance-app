export default function TransactionList({ transactions }) {
  const today = new Date().toISOString().slice(0, 10);

  const todayTransactions = [];
  const otherTransactions = [];

  transactions.forEach((txn) => {
    const txnDate = new Date(txn.createdAt).toISOString().slice(0, 10);

    if (txnDate === today) {
      todayTransactions.push(txn);
    } else {
      otherTransactions.push(txn);
    }
  });

  const finalList = [...todayTransactions.reverse(), ...otherTransactions];

  return (
    <div className="space-y-3 sm:space-y-4 w-full">
      {finalList.map((transaction) => (
        <div
          key={transaction._id}
          className="w-full p-4 sm:p-5 rounded-xl shadow-md text-white bg-gradient-to-r from-gray-800 via-gray-900 to-black overflow-hidden"
        >
          <p className="font-semibold text-sm sm:text-base break-words">
            Type:{" "}
            <span className="font-normal">
              {transaction.type}
            </span>
          </p>

          <p className="font-semibold text-sm sm:text-base break-words">
            Amount:{" "}
            <span className="font-normal">
              ${transaction.amount}
            </span>
          </p>

          <p className="font-semibold text-sm sm:text-base break-words">
            Category:{" "}
            <span className="font-normal">
              {transaction.category}
            </span>
          </p>

          <p className="font-semibold text-sm sm:text-base break-words">
            Transaction Date:{" "}
            <span className="font-normal">
              {new Date(transaction.date).toLocaleDateString()}
            </span>
          </p>

          <p className="font-semibold text-sm sm:text-base break-words">
            Description:{" "}
            <span className="font-normal">
              {transaction.description}
            </span>
          </p>

          <p className="font-semibold text-sm sm:text-base break-words">
            Date Added:{" "}
            <span className="font-normal">
              {new Date(transaction.createdAt).toLocaleString()}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}