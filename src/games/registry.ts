/** Pendaftaran permainan — dimuat secara malas (lazy) supaya muat awal ringan. */
import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { GameId } from '../data/types';
import type { GameProps } from './types';

export const GAME_COMPONENTS: Record<GameId, LazyExoticComponent<ComponentType<GameProps>>> = {
  'letter-hunt': lazy(() => import('./LetterHunt')),
  'letter-match': lazy(() => import('./LetterMatch')),
  'memory-letter': lazy(() => import('./MemoryLetter')),
  'sound-hunt': lazy(() => import('./SoundHunt')),
  'magic-tracing': lazy(() => import('./MagicTracing')),
  'word-builder': lazy(() => import('./WordBuilder')),
  'missing-letter': lazy(() => import('./MissingLetter')),
  'syllable-puzzle': lazy(() => import('./SyllablePuzzle')),
  'object-match': lazy(() => import('./ObjectMatch')),
  'letter-balloon': lazy(() => import('./LetterBalloon')),
  'star-challenge': lazy(() => import('./StarChallenge')),
  'letter-race': lazy(() => import('./LetterRace'))
};
