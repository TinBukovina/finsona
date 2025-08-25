import React from "react";

import { TransactionPageClientView } from "@/2_Pages";

export default function page() {
  return (
    <div className=" flex flex-col gap-6 w-full h-full p-3 sm:px-6 sm:py-4 scrollbar-none sm:mb-0">
      {/*TITLE*/}
      <h4 className="hidden sm:block text-h4 font-bold">Transaction page</h4>

      <TransactionPageClientView />
    </div>
  );
}
