import React from 'react';
import { SchoolVerificationStatus } from '../components/signup/waitVerify/SchoolVerificationStatus';

export const SchoolVerificationPage: React.FC = () => {
  return (
    <main className="border border-gray-200 relative mx-auto my-0 bg-white h-[852px] w-[393px]">
      <SchoolVerificationStatus />
    </main>
  );
};

export default SchoolVerificationPage;
