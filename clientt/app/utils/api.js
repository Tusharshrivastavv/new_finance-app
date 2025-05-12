import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = async (data) => {
  return axios.post(`${API_URL}/auth/signup`, data);
};

export const login = async (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};
export const loginn = async (data) => {
  return axios.post(`${API_URL}/auth/loginn`, data);
};

export const addTransaction = async (data, token) => {
  return axios.post(`${API_URL}/transactions`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTransactions = async (token) => {
  return axios.get(`${API_URL}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const uploadReceipt = async (data, token) => {
  return axios.post(`${API_URL}/receipts/upload`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};