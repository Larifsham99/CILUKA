import { describe, expect, it } from 'vitest';
import { letterName, normalizeSpeech, slug, soundCue } from './audio';

describe('Sebutan', () => {
  it('pecahan dibaca "daripada", bukan simbol', () => {
    expect(normalizeSpeech('Kenal 4 huruf: 2/4.')).toBe('Kenal 4 huruf 2 daripada 4.');
  });
  it('perkataan HURUF BESAR tidak dieja satu-satu', () => {
    expect(normalizeSpeech('Kita bina BOLA')).toBe('Kita bina bola');
  });
  it('elipsis dan emoji dibuang', () => {
    expect(normalizeSpeech('Ciluk... BA! 🐣')).toBe('Ciluk, ba!');
  });
  it('token huruf dikekalkan untuk disebut mengikut suara', () => {
    expect(normalizeSpeech(`Cari huruf ${letterName('B')}!`)).toBe('Cari huruf {b}!');
  });
  it('petunjuk bunyi ialah suku kata pertama (cara Bahasa Melayu)', () => {
    expect(soundCue('b')).toBe('bo');
    expect(soundCue('k')).toBe('ku');
    expect(soundCue('a')).toBe('a');
  });
  it('kunci rakaman', () => {
    expect(slug('Hebat! Kamu berjaya!')).toBe('hebat-kamu-berjaya');
  });
});
