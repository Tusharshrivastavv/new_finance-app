import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request) {
  const body = await request.json();
  const transactions = body.transactions || [];

  const pyPath = path.join(process.cwd(), 'app', 'machine', 'predict.py');

  return new Promise((resolve) => {
    const py = spawn('python', [pyPath]);
    let output = '';

    py.stdin.write(JSON.stringify(transactions));
    py.stdin.end();

    py.stdout.on('data', (data) => output += data.toString());

    py.on('close', () => {
      try {
        const result = JSON.parse(output);
        resolve(NextResponse.json(result));
      } catch {
        resolve(NextResponse.json({ error: 'Prediction failed' }, { status: 500 }));
      }
    });
  });
}
