export interface GoalInterface {
  id: string;
  wallet_id: string;
  name: string;
  current_amount: number;
  target_amount: number;
  start_date: Date;
  target_date: Date;
  active: boolean;
}
