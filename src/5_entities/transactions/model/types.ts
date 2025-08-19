export interface TransactionInterface {
  wallet_id: string;
  budget_item_id: string;
  type: "expense" | "income";
  amount: "string";
  transaction_date: Date;
  name: string;
}

export interface CreateTransactionInterface {
  message: string;
  transaction: TransactionInterface;
}
