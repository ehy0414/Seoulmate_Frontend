import React from 'react';
import { SchoolVerificationStatus } from '../../components/signup/waitVerify/SchoolVerificationStatus';

export const SchoolVerificationPage: React.FC = () => {
  return (
    <main className="relative mx-auto my-0 bg-white h-[852px] max-w-[clamp(360px,100vw,430px)]">
      <SchoolVerificationStatus />
    </main>
  );
};

export default SchoolVerificationPage;
