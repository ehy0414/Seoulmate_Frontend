import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FriendCard {
    id: number;
    name: string;
    image: string;
}

const ActiveSearchFriend = () => {
    const [selectedFilter, setSelectedFilter] = useState<'interest' | 'language'>('interest');

    const friendData: FriendCard[] = [
        {
            id: 1,
            name: '김철수',
            image: '/api/placeholder/80/80'
        },
        {
            id: 2,
            name: '이영희',
            image: '/api/placeholder/80/80'
        },
        {
            id: 3,
            name: '박민수',
            image: '/api/placeholder/80/80'
        },
        {
            id: 4,
            name: '정수진',
            image: '/api/placeholder/80/80'
        },
        {
            id: 5,
            name: '최동현',
            image: '/api/placeholder/80/80'
        },
        {
            id: 6,
            name: '한지영',
            image: '/api/placeholder/80/80'
        },
        {
            id: 7,
            name: '김철수',
            image: '/api/placeholder/80/80'
        },
        {
            id: 8,
            name: '이영희',
            image: '/api/placeholder/80/80'
        },
        {
            id: 9,
            name: '박민수',
            image: '/api/placeholder/80/80'
        },
        {
            id: 10,
            name: '정수진',
            image: '/api/placeholder/80/80'
        },
        {
            id: 11,
            name: '최동현',
            image: '/api/placeholder/80/80'
        },
        {
            id: 12,
            name: '한지영',
            image: '/api/placeholder/80/80'
        },
    ];

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
                        checked={selectedFilter === 'interest'}
                        onChange={() => setSelectedFilter('interest')}
                        className="w-5 h-5 accent-primary-700"
                    />
                    <label
                        htmlFor="interest"
                        className={`text-[#1A1A1A] text-[12px] leading-normal cursor-pointer ${
                            selectedFilter === 'interest' ? 'font-[600]' : 'font-[500]'
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
                <div className="grid grid-cols-2 gap-3">
                    {friendData.map((friend, index) => (
                        <motion.div
                            key={friend.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1
                            }}
                            className="bg-[#fbfbfb] border-[0.5px] border-[#afa9a9] rounded-[8px] p-4 flex flex-col items-center"
                        >
                            {/* 프로필 이미지 */}
                            <div className="w-20 h-20 bg-[#b8b8b8] rounded-full mb-4 flex-shrink-0"></div>

                            {/* 콘텐츠 */}
                            <div className="w-full flex items-center justify-between">
                                <div className="text-sm font-[500] text-[#1a1a1a] leading-[19px]">
                                    {friend.name}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActiveSearchFriend;