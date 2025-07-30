import React from 'react';
import { motion } from 'framer-motion';

interface FriendCard {
    id: number;
    name: string;
    matchRate: string;
    image: string;
}

const ActiveSearchFriend = () => {
    const friendData: FriendCard[] = [
        {
            id: 1,
            name: '김철수',
            matchRate: '95%',
            image: '/api/placeholder/80/80'
        },
        {
            id: 2,
            name: '이영희',
            matchRate: '88%',
            image: '/api/placeholder/80/80'
        },
        {
            id: 3,
            name: '박민수',
            matchRate: '82%',
            image: '/api/placeholder/80/80'
        },
        {
            id: 4,
            name: '정수진',
            matchRate: '78%',
            image: '/api/placeholder/80/80'
        },
        {
            id: 5,
            name: '최동현',
            matchRate: '75%',
            image: '/api/placeholder/80/80'
        },
        {
            id: 6,
            name: '한지영',
            matchRate: '72%',
            image: '/api/placeholder/80/80'
        }
    ];

    return (
        <div className="pb-[65px]">
            {/* 추천 친구 리스트 */}
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
                                <div className="bg-[#f45f3a] text-[#fbfbfb] text-xs w-[42px] h-[22px] flex items-center justify-center rounded-[100px] font-semibold">
                                    {friend.matchRate}
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