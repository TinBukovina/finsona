export function getBudgetDates(startDay: number, targetMonth?: number | null) {
  const now = new Date();
  const currentYear = now.getFullYear();

  const calculateMonth = targetMonth ? targetMonth : now.getMonth();

  const startDate = new Date(currentYear, calculateMonth, startDay);

  if (startDate.getMonth() !== calculateMonth) {
    startDate.setDate(1);
  }

  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  if (startDate.getDate() !== endDate.getDate()) {
    endDate.setDate(0);
  }

  return {
    startDate,
    endDate,
  };
}
