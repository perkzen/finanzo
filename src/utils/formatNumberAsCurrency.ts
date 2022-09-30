export const formatNumberAsCurrency = (number?: number): string => {
  if (!number) return '0,00 €';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(number);
};
