"use client";

import { useState } from "react";
import { ProgressBar } from "../../components/signup/ProgressBar";
import { SubmitButton } from "../../components/signup/SubmitButton";
import { SchoolDropdown } from "../../components/signup/schoolVerify/SchoolDropdown";
import { FileUploadField } from "../../components/signup/schoolVerify/FileUploadField";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import api from "../../services/axios";

export function SchoolVerifyPage() {
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate:NavigateFunction = useNavigate();

  const handleNext = async () => {
    console.log("Selected school:", selectedSchool);
    console.log("Selected file:", selectedFile);

    if (!selectedSchool || !selectedFile) {
      alert("모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("university", selectedSchool);   // 문자열
    formData.append("univCertificate", selectedFile); // 파일

    try {
      await api.post(`/signup/school`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("회원가입이 완료되었습니다!");
      navigate("/signUp/wait");
    } catch (error) {
      alert("업로드 실패: " + error);
      console.error(error);
    }
  };

  
  return (
    <main className="flex flex-col items-center px-6 pt-[200px] pb-24 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
        
        <header className="fixed mx-4 top-0 z-40 w-[360px] h-44 bg-white pb-4">
          <ProgressBar currentStep={4} />

          <div className="absolute text-2xl font-semibold left-0 text-zinc-900 top-[100px] w-full">
            <div className=" text-2xl font-bold text-zinc-900">
              <h1>학교인증</h1>
            </div>

            <p className=" h-3.5 text-xs font-medium left-0 text-neutral-400 top-[40px] w-full">
              <span className="text-xs text-neutral-400 mt-2">
              인증서를 직접 확인하기 때문에 2-3일 정도 소요됩니다.
              </span>
            </p>
          </div>
        </header>


        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <SchoolDropdown
            value={selectedSchool}
            onChange={setSelectedSchool}
          />

          <FileUploadField
            onFileSelect={setSelectedFile}
          />

          <SubmitButton />
        </form>
      </main>
  );
}

export default SchoolVerifyPage;
