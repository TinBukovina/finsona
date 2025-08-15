export function getBudgetDates() {
  const startDate = new Date();

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
