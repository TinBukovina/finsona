import { cookies } from "next/headers";

import { WALLET_ID_COOKIE_KEY } from "@/1_app";
import { WalletInterface } from "@/5_entities";
import { SelectActiveWalletClient } from "./SelectActiveWalletClient";

async function getWallets(cookie: string): Promise<WalletInterface[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wallets`, {
    headers: {
      Cookie: cookie,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Faild to fetch wallets for dropdown.");
    return [];
  }

  const data = await res.json();
  return data.wallets;
}

export async function SelectActiveWalletServer() {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  const wallets = await getWallets(cookie);

  if (!wallets || wallets.length <= 0) {
    return null;
  }

  let selectedWalletId = cookieStore.get(WALLET_ID_COOKIE_KEY)?.value;

  if (!selectedWalletId) {
    selectedWalletId = wallets[0].id;
  }

  const selectedWallet =
    wallets.find((w) => w.id === selectedWalletId) || wallets[0];

  return (
    <SelectActiveWalletClient
      initialWallets={wallets}
      initialSelectedWallet={selectedWallet}
    />
  );
}
