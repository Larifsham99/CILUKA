import { Pip } from '../characters/Pip';
import type { PipMood } from '../data/types';

/** Pip dengan gelembung cakap — sentiasa memaparkan teks supaya berfungsi walaupun tanpa suara. */
export function PipGuide({ mood, text, size = 84, className = '', onPip }: { mood: PipMood; text: string; size?: number; className?: string; onPip?: () => void }) {
  return (
    <div className={`pip-guide ${className}`}>
      <button className="pip-guide-btn" onClick={onPip} aria-label="Pip" tabIndex={onPip ? 0 : -1}>
        <Pip mood={mood} size={size} />
      </button>
      {text && <div className="pip-bubble" role="status" aria-live="polite" key={text}>{text}</div>}
    </div>
  );
}
