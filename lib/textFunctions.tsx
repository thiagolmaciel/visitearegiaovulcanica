const states: Record<'MG' | 'SP', string> = {
    MG: 'Minas Gerais',
    SP: 'São Paulo',
};

export function abrevToName(abrev: string): string {
    return states[abrev as 'MG' | 'SP'] || '';
}

export function truncateString(str: string, maxLength = 25): string {
    if (str.length <= maxLength) return str;
    const sliced = str.slice(0, maxLength).trimEnd() + '...';
    return sliced;
  }
