import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { SchoolVerificationStatus } from '../../components/signup/waitVerify/SchoolVerificationStatus';
import api from '../../services/axios';
import { useEffect } from 'react';

export const SchoolVerificationPage = () => {

  const navigate: NavigateFunction = useNavigate();

  const univVerificate = async () => {
    try {
      const response = await api.get("/signup/in-progress");
      if(response.data.data.univVerification === "VERIFIED") {
        navigate("/home");
      } else if (response.data.data.univVerification === "NOT_SUBMITTED") {
        alert("대학 인증이 거절되었습니다. 다시 시도해주세요.");
        navigate("/");
      }
      
      
    } catch (error) {
      console.error("학교 인증 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    univVerificate();
  }, []);

  return (
    <main className="relative mx-auto my-0 bg-white h-[852px] max-w-[clamp(360px,100vw,430px)]">
      <SchoolVerificationStatus />
    </main>
  );
};

export default SchoolVerificationPage;
