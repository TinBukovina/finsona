import React, { Suspense } from "react";
import { cookies } from "next/headers";

import { WALLET_ID_COOKIE_KEY } from "@/1_app";
import { NoBudgetPage, NoWalletSelected, SomethingWentWrong } from "@/2_Pages";
import { BudgetInterface } from "@/5_entities";
import { SpinnerLoader } from "@/6_shared";
import { BudgetClientView } from "@/2_Pages/budget/BudgetClientView";

async function getBudgetsForWallet(
  walletId: string,
  cookie: string
): Promise<BudgetInterface[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/wallets/${walletId}/budgets`,
    {
      headers: {
        Cookie: cookie,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Faile to fetch budgets");
  }

  const data = await res.json();
  return data.budgets;
}

export default async function Page() {
  const cookieStore = await cookies();
  const activeWalletId = cookieStore.get(WALLET_ID_COOKIE_KEY)?.value;

  if (!activeWalletId) {
    return <NoWalletSelected />;
  }

  return (
    <div className="px-6 py-4 w-full min-w-0 flex flex-col gap-4 h-full">
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-full ">
            <SpinnerLoader />
          </div>
        }
      >
        <BudgetLoader
          activeWalletId={activeWalletId}
          cookie={cookieStore.toString()}
        />
      </Suspense>
    </div>
  );
}

async function BudgetLoader({
  activeWalletId,
  cookie,
}: {
  activeWalletId: string;
  cookie: string;
}) {
  try {
    const budgets = await getBudgetsForWallet(activeWalletId, cookie);

    if (!budgets || budgets.length === 0) {
      return <NoBudgetPage />;
    }

    // Main Content
    return <BudgetClientView initialBudgets={budgets} />;
  } catch (error) {
    console.log(error);
    return <SomethingWentWrong />;
  }
}
