import { beforeEach, describe, expect, it } from 'vitest';
import { blankProfileData, exportAll, importAll, loadIndex, loadProfileData, sanitizeProfileData, saveIndex, saveProfileData } from '../storage/storage';
import { confusedWith, distractors, focusLetters, recordAnswer, statusOf } from './learning';
import { levelUnlock, recommendedLevel, totalStars, worldUnlock } from './levels';
import { ensureDaily, markMissionStep } from './missions';
import { completeGame, openChest, starsFor } from './rewards';
import { DEFAULT_SETTINGS } from '../storage/storage';

describe('Kompas Pip — penguasaan', () => {
  it('tidak mendakwa penguasaan berdasarkan satu jawapan', () => {
    const d = blankProfileData();
    recordAnswer(d, 'L:a', true, { game: 'letter-hunt', ms: 1000 });
    expect(statusOf(d.items['L:a'])).toBe('belajar');
  });
  it('menguasai selepas banyak jawapan betul dalam 2 jenis permainan', () => {
    const d = blankProfileData();
    for (let i = 0; i < 4; i++) recordAnswer(d, 'L:a', true, { game: 'letter-hunt', ms: 1000 });
    for (let i = 0; i < 4; i++) recordAnswer(d, 'L:a', true, { game: 'letter-match', ms: 1000 });
    expect(statusOf(d.items['L:a'])).toBe('kuasai');
  });
  it('perlu latihan apabila kerap salah', () => {
    const d = blankProfileData();
    for (let i = 0; i < 5; i++) recordAnswer(d, 'L:m', false, { game: 'letter-hunt', chosen: 'n' });
    expect(statusOf(d.items['L:m'])).toBe('perlu-latihan');
  });
  it('mengesan pasangan keliru M–N dan memasukkannya sebagai pengganggu & fokus', () => {
    const d = blankProfileData();
    recordAnswer(d, 'L:m', false, { game: 'letter-hunt', chosen: 'n' });
    recordAnswer(d, 'L:m', false, { game: 'sound-hunt', chosen: 'n' });
    expect(confusedWith(d, 'L:m')).toEqual(['n']);
    expect(distractors(d, 'm', 2, 1, ['a', 'i', 'u', 'm', 'n'])[0]).toBe('n');
    expect(focusLetters(d, 5, 3, 'L:', ['a', 'i', 'u', 'm', 'n'])[0]).toBe('m');
  });
  it('membuang tanda keliru selepas 4 betul berturut-turut', () => {
    const d = blankProfileData();
    recordAnswer(d, 'L:b', false, { game: 'g', chosen: 'd' });
    recordAnswer(d, 'L:b', false, { game: 'g', chosen: 'd' });
    for (let i = 0; i < 4; i++) recordAnswer(d, 'L:b', true, { game: 'g' });
    expect(confusedWith(d, 'L:b')).toEqual([]);
  });
});

describe('Tahap & pulau', () => {
  it('tahap 2 dibuka hanya dengan bintang DAN ketepatan', () => {
    const d = blankProfileData();
    expect(levelUnlock(d, 'letter-hunt', 2).unlocked).toBe(false);
    completeGame(d, 'letter-hunt', 1, { correct: 2, wrong: 0, hints: 0 }, 1000, false);
    expect(levelUnlock(d, 'letter-hunt', 2).unlocked).toBe(false); // terlalu sedikit cubaan
    completeGame(d, 'letter-hunt', 1, { correct: 5, wrong: 0, hints: 0 }, 1000, false);
    expect(levelUnlock(d, 'letter-hunt', 2).unlocked).toBe(true);
    expect(recommendedLevel(d, 'letter-hunt')).toBe(2);
  });
  it('pulau berkunci dibuka mengikut penguasaan huruf', () => {
    const d = blankProfileData();
    expect(worldUnlock(d, 4, 'sound-forest').unlocked).toBe(false);
    for (const l of 'aiub') { recordAnswer(d, 'L:' + l, true, { game: 'g' }); recordAnswer(d, 'L:' + l, true, { game: 'g' }); }
    expect(worldUnlock(d, 4, 'sound-forest').unlocked).toBe(true);
    expect(worldUnlock(d, 4, 'star-castle', { ...DEFAULT_SETTINGS, unlockAll: true }).unlocked).toBe(true);
  });
});

describe('Ganjaran', () => {
  it('bintang dikira daripada ketepatan', () => {
    expect(starsFor({ correct: 6, wrong: 0, hints: 0 })).toBe(3);
    expect(starsFor({ correct: 6, wrong: 2, hints: 0 })).toBe(2);
    expect(starsFor({ correct: 2, wrong: 4, hints: 0 })).toBe(1);
  });
  it('bintang terbaik sahaja dikira — main semula tidak menambah bintang', () => {
    const d = blankProfileData();
    completeGame(d, 'letter-hunt', 1, { correct: 6, wrong: 0, hints: 0 }, 1000, false);
    completeGame(d, 'letter-hunt', 1, { correct: 6, wrong: 0, hints: 0 }, 1000, false);
    expect(totalStars(d)).toBe(3);
  });
  it('XP dihadkan apabila tahap sama dimain berulang kali pada hari sama', () => {
    const d = blankProfileData();
    const gains = [1, 2, 3, 4].map(() => completeGame(d, 'letter-hunt', 1, { correct: 6, wrong: 0, hints: 0 }, 1000, false).xpGained);
    expect(gains[2]).toBe(2);
    expect(gains[3]).toBe(2);
  });
  it('peti misteri hanya sekali selepas misi siap', () => {
    const d = blankProfileData();
    ensureDaily(d, 4, DEFAULT_SETTINGS);
    expect(openChest(d)).toBeNull();
    for (const s of d.daily!.steps) markMissionStep(d, s.game);
    expect(openChest(d)).not.toBeNull();
    expect(openChest(d)).toBeNull();
    expect(d.collectibles.length).toBe(1);
  });
});

describe('Storan', () => {
  beforeEach(() => localStorage.clear());
  it('memulihkan data rosak tanpa ranap', () => {
    localStorage.setItem('ciluka:v1:p:x', '{rosak');
    const d = loadProfileData('x');
    expect(d.version).toBe(1);
    expect(d.words).toEqual([]);
  });
  it('membuang rekod berganda dan medan salah jenis', () => {
    const d = sanitizeProfileData({ words: ['bola', 'bola'], xp: 'banyak', collectibles: ['a', 'a'] });
    expect(d.words).toEqual(['bola']);
    expect(d.xp).toBe(0);
    expect(d.collectibles).toEqual(['a']);
  });
  it('sandaran eksport & import', () => {
    const idx = loadIndex();
    idx.profiles.push({ id: 'p1', name: 'Ali', avatar: 'kucing', age: 5, createdAt: 1 });
    idx.activeId = 'p1';
    saveIndex(idx);
    const d = blankProfileData(); d.xp = 42; saveProfileData('p1', d);
    const text = exportAll(idx);
    localStorage.clear();
    const back = importAll(text);
    expect(back.profiles[0].name).toBe('Ali');
    expect(loadProfileData('p1').xp).toBe(42);
  });
});
