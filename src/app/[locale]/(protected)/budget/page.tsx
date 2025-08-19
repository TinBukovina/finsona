import React from "react";

import { BudgetView } from "@/2_Pages";

export default function Page() {
  return (
    <div className="px-6 py-4 w-full min-w-0 flex flex-col gap-4 h-full">
      <BudgetView />
    </div>
  );
}
