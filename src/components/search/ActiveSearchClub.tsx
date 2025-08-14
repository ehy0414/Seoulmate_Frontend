import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SportsIcon from '../../assets/category/category-sports.svg?react';
import PartyIcon from '../../assets/category/category-party.svg?react';
import LanguageIcon from '../../assets/category/category-language.svg?react';
import ActivityIcon from '../../assets/category/category-activity.svg?react';
import ArtIcon from '../../assets/category/category-art.svg?react';
import HobbyIcon from '../../assets/category/category-hobby.svg?react';
import FoodIcon from '../../assets/category/category-food.svg?react';
import MusicIcon from '../../assets/category/category-music.svg?react';

interface ClubCard {
    id: number;
    title: string;
    place: string;
    date: string;
    image: string;
}

interface ActiveSearchClubProps {
    searchValue?: string;
}

const ActiveSearchClub = ({ searchValue = '' }: ActiveSearchClubProps) => {
    const location = useLocation();
    const initialCategory = location.state?.category || '스포츠';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
    const hasProcessedLocationState = useRef(false);

    // location.state가 변경되면 카테고리 업데이트 (초기 로딩 시에만)
    useEffect(() => {
        const newCategory = location.state?.category;
        if (newCategory && !hasProcessedLocationState.current) {
            setSelectedCategory(newCategory);
            hasProcessedLocationState.current = true;
        }
    }, [location.state]);

    // 선택된 카테고리가 변경되면 해당 카테고리로 스크롤
    useEffect(() => {
        const selectedButton = categoryRefs.current[selectedCategory];
        if (selectedButton) {
            selectedButton.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [selectedCategory]);

    const categories = [
        { name: '스포츠', icon: SportsIcon },
        { name: '파티', icon: PartyIcon },
        { name: '언어', icon: LanguageIcon },
        { name: '액티비티', icon: ActivityIcon },
        { name: '문화/예술', icon: ArtIcon },
        { name: '취미', icon: HobbyIcon },
        { name: '음식', icon: FoodIcon },
        { name: '음악', icon: MusicIcon },
    ];

    const clubData: ClubCard[] = [
        {
            id: 1,
            title: '숭실대 테니스',
            place: '숭실고등학교 체육관',
            date: '7/23 18:00',
            image: '/api/placeholder/80/80'
        },
        {
            id: 2,
            title: '수요일 해 떨어지면 축구',
            place: '숭실대학교 운동장',
            date: '7/23 20:00',
            image: '/api/placeholder/80/80'
        },
        {
            id: 3,
            title: '스키',
            place: '강원도 비발디파크',
            date: '12/30 8:00',
            image: '/api/placeholder/80/80'
        },
        {
            id: 4,
            title: '점심 공강 때 농구',
            place: '숭실대학교 운동장',
            date: '9/2 13:00',
            image: '/api/placeholder/80/80'
        },
        {
            id: 5,
            title: '헬스장 메이트 구함',
            place: '교내 헬스장',
            date: '7/28 15:00',
            image: '/api/placeholder/80/80'
        },
        {
            id: 6,
            title: '스케이트 보드 입문',
            place: '학교 뒤 공터',
            date: '8/3 18:00',
            image: '/api/placeholder/80/80'
        }
    ];

    return (
        <div>
            {/* 카테고리 필터 */}
            <div className={`sticky z-10 bg-white ${searchValue.trim() !== '' ? 'top-[112.4px]' : 'top-0'}`}>
                <div className='flex flex-col justify-center items-end self-stretch w-full h-[50px] px-[18px] py-[10px] border-b-[0.5px] border-[#AFA9A9] bg-white'>
                    <button className='px-4 py-2 w-[77px] h-[30px] bg-black-100 border border-black-600 rounded-[100px] text-[#4E4646] text-[12px] font-medium leading-normal flex items-center'>
                        언어필터
                    </button>
                </div>
                <div className="px-[18px] py-5 bg-white">
                    <div className="flex space-x-3 overflow-x-auto snap-x snap-proximity scrollbar-hide">
                        {categories.map((category) => (
                            <motion.button
                                key={category.name}
                                ref={(el) => {
                                    categoryRefs.current[category.name] = el;
                                }}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`snap-start flex flex-col items-center justify-center w-[74px] h-[74px] rounded-[20px] border-[0.5px] flex-shrink-0 ${
                                    selectedCategory === category.name
                                        ? 'bg-[#FFE2DB] border-gray-700'
                                        : 'bg-black-100 border-black-400'
                                }`}
                                initial={false}
                                animate={{
                                    opacity: selectedCategory === category.name ? 1 : 0.7
                                }}
                                transition={{
                                    duration: 0.5
                                }}
                            >
                                <category.icon 
                                    fill={selectedCategory === category.name ? '#F45F3A' : '#AFA9A9'}
                                    className='mb-3'
                                />
                                <div className={`text-xs ${
                                    selectedCategory === category.name 
                                        ? 'font-[600]' 
                                        : 'font-[300]'
                                }`}>
                                    {category.name}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* 모임 리스트 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className='pb-[65px]'
                >
                    <div className="flex flex-col">
                        {clubData.map((club) => (
                            <motion.div
                                key={club.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white border-b-[0.5px] border-black-400 p-[18px] flex space-x-4"
                            >
                                {/* 이미지 */}
                                <div className="w-20 h-20 bg-gray-300 rounded-[8px] flex-shrink-0"></div>

                                {/* 콘텐츠 */}
                                <div className="flex-1 py-[5px]">
                                    <div className="text-base font-medium text-black-700 leading-[19px] mb-[6px]">
                                        {club.title}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-[500] text-black-400 leading-[19px]">{club.place}</p>
                                        <p className="text-sm font-[500] text-black-400 leading-[19px]">{club.date}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ActiveSearchClub;