import React from 'react';
import { motion } from 'framer-motion';

interface User {
  id: number;
  name: string;
  image: string;
}

const users: User[] = [
  { id: 1, name: '김철수', image: '/api/placeholder/40/40' },
  { id: 2, name: '이영희', image: '/api/placeholder/40/40' },
  { id: 3, name: '박민수', image: '/api/placeholder/40/40' },
  { id: 4, name: '정수진', image: '/api/placeholder/40/40' },
  { id: 5, name: '최동현', image: '/api/placeholder/40/40' },
  { id: 6, name: '한지영', image: '/api/placeholder/40/40' },
  { id: 7, name: '이영희', image: '/api/placeholder/40/40' },
  { id: 8, name: '박민수', image: '/api/placeholder/40/40' },
  { id: 9, name: '정수진', image: '/api/placeholder/40/40' },
  { id: 10, name: '최동현', image: '/api/placeholder/40/40' },
  { id: 11, name: '한지영', image: '/api/placeholder/40/40' },
];

const ActiveSearchResult = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {users.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-full h-[60px] bg-white border-b-[0.5px] border-b-black-400 flex items-center px-[18px]"
        >
          {/* 프로필 */}
          <div className="w-10 h-10 bg-[#b8b8b8] rounded-full flex-shrink-0 mr-4"></div>
          {/* 이름 */}
          <div className="flex-1">
            <span className="text-[16px] font-medium text-[#1a1a1a]">{user.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActiveSearchResult;