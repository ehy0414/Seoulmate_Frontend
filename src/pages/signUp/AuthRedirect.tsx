import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
        try {
        const profileRes = await api.get("/auth/profile-info");
        const profileData = profileRes.data.data;
        localStorage.setItem("sessionId", profileData.sessionId);

        // 1. 회원가입 안 된 경우
        if (profileRes.data.code === "SIGNUP 200") {
            navigate("/signUp/profile");
            return;
        }

        // 2. 회원가입 시작된 사용자만 in-progress 확인
        const inProgressRes = await api.get("/signup/in-progress", { withCredentials: true });
        const inProgressData = inProgressRes.data.data;

        if (inProgressData.univVerification === "verified") {
            navigate("/signUp/wait");
        } else if (inProgressData.univVerification === "SUBMITTED") {
            navigate("/home");
        } else {
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
