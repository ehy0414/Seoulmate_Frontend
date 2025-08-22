import React from 'react';
import ReWrite from '../../assets/mypage/change-pan.svg?react';
import api from '../../services/axios';
import { useSetAtom, useAtomValue } from 'jotai';
import { userProfileAtom } from '../../store/userProfileAtom';

const ProfileSection: React.FC = () => {
  // atom에서 직접 데이터 꺼내기
  const userProfile = useAtomValue(userProfileAtom);
  const name = userProfile?.name ?? '';
  const description = userProfile?.bio ?? '';
  const profileImage = userProfile?.profileImageUrl ?? '';
  // 파일 input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const setUserProfile = useSetAtom(userProfileAtom);

  // 자기소개 수정 상태
  const [editMode, setEditMode] = React.useState(false);
  const [editValue, setEditValue] = React.useState(description);

  // 이미지 클릭 시 파일 선택
  const handleImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // 파일 선택 시 API 요청 및 atom 최신화
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile) return;
    const prevImageUrl = userProfile.profileImageUrl;
    const tempUrl = URL.createObjectURL(file);
    setUserProfile({ ...userProfile, profileImageUrl: tempUrl }); // 즉시 preview

    const formData = new FormData();
    formData.append('profileImage', file);
    try {
      await api.put('/my-page/update-profile-image', formData);
      const profileRes = await api.get('/my-page'); // 백그라운드 full fetch
      setUserProfile(profileRes.data.data); // 실제 업데이트
    } catch {
      setUserProfile({ ...userProfile, profileImageUrl: prevImageUrl }); // 실패 시 이전 이미지 복구
      alert("이미지 변경 오류 발생 다시 시도해주세요.");
    } finally {
      URL.revokeObjectURL(tempUrl);
    }
  };

  // 자기소개 수정 완료
  const handleEditSubmit = async () => {
    // bio가 기존 값과 같거나 빈 문자열이면 요청하지 않음
    if (editValue === description || editValue.trim() === "") {
      setEditMode(false);
      return;
    }
    try {
      await api.put('/my-page/update-profile-bio',  editValue);
      // PUT 성공 시 바로 atom bio만 업데이트
      if (!userProfile) return;
      setUserProfile({ ...userProfile, bio: editValue });
      setEditMode(false);
    } catch (error) {
      console.log("자기소개 변경 오류", error);
    }
  };

  // 엔터 입력 시
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    }
  };

  return (
  <div className="flex w-full px-[18px] py-5 flex-col justify-center items-center gap-5 ">
      {/* Profile Image with Camera Icon */}
      <div className="relative w-20 h-20">
        {profileImage && profileImage !== '' ? (
          <img
            className="w-20 h-20 flex-shrink-0 rounded-[50px] cursor-pointer"
            src={profileImage}
            alt="프로필 이미지"
            onClick={handleImageClick}
          />
        ) : null}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="absolute bottom-0 right-0 w-[25px] h-[25px] bg-black-200 border-2 border-white rounded-full flex items-center justify-center">
          <svg width="9" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.2 1.22222H3L4.2 0H7.8L9 1.22222H10.8C11.1183 1.22222 11.4235 1.351 11.6485 1.58024C11.8736 1.80948 12 2.12029 12 2.44444V9.77778C12 10.1019 11.8736 10.4128 11.6485 10.642C11.4235 10.8712 11.1183 11 10.8 11H1.2C0.881738 11 0.576516 10.8712 0.351472 10.642C0.126428 10.4128 0 10.1019 0 9.77778V2.44444C0 2.12029 0.126428 1.80948 0.351472 1.58024C0.576516 1.351 0.881738 1.22222 1.2 1.22222ZM6 3.05556C5.20435 3.05556 4.44129 3.37752 3.87868 3.95054C3.31607 4.52356 3 5.30067 3 6.11111C3 6.92155 3.31607 7.69866 3.87868 8.27168C4.44129 8.8447 5.20435 9.16667 6 9.16667C6.79565 9.16667 7.55871 8.8447 8.12132 8.27168C8.68393 7.69866 9 6.92155 9 6.11111C9 5.30067 8.68393 4.52356 8.12132 3.95054C7.55871 3.37752 6.79565 3.05556 6 3.05556ZM6 4.27778C6.47739 4.27778 6.93524 4.46887 7.27279 4.81468C7.61035 5.16048 7.8 5.62492 7.8 6.11111C7.8 6.5973 7.61035 7.06174 7.27279 7.40754C6.93524 7.75335 6.47739 7.94444 6 7.94444C5.52261 7.94444 5.06476 7.75335 4.72721 7.40754C4.38965 7.06174 4.2 6.5973 4.2 6.11111C4.2 5.62492 4.38965 5.16048 4.72721 4.81468C5.06476 4.46887 5.52261 4.27778 6 4.27778Z" fill="#4E4646"/>
          </svg>
        </div>
      </div>

      {/* Name and Description */}
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="text-black text-center font-sans text-2xl font-semibold">
          {name}
        </div>
        <div className="flex justify-center items-center gap-2 self-stretch">
          {editMode ? (
            <input
              type="text"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onKeyDown={handleEditKeyDown}
              onBlur={handleEditSubmit}
              autoFocus
              className="text-black text-center font-sans text-sm font-medium leading-[19px] border-b border-black-300 outline-none bg-transparent"
              placeholder="자기소개를 입력하세요"
            />
          ) : (
            <>
              <div className="text-black text-center font-sans text-sm font-medium leading-[19px]">
                {description}
              </div>
              <button onClick={() => { setEditMode(true); setEditValue(description); }} className="w-4 h-4 flex items-center justify-center">
                <ReWrite fill='#AFA9A9'/>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
