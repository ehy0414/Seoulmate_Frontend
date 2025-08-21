import { atom } from 'jotai';

export type FriendRecommendType = 'hobby' | 'language';
export const friendRecommendTypeAtom = atom<FriendRecommendType>('hobby');
