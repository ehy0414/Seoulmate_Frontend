import React, { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { userProfileAtom } from '../../store/userProfileAtom';
import api from '../../services/axios';
import { NotFixedHeaderDetail } from '../../components/common/NotFixedHeaderDetail';
import BottomNavBar from '../../components/common/BottomNavBar';
import { ProfileSection, HobbyChips, InfoCard } from '../../components/MyProfile';

const MyProfile: React.FC = () => {

  // Atom에서 데이터 가져오기
  const userProfile = useAtomValue(userProfileAtom);
  const setUserProfile = useSetAtom(userProfileAtom);

  useEffect(() => {
    if (!userProfile) {
      const fetchUserProfile = async () => {
        try {
          const response = await api.get('/my-page');
          if (response.data?.data) {
            const data = response.data.data;
            // bio가 객체면 bio.bio로 변환
            const fixedData = {
              ...data,
              bio: typeof data.bio === 'object' && data.bio !== null ? data.bio.bio : data.bio
            };
            setUserProfile(fixedData);
          }
        } catch (error) {
          console.log("profile 정보 가져오는 중 오류",error);
        }
      };
      fetchUserProfile();
    }
  }, [userProfile, setUserProfile]);

  // 데이터 가공
  const hobbies = userProfile?.hobbies?.map(h => h.hobbyName) ?? [];

  const infoItems = [
    { label: '학교', value: userProfile?.university ?? '' },
    { label: '나이', value: userProfile?.age != null ? `${userProfile.age}세` : '' },
    { label: '영어 구사 레벨', value: userProfile?.languages?.['영어']?.toString() ?? '' },
    { label: '한국어 구사 레벨', value: userProfile?.languages?.['한국어']?.toString() ?? '' }
  ];

  return (
    <div className="flex flex-col w-full mx-auto h-screen bg-white relative">
      {/* Header */}
      <NotFixedHeaderDetail
        title="내 프로필"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-[94px]">
        {/* Profile Section */}
        <ProfileSection/>


        {/* Hobby Chips */}
        <div className="px-[18px] pb-5 border-b-[3px] border-[#F3F2F2]">
          <HobbyChips hobbies={hobbies} />
        </div>

        {/* Info Card */}
        <div className="px-[18px] py-4">
          <InfoCard items={infoItems} />
        </div>
      </div>


      {/* Bottom Navigation */}
      <BottomNavBar menu="profile" />
    </div>
  );
};

export default MyProfile;
