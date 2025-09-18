export const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

export const dateMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  
  if (value.length <= 2) {
    return value;
  }
  if (value.length <= 4) {
    return value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
  }
  return value.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
};

//formatação de telefone 
//1° : 00 12345678
//2° : 00 1234-5678