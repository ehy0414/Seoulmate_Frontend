import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/signup/langTest/Spinner";
import { TextContent } from "../../components/signup/langTest/TextContent";
import { NavigationButtons } from "../../components/signup/langTest/NavigationButtons";
import { HeaderDetail } from "../../components/common/HeaderDetail";
import ReAudioRecorder from "./ReAudioRecorder";

const MyReLangTestPage = () => {
    const navigate = useNavigate();

    // // 테스트용
    const language = "한국어"
    const [isKorean, setIsKorean] = useState<boolean>(false); 
    const [score, setScore] = useState<number | null>(null);
    const [isSending, setIsSending] = useState<boolean>(false); // 로딩 상태를 관리하기 위한 상태 추가
    
    // 다음 버튼 활성화 조건
    const isNextEnabled = score !== null;

    useEffect(() => {
        if(language === "한국어") {
            setIsKorean(true);
        } else {
            setIsKorean(false);
        }
    },[language]);

    const handleNext = () => {
        navigate("myPage");
    };


    // 이전 핸들러
    const handlePrevious = () => {
        // -1이 이전 페이지로 돌아가게 함
        navigate(-1);
    };

    return (
        <main className="flex flex-col items-center px-6 pt-[150px] pb-2 mx-auto w-full h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
            {/* 로딩 상태일 때 화면 전체를 덮는 오버레이를 표시합니다. */}
            {isSending && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-700 bg-opacity-60">
                    <Spinner />
                </div>
            )}
            <div className="z-40 w-full mr-12">
                <HeaderDetail title="언어레벨 재응시" onBackClick={() => navigate(-1)} />
            </div>
            
            
            <div className="fixed mx-4 top-0 z-30 w-[360px] bg-white pb-52">
                <div className="absolute text-2xl font-semibold left-0 bg-white text-zinc-900 bottom-10 top-[100px] w-full">
                    <h1 className="text-2xl font-bold text-zinc-900 mb-2">언어레벨 테스트</h1>
                    <p className=" h-3.5 text-xs font-medium left-0 text-neutral-400 w-full">
                        <p className="text-xs text-neutral-400 mt-2">
                        {isKorean ? (<>영어 테스트를 진행할게요.<br/>마이크 버튼을 누르고 아래 문장을 또박또박 읽어주세요.</>
                            ) : (<>한국어 테스트를 진행할게요.<br />마이크 버튼을 누르고 아래 문장을 또박또박 읽어주세요.</>)}
                        </p>
                        <p className="text-primary-700 text-xs mt-2">
                            1분 이내로 말해야 해요.
                        </p>
                    </p>
                </div>
            </div>

            <div className="pb-20">
                <TextContent isKorean={isKorean}/>
                <ReAudioRecorder onScoreReady={setScore} setIsSending={setIsSending} isKorean={isKorean}/>
            </div>
            
            <div className="w-full flex justify-between bottom-0 left-0 bg-white py-4">
                <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    nextDisabled={isNextEnabled}
                />
            </div>
            
        </main>
    );
};

export default MyReLangTestPage;
