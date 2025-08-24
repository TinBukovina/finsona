import { AddTransactionsPopup } from "./AddTransactionPopup";
import { AddTransactionsComponent } from "./AddTransactionsComponent";

interface AddTransactionsPopup {
  onClose: () => void;
}

export function AddTransactions({ onClose }: AddTransactionsPopup) {
  return (
    <>
      <div className="min-w-[450px] hidden xl:block">
        <AddTransactionsComponent onClose={onClose} />
      </div>
      <div className="xl:hidden">
        <AddTransactionsPopup onClose={onClose} />
      </div>
    </>
  );
}
