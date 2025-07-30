import React from 'react';
import { InfoIcon } from './InfoIcon';

export const SchoolVerificationStatus: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-center relative">
      <InfoIcon
        className="mb-6"
        size={26}
        color="#1A1A1A"
      />

      <h1 className="text-2xl font-bold text-black max-sm:text-xl mb-3">
        학교 인증 처리 진행 중입니다.
      </h1>

      <p className="text-sm font-light leading-5 text-stone-700 max-sm:text-xs">
        학교 수동 인증에 약 2-3일 소요됩니다.
      </p>
    </div>
  );
};
