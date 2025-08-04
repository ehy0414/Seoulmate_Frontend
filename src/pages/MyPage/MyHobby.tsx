import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFixedHeaderDetail } from '../../components/common/NotFixedHeaderDetail';

const categories = {
  '스포츠': ['축구', '야구', '농구', '탁구', '당구', '복싱', '테니스', '스케이트보드', '스키/보드', '스케이트', '볼링', '요가', '필라테스', '클라이밍', '자전거', '러닝', '미식축구', '수영', '무술', '카레이싱', '크로스핏'],
  '파티': ['클러빙', '펍', '홈파티', '생일파티', '페스티벌'],
  '언어': ['한국어', '영어', '일본어', '중국어', '스페인어', '프랑스어', '독일어', '스웨덴어', '베트남어', '태국어', '미얀마어', '언어교환'],
  '엑티비티': ['시내', '시골/근교', '캠핑', '캐러반', '해외', '로드트립', '낚시', '트래킹', '등산', '서핑', '보드게임', '스포츠관람', '방탈출', '온천', '계곡', '바다'],
  '문화/예술': ['영화', '콘서트', '뮤지컬', '드라마', '전시회', 'K-pop', '패션', '박물관', '갤러리', '쇼핑'],
  '취미': ['춤', '노래', '그림', '게임', '독서', '카페', '자기계발'],
  '음식/드링크': ['맛집투어', '한식', '스시', '동남아음식', '브런치', '디저트', '커피', '와인', '맥주', '채식', '칵테일', '위스키'],
  '음악': ['10년대', '팝송', 'EDM', '하우스', 'J-pop', 'K-pop', 'R&B', '레게', '락', '재즈', '인디', '힙합', '오페라', '클래식']
};

const MyHobby: React.FC = () => {
  const navigate = useNavigate();
  // TODO: 백엔드에서 기존 선택된 취미 가져오기
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([
    '축구', '영화', '커피'  // 임시 데이터 (백엔드에서 가져올 예정)
  ]);
  const [showToast, setShowToast] = useState(false);

  const handleBackClick = () => {
    navigate('/mypage')
  };

  const handleNotificationClick = () => {
    navigate('/alarm');
  };

  const handleHobbySelect = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      // 이미 선택된 경우 - 3개 이상일 때만 해제 가능
      if (selectedHobbies.length > 3) {
        setSelectedHobbies(prev => prev.filter(h => h !== hobby));
      } else {
        // 3개 미만일 때 해제 시도하면 토스트 메시지
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } else if (selectedHobbies.length < 10) {
      // 10개 미만일 때만 추가
      setSelectedHobbies(prev => [...prev, hobby]);
    } else {
      // 10개 이상일 때 토스트 메시지 표시
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
    console.log(selectedHobbies.length);
  };

  const handleSave = () => {
    // TODO: 백엔드에 선택된 취미 저장
    console.log('Selected hobbies:', selectedHobbies);
    navigate('/myPage');
  };

  return (
    <div className="flex flex-col w-full mx-auto h-screen bg-white relative">
      {/* Header */}
      <NotFixedHeaderDetail
        title="내 취미"
        onBackClick={handleBackClick}
        onNotificationClick={handleNotificationClick}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-[18px] pt-[18px] pb-[94px]">
        {/* 카테고리 리스트 */}
        <div className="space-y-10">
          {Object.entries(categories).map(([categoryTitle, items]) => (
            <div key={categoryTitle}>
              <h3 className="text-sm font-semibold text-black mb-3">{categoryTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleHobbySelect(item)}
                    className={`px-3 py-[6px] text-xs rounded-full border transition-colors font-medium leading-[14px] tracking-[0] ${
                      selectedHobbies.includes(item)
                        ? "bg-primary-700 border-primary-700 text-black-100"
                        : "bg-black-100 border-black-400 text-black-600"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] px-[18px] py-4 bg-white">
        <button
          onClick={handleSave}
          className="w-full h-[50px] bg-primary-600 text-black-100 rounded-[8px] font-[500] text-base flex items-center justify-center"
        >
          저장하기
        </button>
      </div>

      {/* 토스트 메시지 */}
      {showToast && (
        <div className="fixed bottom-[16px] left-1/2 transform -translate-x-1/2 w-full max-w-[430px] px-[18px]">
          <div className="bg-black-500 text-black-100 px-4 py-[15.5px] rounded-[8px] z-50 text-center">
            <span className="text-base font-medium">
              {selectedHobbies.length >= 10 
                ? "취미는 10개까지만 선택 가능합니다." 
                : "취미는 최소 3개 이상 선택해야 합니다."
              }
            </span>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyHobby;