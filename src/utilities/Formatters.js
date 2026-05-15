export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS', 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};