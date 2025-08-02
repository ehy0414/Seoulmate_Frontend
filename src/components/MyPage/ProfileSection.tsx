import React from 'react';
import BackArrow from '../../assets/common/back-arrow.svg?react';
import { useNavigate } from 'react-router-dom';

interface ProfileSectionProps {
  name: string;
  email: string;
  profileImage: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  email,
  profileImage
}) => {
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate('/mypage/profile');
  };

  return (
    <div className="flex w-full px-[18px] py-4 items-center justify-between border-b-[3px] border-[#F3F2F2] h-28">
      {/* 프로필 이미지와 텍스트 그룹 */}
      <div className="flex items-center gap-[30px]">
        <img 
          className="w-20 h-20 flex-shrink-0 rounded-[50px] border-[0.5px] border-black-400" 
          src={profileImage} 
          alt="프로필 이미지" 
        />
        <div className="flex flex-col items-start gap-2">
          <div className="self-stretch text-black text-2xl font-semibold">
            {name}
          </div>
          <div className="self-stretch text-black-600 text-base font-medium">
            {email}
          </div>
        </div>
      </div>
      
      {/* 편집 버튼 */}
      <button onClick={handleEditProfile} className="flex justify-center items-center">
        <BackArrow className="w-6 h-6 flex-shrink-0 rotate-180" />
      </button>
    </div>
  );
};

export default ProfileSection;
