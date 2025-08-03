import React from 'react';
import BackArrow from '../../assets/common/back-arrow.svg?react';

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex px-[18px] py-5 justify-between items-center self-stretch border-b border-black-300"
    >
      <div className="text-black text-center text-sm font-medium leading-[19px] font-sans">
        {label}
      </div>
      <BackArrow className="w-5 h-5 flex-shrink-0 rotate-180" />
    </button>
  );
};

const MenuSection: React.FC = () => {
  const handleFriendInviteClick = () => {
    console.log('Friend invite clicked');
  };

  const handleTermsClick = () => {
    console.log('Terms clicked');
  };

  const handleSupportClick = () => {
    console.log('Support clicked');
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
  };

  const handleDeleteAccountClick = () => {
    console.log('Delete account clicked');
  };

  return (
    <div className="flex w-full flex-col items-start">
      <MenuItem label="친구초대" onClick={handleFriendInviteClick} />
      <MenuItem label="서비스 약관" onClick={handleTermsClick} />
      <MenuItem label="고객지원" onClick={handleSupportClick} />
      <MenuItem label="로그아웃" onClick={handleLogoutClick} />
      <MenuItem label="탈퇴하기" onClick={handleDeleteAccountClick} />
    </div>
  );
};

export default MenuSection;
