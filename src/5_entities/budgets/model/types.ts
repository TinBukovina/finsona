export interface BudgetInterface {
  id: string;
  wallet_id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
}

export interface GetBudgetsResponse {
  message: string;
  budgets: BudgetInterface[];
}

export interface CreateBudgetResponse {
  message: string;
  newBudget: BudgetInterface;
}
