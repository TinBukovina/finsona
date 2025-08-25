import React from "react";
import { cookies } from "next/headers";

import { GoalsWidget, TopExpenses, WalletBalanceChart } from "@/3_widgets";
import {
  BudgetItemInterface,
  TransactionInterface,
  WalletInterface,
} from "@/5_entities";
import { format, startOfYear } from "date-fns";

async function getWallets(cookie: string): Promise<WalletInterface[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wallets`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("Error fetching wallets.");
    console.log(errorData);
    return [];
  }

  const data = await res.json();
  return data.wallets;
}

async function getTransactions(
  cookie: string
): Promise<TransactionInterface[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
    { headers: { Cookie: cookie }, cache: "no-store" }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log("Error fetching transactions.");
    console.log(errorData);
    return [];
  }

  const data = await res.json();
  return data.transactions;
}

function processDataForChart(
  transactions: TransactionInterface[],
  wallets: WalletInterface[]
) {
  const monthlyData: { [key: string]: { [key: string]: number } } = {};
  const walletMap = new Map(wallets.map((w) => [w.id, w.name]));
  const startDate = startOfYear(new Date());
  const endDate = new Date();

  for (let d = startDate; d <= endDate; d.setMonth(d.getMonth() + 1)) {
    const monthKey = format(d, "MMM");
    monthlyData[monthKey] = {};
    wallets.forEach((w) => {
      monthlyData[monthKey][w.name] = 0;
    });
  }

  for (const tr of transactions) {
    const transactionDate = new Date(tr.transaction_date);
    const monthKey = format(transactionDate, "MMM");
    const walletName = tr.wallet_id ? walletMap.get(tr.wallet_id) : undefined;

    if (walletName && monthlyData[monthKey]) {
      const amount = tr.type === "income" ? tr.amount : -tr.amount;
      monthlyData[monthKey][walletName] += Number(amount);
    }
  }

  return Object.keys(monthlyData).map((month) => ({
    month,
    ...monthlyData[month],
  }));
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  const [wallets, transactions] = await Promise.all([
    getWallets(cookie),
    getTransactions(cookie),
  ]);

  console.log(wallets, transactions);

  const chartData = processDataForChart(transactions, wallets);

  return (
    <div className="w-full h-full px-4 py-4 flex flex-col gap-4 lg:flex-row overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-transparent">
      <div className="flex-3 flex flex-col gap-4">
        <WalletBalanceChart
          serverData={chartData}
          walletNames={wallets.map((w) => w.name)}
        />
        <TopExpenses />
      </div>

      <div className="flex-2 lg:col-span-2">
        <GoalsWidget />
      </div>
    </div>
  );
}
