/** GAME 5 — Tulis Ajaib (Magic Tracing). Tahap: 1 garisan & bentuk · 2 huruf besar berpandu · 3 huruf kecil berpandu · 4 titik sahaja · 5 tanpa panduan. */
import { useEffect, useMemo, useState } from 'react';
import { letterName, speak } from '../audio/audio';
import { SHAPES, SHAPE_ORDER } from '../data/strokes';
import { itemStatus } from '../services/learning';
import { TracingBoard, WritingSvg, type Guide } from './TracingBoard';
import { show, type GameProps } from './types';

const GUIDE: Guide[] = ['full', 'full', 'full', 'dots', 'none'];

export default function MagicTracing({ level, ctx }: GameProps) {
  const items = useMemo(() => {
    if (level === 1) {
      const fresh = SHAPE_ORDER.filter(k => itemStatus(ctx.data, 'W:shape:' + k) !== 'kuasai');
      return (fresh.length >= 3 ? fresh : SHAPE_ORDER).slice(0, 3).map(k => 'shape:' + k);
    }
    const f = ctx.focus.slice(0, 3);
    while (f.length < 3) f.push('aib'[f.length]);
    if (level === 2) return f.map(l => l.toUpperCase());
    if (level === 3) return f;
    return [f[0], f[1].toUpperCase(), f[2]];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [alive, setAlive] = useState<number[][][] | null>(null);
  const [medium, setMedium] = useState<'magic' | 'sand'>('magic');
  const item = items[i];
  const isShape = item.startsWith('shape:');
  const label = isShape ? SHAPES[item.slice(6)].name : show(item, item === item.toUpperCase());

  useEffect(() => {
    const ask = () => speak(isShape ? `Jom lukis ${label}! Mula dari titik ungu.` : `Jom tulis huruf ${letterName(item)}${item === item.toUpperCase() ? ' besar' : ' kecil'}!`);
    ctx.setRepeat(ask); ask(); ctx.question(); ctx.progress(i, items.length);
    setAlive(null);
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  const feedback = (k: 'wrong-dir' | 'retry' | 'demo' | 'assist' | 'good') => {
    if (k === 'wrong-dir') ctx.say('Cantik! Tapi mula dari titik ungu, ya.', 'thinking', true);
    if (k === 'retry') ctx.say('Hampir! Cuba ikut laluan sekali lagi.', 'thinking', true);
    if (k === 'demo') { ctx.hint('Tengok tangan ajaib tunjuk caranya!'); }
    if (k === 'assist') { ctx.hint('Jom kita tulis sama-sama!'); }
  };

  const done = (accuracy: number, strokes: number[][][], helped: number) => {
    ctx.answer('W:' + item, helped < 2, { hinted: helped > 0 });
    ctx.saveWriting(item, strokes, accuracy);
    setAlive(strokes);
    if (!isShape) speak(`Tengok! Huruf ${letterName(item)} dah hidup!`);
    setTimeout(() => { if (i + 1 >= items.length) ctx.finish(); else setI(x => x + 1); }, 2400);
  };

  return (
    <div className="g-trace">
      <div className="trace-top">
        <div className="trace-model">
          <span className="trace-model-label">{level === 5 ? 'Tulis tanpa panduan' : isShape ? 'Lukis' : 'Tulis'}</span>
          <span className={isShape ? 'trace-shape-name' : 'glyph glyph-lg'}>{label}</span>
        </div>
        <div className="medium-toggle" role="group" aria-label="Pilih medium">
          <button className={medium === 'magic' ? 'on' : ''} onClick={() => setMedium('magic')}>Cahaya</button>
          <button className={medium === 'sand' ? 'on' : ''} onClick={() => setMedium('sand')}>Pasir</button>
        </div>
      </div>
      <div className="trace-area">
        {alive
          ? <div className={`trace-alive ${medium}`}><WritingSvg strokes={alive} size={260} color={medium === 'sand' ? '#9B6BFF' : '#FFE27A'} alive /></div>
          : <TracingBoard key={item + medium} item={item} guide={GUIDE[level - 1]} medium={medium} onStrokeFeedback={feedback} onDone={done} />}
      </div>
    </div>
  );
}
