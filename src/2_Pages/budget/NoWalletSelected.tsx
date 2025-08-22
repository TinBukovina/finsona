import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { CreateWalletButton } from "@/4_features/create_wallet";

export function NoWalletSelected() {
  const t = useTranslations("no_wallet_page");

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center gap-3">
          <Image width={200} height={200} src="/imgs/wallet.png" alt="Wallet" />

          <p className="text-h6">{t("text")}</p>
        </div>

        <CreateWalletButton className="px-4 bg-primary text-primary-foreground fill-primary-foreground font-semibold hover:bg-primary/90 hover:fill-primary-foreground hover:scale-103">
          {t("button")}
        </CreateWalletButton>
      </div>
    </div>
  );
}
