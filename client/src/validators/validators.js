export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  const phoneRegex = /^\d{10,11}$/;
  return phoneRegex.test(cleanPhone);
}