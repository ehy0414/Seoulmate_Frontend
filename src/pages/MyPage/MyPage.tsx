import React from 'react';
import { ProfileSection, QuickActionButtons, MenuSection } from '../../components/MyPage';
import BottomNavBar from '../../components/common/BottomNavBar';
import FloatingActionButton from '../../components/common/FloatingActionButton';
import { HeaderSeoulmate } from '../../components/common/HeaderSeoulmate';

const MyPage: React.FC = () => {
  return (
    <div className="w-full max-h-screen bg-white flex flex-col mx-auto pt-[60px]">
      {/* Top Bar */}
      <HeaderSeoulmate title="서울메이트" alarm={true} />

      {/* Profile Section */}
      <ProfileSection
        name="name"
        email="example@gmail.com"
        profileImage="https://api.builder.io/api/v1/image/assets/TEMP/402ae57854f496cffa0dfe62385dc5fc3fcbc549?width=160"
      />

      {/* Quick Action Buttons */}
      <QuickActionButtons />

      {/* Menu Section */}
      <MenuSection />

      {/* Bottom Navigation */}
      <BottomNavBar menu="profile" />
    </div>
  );
};

export default MyPage;
