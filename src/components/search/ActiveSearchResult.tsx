import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/axios';

interface User {
  userId: number;
  name: string;
  profileImage: string;
}

const ActiveSearchResult = ({ searchValue }: { searchValue: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchValue.trim()) return;

    const timer = setTimeout(() => {
      // API 요청
      api.get('/friends/search', {
        params: { query: searchValue, page, size: 20 },
      })
        .then((response) => {
          const newUsers = response.data.data || [];
          console.log("검색한 유저 결과",newUsers)
          setUsers((prev) => (page === 1 ? newUsers : [...prev, ...newUsers]));
        })
        .catch(() => setUsers([]));
    }, 1000); // 1초 후 요청

    return () => clearTimeout(timer); // 입력이 바뀌면 이전 타이머 제거
  }, [searchValue, page]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {users.map((user, index) => (
        <motion.div
          key={user.userId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-full h-[60px] bg-white border-b-[0.5px] border-b-black-400 flex items-center px-[18px]"
        >
          {/* 프로필 */}
          <img
            src={user.image}
            alt={user.name}
            className="w-10 h-10 rounded-full flex-shrink-0 mr-4 object-cover bg-[#b8b8b8]"
          />
          {/* 이름 */}
          <div className="flex-1">
            <span className="text-[16px] font-medium text-[#1a1a1a]">
              {user.name}
            </span>
          </div>
        </motion.div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ActiveSearchResult;