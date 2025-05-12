import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { addTransaction } from '../utils/api';

export default function TransactionForm({ token, onAdd }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); 

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const image = reader.result;

      try {
        const result = await Tesseract.recognize(image, 'eng');
        const text = result.data.text;

        const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
        const foundAmount = lines.find(line => line.match(/\d+(\.\d{2})?/));
        const foundDate = lines.find(line => line.match(/\d{4}[-\/]\d{2}[-\/]\d{2}/));
        const foundCategory = lines.find(line =>
          /(grocery|food|travel|rent|shopping|bill|medicine|fuel|restaurant|hotel|bus|train|electricity)/i.test(line)
        );

        setTimeout(() => {
          setFormData((prev) => ({
            ...prev,
            amount: foundAmount ? foundAmount.match(/\d+(\.\d{2})?/)[0] : '',
            date: foundDate ? foundDate.match(/\d{4}[-\/]\d{2}[-\/]\d{2}/)[0] : '',
            description: text.slice(0, 100),
            category: foundCategory ? foundCategory.split(' ')[0] : ''
          }));
          setLoading(false);
          fileInputRef.current.value = '';
        }, 3000);
      } catch (error) {
        console.error('Tesseract error:', error);
        setLoading(false);
        fileInputRef.current.value = ''; 
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTransaction(formData, token);
      onAdd(response.data.transaction);
      setFormData({ type: 'expense', amount: '', category: '', date: '', description: '' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-lg space-y-4 text-white">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      {loading && <p className="text-yellow-300">Extracting text from image...</p>}

      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        className="w-full p-2 rounded bg-gray-700 text-white"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        className="w-full p-2 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full p-2 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full p-2 rounded bg-gray-700 text-white"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold p-2 rounded hover:bg-indigo-500 transition duration-300"
      >
        Add Transaction
      </button>
    </form>
  );
}
