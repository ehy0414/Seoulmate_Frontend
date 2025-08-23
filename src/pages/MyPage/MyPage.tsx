import React, { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { userProfileAtom } from '../../store/userProfileAtom';
import api from '../../services/axios';
import { ProfileSection, QuickActionButtons, MenuSection } from '../../components/MyPage';
import BottomNavBar from '../../components/common/BottomNavBar';
import NoFixedHeaderSeoulmate from '../../components/common/NoFixedHeaderSeoulmate';

const MyPage: React.FC = () => {
  const setUserProfile = useSetAtom(userProfileAtom);
  const userProfile = useAtomValue(userProfileAtom);

  useEffect(() => {
    // localStorage에 값이 없을 때만 API 요청
    if (!userProfile) {
      const fetchUserProfile = async () => {
        try {
          const response = await api.get('/my-page');
          if (response.data?.data) {
            setUserProfile(response.data.data);
          }
        } catch (error) {
          console.log("사용자 정보 가져오는 중 err", error);
          setUserProfile(null);
        }
      };
      fetchUserProfile();
    }
  }, [setUserProfile, userProfile]);

  return (
    <div className="w-full max-h-screen bg-white flex flex-col mx-auto">
      {/* Top Bar */}
      <NoFixedHeaderSeoulmate title="서울메이트" alarm={true} showBorder={true} />

      {/* Profile Section */}
      <ProfileSection
        name={userProfile?.name ?? ''}
        email={userProfile?.email ?? ''}
        profileImage={userProfile?.profileImageUrl ?? ''}
      />

      {/* Quick Action Buttons */}
      <QuickActionButtons isKorean={userProfile?.languages["한국어"] ? true : false}/>

      {/* Menu Section */}
      <MenuSection />

      {/* Bottom Navigation */}
      <BottomNavBar menu="profile" />
    </div>
  );
};

export default MyPage;
