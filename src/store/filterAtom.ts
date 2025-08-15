import { atom } from 'jotai';

export interface FilterState {
  koreanLevel: [number, number];
  englishLevel: [number, number];
}

export const filterAtom = atom<FilterState>({
  koreanLevel: [0, 100],
  englishLevel: [0, 100],
});
