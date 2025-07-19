
export const generateWhatsAppLink = (phoneNumber: string, message?: string) => {
  // Remove any non-numeric characters and ensure it starts with country code
  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  
  // If number starts with 0, replace with 27 (South Africa)
  const formattedNumber = cleanNumber.startsWith('0') 
    ? '27' + cleanNumber.slice(1)
    : cleanNumber.startsWith('27') 
    ? cleanNumber
    : '27' + cleanNumber;

  const encodedMessage = message ? encodeURIComponent(message) : '';
  
  return `https://wa.me/${formattedNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
};

export const openWhatsApp = (phoneNumber: string, message?: string) => {
  const link = generateWhatsAppLink(phoneNumber, message);
  window.open(link, '_blank');
};

export const generateCarInquiryMessage = (car: any, dealership: any) => {
  return `Hi ${dealership.name}, I'm interested in the ${car.year} ${car.make} ${car.model} listed for ${new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
  }).format(car.price)}. Could you please provide more information?`;
};
