import { useNavigate, type NavigateFunction } from "react-router-dom";
import { ProgressBar } from "../components/signup/ProgressBar";
import { NavigationButtons } from "../components/signup/NavigationButtons";

const SignUpLangTestPage = () => {
    const navigate:NavigateFunction = useNavigate();

    const handleNext = () => {
        navigate("/signUp/hobby");
    };

    const handlePrevious = () => {
        // console.log('Previous clicked');
        navigate(-1);
    };

    return(
        <main className="box-border border border-gray-200 flex overflow-hidden flex-col items-center px-6 pt-6 pb-2 mx-auto w-full h-screen bg-white max-w-[393px]">
            <header className="fixed mx-4 top-0 z-40 w-[360px] bg-white pb-4">
                <ProgressBar currentStep={2} />
        
        
                 <div className="absolute text-2xl font-semibold left-0 text-zinc-900 top-[100px] w-full">
                  <div className=" text-2xl font-bold text-zinc-900">
                    <h1>언어레벨 테스트</h1>
                  </div>
                </div>
              </header>

            <NavigationButtons
                selectedCount={10}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onCount={false}
            />
        </main>
    )
}

export default SignUpLangTestPage;