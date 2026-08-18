"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function TransactionChart({ transactions }) {
  const data = [];
  const monthlyData = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = date.toLocaleString("default", {
      month: "short",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    if (t.type === "income") {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += t.amount;
    }
  });

  Object.values(monthlyData).forEach((item) => data.push(item));

  const incomeColor = "#3b82f6";
  const expenseColor = "#f97316";

  return (
    <div className="w-full overflow-hidden">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="month"
            tick={{
              fill: "#ffffff",
              fontSize: 11,
            }}
          />

          <YAxis
            tickFormatter={(value) =>
              `₹${value.toLocaleString()}`
            }
            tick={{
              fill: "#ffffff",
              fontSize: 10,
            }}
            width={55}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              borderRadius: "5px",
              border: "1px solid #666",
            }}
            formatter={(value) =>
              `₹${value.toLocaleString()}`
            }
            itemStyle={{
              color: "#fff",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "#fff",
              backgroundColor: "#333",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          />

          <Bar
            dataKey="income"
            fill={incomeColor}
            radius={[5, 5, 0, 0]}
            animationDuration={500}
          >
            {data.map((entry, index) => (
              <Cell
                key={`income-cell-${index}`}
                fill={incomeColor}
              />
            ))}
          </Bar>

          <Bar
            dataKey="expense"
            fill={expenseColor}
            radius={[5, 5, 0, 0]}
            animationDuration={500}
          >
            {data.map((entry, index) => (
              <Cell
                key={`expense-cell-${index}`}
                fill={expenseColor}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}