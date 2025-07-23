"use client";
import * as React from "react";
import { FormField } from "./FormField";
import { DropdownField } from "./DropdownField";
import { TextAreaField } from "./TextAreaField";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { SubmitButton } from "../SubmitButton";
import { ProgressBar } from "../ProgressBar";


interface FormData {
  lastName: string;
  firstName: string;
  birthDate: string;
  nationality: string;
  introduction: string;
}

export const Form: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    lastName: '',
    firstName: '',
    birthDate: '',
    nationality: '',
    introduction: ''
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

  const handleFieldChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const isFormValid = formData.lastName && formData.firstName && formData.birthDate && formData.nationality;

  return (
    <main className="box-border border border-gray-200 flex overflow-hidden flex-col pt-[300px] pb-[100px] mx-auto w-full bg-white max-w-[480px]">
  
      <header className="fixed mx-14 top-0 z-40 w-[380px] bg-white pb-4">
        <ProgressBar currentStep={1} />


         <div className="absolute text-2xl font-semibold left-0 text-zinc-900 top-[100px] w-full">
          <div className=" text-2xl font-bold text-zinc-900">
            <h1>개인정보를 입력해주세요!!</h1>
          </div>

          <p className="absolute h-3.5 text-xs font-medium left-0 text-neutral-400 top-[40px] w-full">
            <span className="text-xs text-neutral-400 mt-2">
              아래 이름, 생년월일, 국적은 정확한 정보를 기입해주세요!
              <br />
              입력하신 정보를 기반으로 프로필이 생성됩니다
            </span>
          </p>
          <ProfileImageUpload />
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
            value={formData.birthDate}
            onChange={handleFieldChange('birthDate')}
          />
        </div>

        <div className="mt-5">
          <DropdownField
            label="국적"
            placeholder="국적을 선택해주세요."
            value={formData.nationality}
            onChange={handleFieldChange('nationality')}
            options={nationalityOptions}
          />
        </div>

        <div className="mt-5">
          <TextAreaField
            label="자기소개"
            placeholder="자기소개를 입력해주세요"
            value={formData.introduction}
            onChange={handleFieldChange('introduction')}
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

export default Form;
