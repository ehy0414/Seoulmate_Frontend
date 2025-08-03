export interface Message {
    sender: 'me' | 'friend';
    text: string;
    time: string; // HH:mm
    date: string; // YYYY년 MM월 DD일
  }
  
  export const chatMockMessages: Message[] = [
    {
      sender: 'friend',
      text: '친구추가 받아!',
      time: '23:48',
      date: '2025년 7월 23일',
    },
    {
      sender: 'me',
      text: '넵..',
      time: '23:48',
      date: '2025년 7월 23일',
    },
    {
      sender: 'me',
      text: '음 그렇구나 길게치면 자동으로 엔터가 되는구나 근데 이건 좀 짧나?',
      time: '23:48',
      date: '2025년 7월 23일',
    },
    {
      sender: 'me',
      text: '짧게도 테스트',
      time: '23:48',
      date: '2025년 7월 23일',
    },
    {
      sender: 'friend',
      text: '길게 치면 이렇게 뜨네요 얼마나 더 길게 쳐야 느낌을 알 수 있을까',
      time: '23:48',
      date: '2025년 7월 23일',
    },
    {
      sender: 'friend',
      text: '애도 짧게 테스트',
      time: '23:48',
      date: '2025년 7월 23일',
    },
  ];
  