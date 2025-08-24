export interface GoalInterface {
  id: string;
  wallet_id: string;
  name: string;
  target_amount: number;
  start_date: Date;
  target_date: Date;
  active: boolean;
}
