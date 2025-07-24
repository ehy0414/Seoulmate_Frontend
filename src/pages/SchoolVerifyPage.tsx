"use client";

import { useState } from "react";
import { ProgressBar } from "../components/signup/ProgressBar";
import { SubmitButton } from "../components/signup/SubmitButton";
import { SchoolDropdown } from "../components/signup/schoolVerify/SchoolDropdown";
import { FileUploadField } from "../components/signup/schoolVerify/FileUploadField";

export function SchoolVerifyPage() {
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleNext = () => {
    // Handle form submission logic here
    console.log("Selected school:", selectedSchool);
    console.log("Selected file:", selectedFile);
  };

  const isFormValid = selectedSchool && selectedFile;

  return (

    <main className="box-border border border-gray-200 flex overflow-hidden flex-col pt-[300px] pb-[100px] mx-auto w-full bg-white h-[737px] max-w-[393px]">
        
        <header className="fixed mx-4 top-0 z-40 w-[360px] bg-white pb-4">
                <ProgressBar currentStep={4} />
        
        
                 <div className="absolute text-2xl font-semibold left-0 text-zinc-900 top-[100px] w-full">
                  <div className=" text-2xl font-bold text-zinc-900">
                    <h1>학교인증</h1>
                  </div>
        
                  <p className="absolute h-3.5 text-xs font-medium left-0 text-neutral-400 top-[40px] w-full">
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
