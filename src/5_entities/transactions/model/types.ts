export interface TransactionInterface {
  id: string;
  wallet_id: string;
  budget_item_id: string;
  type: "expense" | "income";
  amount: "string";
  transaction_date: Date;
  description: string;
}

export interface CreateTransactionInterface {
  message: string;
  transaction: TransactionInterface;
}
