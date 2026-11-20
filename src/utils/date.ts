/** Tarikh mengikut waktu Malaysia (Asia/Kuala_Lumpur), format YYYY-MM-DD. */
export function todayKL(d: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  } catch {
    const k = new Date(d.getTime() + 8 * 3600000);
    return k.toISOString().slice(0, 10);
  }
}

export function hourKL(d: Date = new Date()): number {
  try {
    return Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', hour: '2-digit', hourCycle: 'h23' }).format(d));
  } catch { return (d.getUTCHours() + 8) % 24; }
}

export function lastNDays(n: number, from: Date = new Date()): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) out.push(todayKL(new Date(from.getTime() - i * 86400000)));
  return out;
}

export const fmtDate = (t: number) => new Date(t).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' });

export function shuffle<T>(a: T[]): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
