export type AllowedWalletTypes = "personal" | "business" | "savings";

export interface WalletInterface {
  id: string;
  owner_id: string;
  type: AllowedWalletTypes;
  name: string;
  initial_balance: number;
  active_budget_id?: string;
  active_goal_id?: string;
  created_at: Date;
}

export interface GetWalletsResponse {
  message: string;
  wallets: WalletInterface[];
}

export interface CreateWalletResponse {
  message: string;
  wallet: WalletInterface;
}
