import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. 프로필 정보 가져오기
        const profileRes = await api.get("/auth/profile-info");
        const profileData = profileRes.data.data;
        localStorage.setItem("sessionId", profileData.sessionId);

        // 2. 회원가입 진행 상태 확인
        const inProgressRes = await api.get("/signup/in-progress");
        const inProgressData = inProgressRes.data.data;

        // 3. 조건부 리디렉션
        if (profileRes.data.code === "SIGNUP 200") {
          // 회원가입 안 된 경우
          navigate("/signUp/profile");
        } else if (inProgressData.univVerification === "verified") {
          // 학교 인증 중
          navigate("/signUp/wait");
        } else if (inProgressData.univVerification === "SUBMITTED") {
          // 인증 완료
          navigate("/home");
        } else {
          // 안전하게 홈으로
          navigate("/home");
        }
      } catch (err) {
        console.error(err);
        navigate("/"); // 에러 시 홈
      }
    };

    checkAuth();
  }, [navigate]);

  return <p>로그인 처리 중...</p>;
}
