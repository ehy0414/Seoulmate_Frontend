export interface Schedule {
    id: number;
    img: string;
    title: string;
    place: string;
    date: string; // YYYY-MM-DD
  }
  
  export const mockSchedules: Schedule[] = [
    {
      id: 1,
      img: '📸',
      title: '스터디 모임',
      place: '스타벅스 강남점',
      date: '2025-08-23',
    },
    {
      id: 2,
      img: '🎤',
      title: '회의',
      place: 'Zoom',
      date: '2025-08-23',
    },
    {
      id: 3,
      img: '🎉',
      title: '친구 생일파티',
      place: '홍대 술집',
      date: '2025-08-12',
    },
  ];
  