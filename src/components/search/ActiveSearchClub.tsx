import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';
import SportsIcon from '../../assets/category/category-sports.svg?react';
import PartyIcon from '../../assets/category/category-party.svg?react';
import LanguageIcon from '../../assets/category/category-language.svg?react';
import ActivityIcon from '../../assets/category/category-activity.svg?react';
import ArtIcon from '../../assets/category/category-art.svg?react';
import HobbyIcon from '../../assets/category/category-hobby.svg?react';
import FoodIcon from '../../assets/category/category-food.svg?react';
import MusicIcon from '../../assets/category/category-music.svg?react';
import { filterAtom } from '../../store/filterAtom';
import { isDefaultFilter, generateFilterText } from '../../utils/filterUtils';
import api from '../../services/axios';

interface ClubCard {
    id: number;
    type: string;
    title: string;
    start_time: string;
    meeting_day: string;
    image: string;
}
interface SearchPayload {
  hobbyCategory: string;
  keyword: string;
  koMinLevel: number;
  koMaxLevel: number;
  enMinLevel: number;
  enMaxLevel: number;
  page: number;
  size: number;
  language?: string | string[] | null;
}
export interface ActiveSearchClubProps {
    searchValue?: string;
    searchTrigger?: number;
}

const  ActiveSearchClub = ({ searchValue = '' }: ActiveSearchClubProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const filter = useAtomValue(filterAtom);
    const isDefaultFilterValue = isDefaultFilter(filter);
    const filterTexts = generateFilterText(filter);
    
    const initialCategory = location.state?.category || '스포츠';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [page, setPage] = useState(0);
    const [clubs, setClubs] = useState<ClubCard[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
    const hasProcessedLocationState = useRef(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // location.state가 변경되면 카테고리 업데이트 (초기 로딩 시에만)
    useEffect(() => {
        const newCategory = location.state?.category;
        if (newCategory && !hasProcessedLocationState.current) {
            setSelectedCategory(newCategory);
            hasProcessedLocationState.current = true;
        }
    }, [location.state]);

    // 선택된 카테고리가 변경되면 해당 카테고리로 스크롤 및 리스트/페이지 초기화
    useEffect(() => {
        const selectedButton = categoryRefs.current[selectedCategory];
        if (selectedButton) {
            selectedButton.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
        // 카테고리 바뀌면 리스트와 페이지 초기화
        setClubs([]);
        setPage(0);
    }, [selectedCategory]);

    // API 요청 함수
    const fetchClubs = async (keyword: string) => {
        const koMinLevel = filter.koreanLevel[0];
        const koMaxLevel = filter.koreanLevel[1];
        const enMinLevel =  filter.englishLevel[0];
        const enMaxLevel =  filter.englishLevel[1];
        let language: string | null = null;
        const langs: string[] = [];
        if (koMinLevel !== 0 || koMaxLevel !== 100) langs.push('한국어');
        if (enMinLevel !== 0 || enMaxLevel !== 100) langs.push('영어');
        if (langs.length > 0) language = langs.join(', ');

        try {
            const payload: SearchPayload = {
                hobbyCategory: selectedCategory,
                keyword,
                koMinLevel,
                koMaxLevel,
                enMinLevel,
                enMaxLevel,
                page,
                size: 20
            };
            if (language !== null) payload.language = language;
            console.log("내가 보내는 데이터",payload);
            const res = await api.post('/meetings/search', payload);
            if (res.data.success) {
                const newClubs = res.data.data;
                setClubs(prev => page === 0 ? newClubs : [...prev, ...newClubs]);
                setHasMore(newClubs.length === 20); // 더 가져올 데이터가 있으면 true
                console.log("가져온 데이터 개수", res.data);
            } else {
                console.error(res.data.message);
                setClubs([]);
            }
        } catch (error) {
            console.error(error);
            alert("모임 정보를 가져오는 중 오류 발생");
            setClubs([]);
        }
    };

    // 카테고리/필터/page 변경 시 즉시 요청
    useEffect(() => {
        fetchClubs(searchValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, filter, page]);

    // 검색어 변경 시 1초 후에만 요청 (debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchClubs(searchValue);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchValue]);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        });
        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => observer.disconnect();
      }, [hasMore]);
    const categories = [
        { name: '스포츠', icon: SportsIcon },
        { name: '파티', icon: PartyIcon },
        { name: '언어', icon: LanguageIcon },
        { name: '액티비티', icon: ActivityIcon },
        { name: '문화/예술', icon: ArtIcon },
        { name: '취미', icon: HobbyIcon },
        { name: '음식/드링크', icon: FoodIcon },
        { name: '음악', icon: MusicIcon },
    ];

    return (
        <div>
            {/* 카테고리 필터 */}
            <div className={`sticky z-10 bg-white ${searchValue.trim() !== '' ? 'top-[112.4px]' : 'top-0'}`}>
                <div className='flex flex-col justify-center items-end self-stretch w-full min-h-[50px] px-[18px] py-[10px] border-b-[0.5px] border-[#AFA9A9] bg-white'>
                    {isDefaultFilterValue ? (
                        <button 
                            onClick={() => navigate('/filter')}
                            className='px-4 py-2 w-[77px] h-[30px] bg-black-100 border border-black-600 rounded-[100px] text-[#4E4646] text-[12px] font-medium leading-normal flex items-center justify-center'
                        >
                            언어필터
                        </button>
                    ) : (
                        <div className="flex flex-wrap gap-2 items-center justify-end">
                            {filterTexts.map((text, index) => (
                                <button
                                    key={index}
                                    onClick={() => navigate('/filter')}
                                    className='px-4 py-2 bg-[#FFE2DB] rounded-[100px] text-[#F45F3A] text-[12px] font-semibold leading-[14px] flex items-center justify-center'
                                    style={{
                                        boxShadow: 'inset 0 0 0 1px #F45F3A'
                                    }}
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    )}
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
                                        ? 'bg-[#FFE2DB] shadow-[inset_0_0_0_0.5px_#4E4646]'
                                        : 'bg-black-100 shadow-[inset_0_0_0_0.5px_#AFA9A9]'
                                }`}
                                style={{backfaceVisibility:'hidden'}}
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
                        {clubs.map((club) => (
                            <motion.div
                                key={club.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white border-b-[0.5px] border-black-400 p-[18px] flex space-x-4 cursor-pointer"
                                onClick={() => {
                                    if (club.type === 'PRIVATE') navigate(`/club/${club.id}`);
                                    else if (club.type === 'OFFICIAL') navigate(`/class/${club.id}`);
                                }}
                            >
                                {/* 이미지 */}
                                <div 
                                    className="w-20 h-20 rounded-[8px] flex-shrink-0"
                                    style={{ backgroundImage: `url(${club.image})`, backgroundSize: 'cover' }}
                                ></div>

                                {/* 콘텐츠 */}
                                <div className="flex-1 py-[5px]">
                                    <div className="text-base font-medium text-black-700 leading-[19px] mb-[6px]">
                                        {club.title}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-[500] text-black-400 leading-[19px]">{club.meeting_day}</p>
                                        <p className="text-sm font-[500] text-black-400 leading-[19px]">{club.start_time}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div ref={bottomRef}></div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ActiveSearchClub;