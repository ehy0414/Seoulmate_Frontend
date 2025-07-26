"use client";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useState } from "react";
import { ProgressBar } from "../components/signup/ProgressBar";
import { ProfileImageUpload } from "../components/signup/profile/ProfileImageUpload";
import { FormField } from "../components/signup/profile/FormField";
import { DropdownField } from "../components/signup/profile/DropdownField";
import { TextAreaField } from "../components/signup/profile/TextAreaField";
import { SubmitButton } from "../components/signup/SubmitButton";


interface FormData {
  firstName: string;
  lastName: string;
  DOB: string; //생년월일
  country: string;
  bio: string; //자기소개
  profileImage: string;
}

export const SignUpProfilePage: React.FC = () => {
  const navigate:NavigateFunction = useNavigate();
  const [profileFile, setProfileFile] = useState<File | null>(null); // 실제 이미지 파일

  // 서버에 보낼 formData
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    DOB: '',
    country: '',
    bio: '',
    profileImage: ''
  });

  const nationalityOptions = [
    '대한민국',
    '미국',
    '일본',
    '중국',
    '영국',
    '독일',
    '프랑스',
    '기타'
  ];

  // formData 핸들러 (성, 이름, 국가 등등)
  const handleFieldChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 이미지 핸들러
  const handleImageChange = (file: File) => {
    setProfileFile(file);
    setFormData(prev => ({
      ...prev,
      profileImage: URL.createObjectURL(file) // 미리보기 URL 저장
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();

    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("DOB", formData.DOB);
    data.append("country", formData.country);
    data.append("bio", formData.bio);

    if (profileFile) {
      data.append("profileImage", profileFile);
    }

    // 예시용 콘솔 로그, 실제 서버 전송 코드
    console.log('FormData values:', [...data.entries()]);

    // 예시용 서버에 보내기
    // await axios.post("/signup/create-profile", data, { headers: { "Content-Type": "multipart/form-data" } });

    navigate("/signUp/langTest");
  };


  const isFormValid = formData.lastName && formData.firstName && formData.DOB && formData.country;

  return (
    <main className="box-border border border-gray-200 flex overflow-hidden flex-col pt-[300px] pb-[100px] mx-auto w-full bg-white max-w-[393px]">
  
      <header className="fixed mx-4 top-0 z-40 w-[360px] bg-white pb-4">
        <ProgressBar currentStep={1} />


         <div className="absolute text-2xl font-semibold left-0 text-zinc-900 top-[100px] w-full">
          <div className=" text-2xl font-bold text-zinc-900">
            <h1>개인정보를 입력해주세요!</h1>
          </div>

          <p className="absolute h-3.5 text-xs font-medium left-0 text-neutral-400 top-[40px] w-full">
            <span className="text-xs text-neutral-400 mt-2">
              아래 이름, 생년월일, 국적은 정확한 정보를 기입해주세요!
              <br />
              입력하신 정보를 기반으로 프로필이 생성됩니다
            </span>
          </p>
          <ProfileImageUpload
            onImageChange={handleImageChange}
            previewUrl={formData.profileImage}
          />
        </div>


        
      </header>
      
      <section className="self-center w-full font-medium h-[405px] max-w-[357px] mt-6">
        <FormField
          label="성"
          placeholder="성을 입력하세요."
          value={formData.lastName}
          onChange={handleFieldChange('lastName')}
        />

        <div className="mt-5">
          <FormField
            label="이름"
            placeholder="이름을 입력하세요."
            value={formData.firstName}
            onChange={handleFieldChange('firstName')}
          />
        </div>

        <div className="mt-5">
          <FormField
            label="생년월일"
            placeholder="생년월일을 입력하세요."
            type="date"
            value={formData.DOB}
            onChange={handleFieldChange('DOB')}
          />
        </div>

        <div className="mt-5">
          <DropdownField
            label="국적"
            placeholder="국적을 선택해주세요."
            value={formData.country}
            onChange={handleFieldChange('country')}
            options={nationalityOptions}
          />
        </div>

        <div className="mt-5">
          <TextAreaField
            label="자기소개"
            placeholder="자기소개를 입력해주세요"
            value={formData.bio}
            onChange={handleFieldChange('bio')}
            maxLength={120}
          />
        </div>
      </section>

      <SubmitButton
        onClick={handleSubmit}
        disabled={!isFormValid}
      />

      <div className="flex shrink-0 self-center mt-5 bg-black h-[5px] rounded-[100px] w-[140px]" />
    </main>
  );
};

export default SignUpProfilePage;
