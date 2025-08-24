import React from "react";

import { TransactionPageClientView } from "@/2_Pages";

export default function page() {
  return (
    <div className="flex flex-col gap-6 w-full h-full px-6 py-4">
      {/*TITLE*/}
      <h4 className="text-h4 font-bold">Transaction page</h4>

      <TransactionPageClientView />
    </div>
  );
}
