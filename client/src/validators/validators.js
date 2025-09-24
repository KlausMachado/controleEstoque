export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  const cleanPhone = phone.replace(/\D/g, '');  // remove tudo, deixando apenas números
  const phoneRegex = /^\d{10,11}$/;  // Verifica se tem 10 ou 11 dígitos
  return phoneRegex.test(cleanPhone);  // Valida o número limpo
}


export function formatPhone(phone) {
  const clean = phone.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;  // Formato para números com 11 dígitos
  }
  if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;  // Formato para números com 10 dígitos
  }
  return phone;  // Se não for 10 ou 11, retorna o telefone como está
}


export function cleanPhone(phone) {
  return phone.replace(/\D/g, '');
}

