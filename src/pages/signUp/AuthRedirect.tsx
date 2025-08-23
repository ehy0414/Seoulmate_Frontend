import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import Spinner from "../../components/signup/langTest/Spinner";

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

        } catch (err) {
        console.error(err);
        navigate("/"); // 에러 시 홈
        }
    };

    checkAuth();
    }, [navigate]);

  return <div className="flex justify-center pt-[300px]"><Spinner text="로그인 중입니다."/></div>;
}
