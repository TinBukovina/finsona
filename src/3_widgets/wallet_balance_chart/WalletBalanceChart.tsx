"use client";

import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  month: string;
  [key: string]: any;
}

interface WalletBalanceChartProps {
  serverData: ChartData[];
  walletNames: string[];
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export function WalletBalanceChart({
  serverData,
  walletNames,
}: WalletBalanceChartProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 pt-14 pr-14 shadow-sm h-full flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={serverData}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <XAxis
            dataKey="month"
            stroke="rgba(255, 255, 255, 0.5)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.5)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20, 20, 20, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "0.5rem",
            }}
            cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
          />
          <Legend wrapperStyle={{ fontSize: "14px", paddingTop: "20px" }} />

          {walletNames.map((walletName, index) => (
            <Line
              key={walletName}
              type="monotone"
              dataKey={walletName}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
