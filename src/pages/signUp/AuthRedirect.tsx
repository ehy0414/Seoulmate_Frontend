import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function AuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/auth/profile-info")
            .then(res => {
            const data = res.data.data; // 바로 꺼내기
            //console.log("API data:", res.data);
            localStorage.setItem("sessionId", data.sessionId);

            if (res.data.code === "SIGNUP 200") {
                // 회원가입 안 된 경우
                navigate("/signUp/profile", { state: data });
            }
            else if (data.univVerification === "SUBMITTED") {
                // 학교 인증 진행 중
                navigate("/signUp/wait", { state: data });
            } 
            else {
                // 이미 가입 완료
                navigate("/home", { state: data });
            }
            })
            .catch(err => {
            console.error(err);
            navigate("/");
            });
    }, [navigate]);



    return <p>로그인 처리 중...</p>;
}
