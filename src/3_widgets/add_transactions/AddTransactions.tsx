import { AddTransactionsPopup } from "./AddTransactionPopup";
import { AddTransactionsComponent } from "./AddTransactionsComponent";

interface AddTransactionsPopup {
  onClose: () => void;
}

export function AddTransactions({ onClose }: AddTransactionsPopup) {
  return (
    <>
      <div className="min-w-[350px] sm:max-w-[450px] w-full sm:hidden xl:block">
        <AddTransactionsComponent onClose={onClose} />
      </div>
      <div className="hidden sm:block xl:hidden">
        <AddTransactionsPopup onClose={onClose} />
      </div>
    </>
  );
}
