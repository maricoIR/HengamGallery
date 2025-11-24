export const formatPrice = (price: number): string => {
  const formattedNumber = new Intl.NumberFormat("fa-IR").format(price);
  return `${formattedNumber} ریال`;
};

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("fa-IR").format(number);
};

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatDiscount = (discount: number): string => {
  return `${discount}% تخفیف`;
};
