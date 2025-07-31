import React from 'react';
import { motion } from 'framer-motion'; // Framer Motion 가져오기

interface User {
  id: number;
  name: string;
  matchRate: string;
  image: string;
}

const users: User[] = [
  { id: 1, name: '김철수', matchRate: '95%', image: '/api/placeholder/40/40' },
  { id: 2, name: '이영희', matchRate: '88%', image: '/api/placeholder/40/40' },
  { id: 3, name: '박민수', matchRate: '82%', image: '/api/placeholder/40/40' },
  { id: 4, name: '정수진', matchRate: '78%', image: '/api/placeholder/40/40' },
  { id: 5, name: '최동현', matchRate: '75%', image: '/api/placeholder/40/40' },
  { id: 6, name: '한지영', matchRate: '72%', image: '/api/placeholder/40/40' },
  { id: 7, name: '이영희', matchRate: '88%', image: '/api/placeholder/40/40' }, // ID 중복 수정 필요
  { id: 8, name: '박민수', matchRate: '82%', image: '/api/placeholder/40/40' }, // ID 중복 수정 필요
  { id: 9, name: '정수진', matchRate: '78%', image: '/api/placeholder/40/40' }, // ID 중복 수정 필요
  { id: 10, name: '최동현', matchRate: '75%', image: '/api/placeholder/40/40' }, // ID 중복 수정 필요
  { id: 11, name: '한지영', matchRate: '72%', image: '/api/placeholder/40/40' }, // ID 중복 수정 필요
];

const ActiveSearchResult = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {users.map((user, index) => (
        <motion.div
          key={user.id} // 고유한 ID 사용
          initial={{ opacity: 0, y: 20 }} // 초기 상태: 투명, 20px 아래
          animate={{ opacity: 1, y: 0 }} // 최종 상태: 불투명, 원래 위치
          transition={{ duration: 0.5, delay: index * 0.1 }} // 0.5초 지속, 순차적 지연
          className="w-full h-[60px] bg-white border-b-[0.5px] border-b-black-400 flex items-center px-[18px]"
        >
          {/* 프로필 */}
          <div className="w-10 h-10 bg-[#b8b8b8] rounded-full flex-shrink-0 mr-4"></div>
          {/* 이름 */}
          <div className="flex-1">
            <span className="text-[16px] font-medium text-[#1a1a1a]">{user.name}</span>
          </div>
          {/* 매칭률 배지 */}
          <div className="bg-[#f45f3a] text-[#fbfbfb] text-xs w-[42px] h-[22px] flex items-center justify-center rounded-full font-semibold">
            {user.matchRate}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActiveSearchResult;