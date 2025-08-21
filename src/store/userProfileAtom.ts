import { atomWithStorage } from 'jotai/utils';

// API 응답 구조에 맞춘 사용자 정보 타입
export interface Hobby {
  hobbyId: number;
  hobbyCategory: string;
  hobbyName: string;
}

export interface UserProfile {
  profileImageUrl: string;
  name: string;
  email: string;
  bio: string;
  hobbies: Hobby[];
  university: string;
  age: number;
  languages: Record<string, number>;
}

export const userProfileAtom = atomWithStorage<UserProfile | null>('userProfile', null);
