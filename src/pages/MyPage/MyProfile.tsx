import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFixedHeaderDetail } from '../../components/common/NotFixedHeaderDetail';
import BottomNavBar from '../../components/common/BottomNavBar';
import FloatingActionButton from '../../components/common/FloatingActionButton';
import { ProfileSection, HobbyChips, InfoCard } from '../../components/MyProfile';

const MyProfile: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNotificationClick = () => {
    navigate('/alarm');
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  // Sample data - in real app this would come from props or API
  const userProfile = {
    name: 'name',
    description: '자기소개',
    profileImage: 'https://api.builder.io/api/v1/image/assets/TEMP/ce3653c63350278e9056ca9cab1e39fed7f9c959?width=160'
  };

  const hobbies = [
    '한국어', '일본어', '필라테스', '페스티벌',
    '시내', '그림', '콘서트', '스시'
  ];

  const infoItems = [
    { label: '학교', value: '숭실대학교' },
    { label: '나이', value: '22세' },
    { label: '영어 구사 레벨', value: '76' },
    { label: '한국어 구사 레벨', value: '92' }
  ];

  return (
    <div className="flex flex-col w-full mx-auto h-screen bg-white relative">
      {/* Header */}
      <NotFixedHeaderDetail
        title="내 프로필"
        onBackClick={handleBackClick}
        onNotificationClick={handleNotificationClick}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-[94px]">
        {/* Profile Section */}
        <ProfileSection
          name={userProfile.name}
          description={userProfile.description}
          profileImage={userProfile.profileImage}
          onEditClick={handleEditProfile}
        />

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
