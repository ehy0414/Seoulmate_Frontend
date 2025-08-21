import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { friendRecommendTypeAtom } from '../../store/friendRecommendTypeAtom';
import { motion } from 'framer-motion';
import api from '../../services/axios';
import { FriendsModal } from '../../components/modal/FriendsModal';
import NoFriend from '../../assets/search/nofriend.svg';
// ...existing code...
import Spinner from '../signup/langTest/Spinner';


interface FriendCard {
    userId: number;
    name: string;
    profileImage: string;
    matchedHobbies?: string[];
    totalMatchedHobbies?: number;
    totalMatchedLanguages?: number;
}

const ActiveSearchFriend = () => {
    const [selectedFilter, setSelectedFilter] = useAtom(friendRecommendTypeAtom);
    const [friendData, setFriendData] = useState<FriendCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const openModal = (userId: number) => {
     setSelectedUserId(userId);
     setModalVisible(true);
    };
  const closeModal = () => setModalVisible(false);
    React.useEffect(() => {
        const fetchFriends = async () => {
            setLoading(true);
            try {
                const endpoint = selectedFilter === 'language'
                    ? '/friends/recommendations/language'
                    : '/friends/recommendations/hobby';
                const response = await api.get(endpoint);
                const result = response.data;
                console.log("받아온 추천친구",result);
                if (result.success && Array.isArray(result.data)) {
                    setFriendData(result.data);
                } else {
                    setFriendData([]);
                }
            } catch (error) {
                console.error('추천 친구 목록 조회 실패:', error);
                setFriendData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFriends();
    }, [selectedFilter]);

    return (
        <div className="pb-[65px]">
            {/* 추천 친구 리스트 */}
            <div className="sticky top-0 z-10 h-10 w-full px-[18px] py-[10px] flex items-center justify-end gap-6 border-b-[0.5px] border-black-400 bg-white">
                {/* 관심사 기반 추천 */}
                <div className="flex items-center gap-2 ">
                    <input
                        type="radio"
                        id="interest"   
                        name="filter"
                        checked={selectedFilter === 'hobby'}
                        onChange={() => setSelectedFilter('hobby')}
                        className="w-5 h-5 accent-primary-700"
                    />
                    <label
                        htmlFor="interest"
                        className={`text-[#1A1A1A] text-[12px] leading-normal cursor-pointer ${
                            selectedFilter === 'hobby' ? 'font-[600]' : 'font-[500]'
                        }`}
                    >
                        관심사 기반 추천
                    </label>
                </div>
                {/* 언어 기반 추천 */}
                <div className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="language"
                        name="filter"
                        checked={selectedFilter === 'language'}
                        onChange={() => setSelectedFilter('language')}
                        className="w-5 h-5 accent-primary-700"
                    />
                    <label
                        htmlFor="language"
                        className={`text-[#1A1A1A] text-[12px] leading-normal cursor-pointer ${
                            selectedFilter === 'language' ? 'font-[600]' : 'font-[500]'
                        }`}
                    >
                        언어 기반 추천
                    </label>
                </div>
            </div>
            <div className="px-[18px] py-5">
                {loading ? (
                    <div className='flex justify-center items-center w-full pt-[150px]'>
                        <Spinner text="추천 친구를 불러오는 중입니다..." />
                    </div>
                ) : friendData.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center gap-6 pt-[211px]">
                        <img src={NoFriend} alt="" />
                        <span className="text-2xl text-[#000] font-[600]">추천 검색 결과가 없습니다</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {friendData.map((friend, index) => (
                            <motion.div
                                key={friend.userId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => openModal(friend.userId)}
                                className="bg-[#fbfbfb] border-[0.5px] border-[#afa9a9] rounded-[8px] p-4 flex flex-col items-center cursor-pointer"
                            >
                                {/* 프로필 이미지 */}
                                <img src={friend.profileImage} alt={friend.name} className="w-20 h-20 rounded-full mb-4 flex-shrink-0 object-cover" />

                                {/* 콘텐츠 */}
                                <div className="w-full flex flex-col items-center justify-between">
                                    <div className="text-sm font-[500] text-[#1a1a1a] leading-[19px] mb-1">
                                        {friend.name}
                                    </div>
                                    <div className="text-xs text-[#F45F3A] font-[500] mb-1">
                                        {friend.matchedHobbies?.join(', ')||''}
                                    </div>
                                    <div className="text-xs text-[#AFA9A9] font-[400]">
                                      총 {selectedFilter === 'language' ? friend.totalMatchedLanguages : friend.totalMatchedHobbies}개 {selectedFilter === 'language' ? '언어 일치' : '취미 일치'}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
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

export default ActiveSearchFriend;