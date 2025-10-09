export function normalize(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }
  
  export function formatPhone(number: string): string {
    const digits = number.replace(/\D/g, ''); 
    if (digits.length === 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    } else if (digits.length === 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return number; 
  }

  export function sanitizeFileName(name: string) {
    return name
      .normalize("NFD") // remove acentuação
      .replace(/[^a-zA-Z0-9._-]/g, "_"); // só deixa letras, números, . _ e -
  }