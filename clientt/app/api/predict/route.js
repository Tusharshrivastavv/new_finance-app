import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const transactions = body.transactions || [];

  // Same logic predict.py was running — just count transactions.
  // Replace this with real prediction logic whenever the model is ready.
  const result = { prediction: 'success', count: transactions.length };

  return NextResponse.json(result);
}