import React from "react";

import { CurrencyCard, NumberFormatCard, PaycheckCard } from "@/3_widgets";

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      {/*CURRENCY SETTINGS CARD*/}
      <CurrencyCard />
      {/*PAYCHECK START SETTINGS CARD*/}
      <PaycheckCard />
      {/*NUMBER FORMAT SETTINGS CARD*/}
      <NumberFormatCard />
    </div>
  );
}
