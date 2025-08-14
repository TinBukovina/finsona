export interface WalletInterface {
  id: string;
  owner_id: string;
  name: string;
  initial_balance: number;
  active_budget_id?: string;
  active_goal_id?: string;
  type?: string;
  created_at: Date;
}

export interface GetWalletsFromAPI {
  wallets: WalletInterface[];
  message: string;
}
