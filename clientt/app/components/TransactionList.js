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
    <div className="space-y-4">
      {finalList.map((transaction) => (
        <div
          key={transaction._id}
          className="p-4 rounded-xl shadow-md text-white bg-gradient-to-r from-gray-800 via-gray-900 to-black"
        >
          <p className="font-semibold">Type: <span className="font-normal">{transaction.type}</span></p>
          <p className="font-semibold">Amount: <span className="font-normal">${transaction.amount}</span></p>
          <p className="font-semibold">Category: <span className="font-normal">{transaction.category}</span></p>
          <p className="font-semibold">Transaction Date: <span className="font-normal">{new Date(transaction.date).toLocaleDateString()}</span></p>
          <p className="font-semibold">Description: <span className="font-normal">{transaction.description}</span></p>
          <p className="font-semibold">Date Added: <span className="font-normal">{new Date(transaction.createdAt).toLocaleString()}</span></p>
        </div>
      ))}
    </div>
  );
}
