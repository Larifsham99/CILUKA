/** Tangkap acara pemasangan PWA (Android Chrome). */
interface BIPEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }
let deferred: BIPEvent | null = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e as BIPEvent; });
  window.addEventListener('appinstalled', () => { deferred = null; });
}

export const installAvailable = () => !!deferred;
export async function promptInstall() {
  if (!deferred) return false;
  await deferred.prompt();
  const r = await deferred.userChoice;
  deferred = null;
  return r.outcome === 'accepted';
}
