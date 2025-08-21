import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/axios';
import { FriendsModal } from '../../components/modal/FriendsModal';
import NoFriend from '../../assets/search/nofriend.svg';
interface User {
  userId: number;
  name: string;
  profileImage: string;
}

const ActiveSearchResult = ({ searchValue }: { searchValue: string }) => {
  // 모달 상태 및 선택된 userId
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const openModal = (userId: number) => {
    setSelectedUserId(userId);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);
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
          let newUsers = response.data.data.content;
          if (!Array.isArray(newUsers)) newUsers = [];
          setUsers((prev) => (page === 1 ? newUsers : [...prev, ...newUsers]));
        })
        .catch(() => setUsers([]));
    }, 1000); // 1초 후 요청

    return () => clearTimeout(timer); // 입력이 바뀌면 이전 타이머 제거
  }, [searchValue, page]);

  // searchValue가 실제로 변경될 때만 setPage(1) 실행
  const prevSearchValueRef = useRef<string>('');
  useEffect(() => {
    if (prevSearchValueRef.current !== searchValue) {
      setPage(1);
      prevSearchValueRef.current = searchValue;
    }
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
      {Array.isArray(users) && users.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-6  pt-[211px]">
          <img src={NoFriend} alt="" />
          <span className="text-2xl text-[#000] font-[600]">검색 결과가 없습니다</span>
        </div>
      ) : (
        <>
          {users.map((user, index) => (
            <motion.div
              key={user.userId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full h-[60px] bg-white border-b-[0.5px] border-b-black-400 flex items-center px-[18px] cursor-pointer"
              onClick={() => openModal(user.userId)}
            >
              {/* 프로필 */}
              <img
                src={user.profileImage}
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
        </>
      )}
      {/* FriendsModal */}
      {selectedUserId && (
        <FriendsModal
          isVisible={isModalVisible}
          onClose={closeModal}
          requestId={selectedUserId}
        />
      )}
    </div>
  );
};

export default ActiveSearchResult;