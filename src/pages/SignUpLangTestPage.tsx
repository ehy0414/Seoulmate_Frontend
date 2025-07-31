// SignUpLangTestPage.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgressBar } from "../components/signup/ProgressBar";
import AudioRecorder from "../components/signup/langTest/AudioRecorder";
import { NavigationButtons } from "../components/signup/langTest/NavigationButtons";

const SignUpLangTestPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const country = location.state.country;
    const [isKorean, setIsKorean] = useState<boolean>(); 
    const [score, setScore] = useState<number | null>(null);
    // 다음 버튼 활성화 조건
    const isNextEnabled = score !== null;
    // 국적 데이터 넘어오는 지 확인
    // console.log(location.state.country);

    useEffect(() => {
        if(country === "대한민국") {
            setIsKorean(true);
        } else {
            setIsKorean(false);
        }
    },[country]);


    const handleNext = async () => {
        if (score === null) return alert("녹음을 완료하고 점수를 받아야 합니다.");

        try {
            await fetch("/api/saveScore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score, country }),
            });

            navigate("/signUp/hobby");
        } catch (err) {
            alert("점수 저장에 실패했습니다.");
        }
    };

    // 이전 핸들러
    const handlePrevious = () => {
        // -1이 이전 페이지로 돌아가게 함
        navigate(-1);
    };

  return (
    <main className="flex overflow-hidden flex-col items-center px-6 pt-[150px] pb-2 mx-auto w-full h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
        <div className="fixed mx-4 top-0 z-40 w-[360px] bg-white pb-10">
            <ProgressBar currentStep={2} />
            <div className="absolute text-2xl font-semibold left-0 text-zinc-900 bottom-10 top-[100px] w-full">
                <h1 className="text-2xl font-bold text-zinc-900 mb-2">언어레벨 테스트</h1>
                 <p className=" h-3.5 text-xs font-medium left-0 text-neutral-400 w-full">
                    <span className="text-xs text-neutral-400 mt-2">
                    {isKorean ? `영어 테스트: 영어를 녹음해서 제출해주세요!` : `한국어 테스트: 한국어를 녹음해서 제출해주세요!`}
                    </span>
                </p>
            </div>
            
        </div>

        <AudioRecorder onScoreReady={setScore} />

        <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            nextDisabled={isNextEnabled}
        />
    </main>
  );
};

export default SignUpLangTestPage;
