import * as React from "react";

interface ProgressIndicatorProps {
  currentStep?: number;
  totalSteps?: number;
}

export const ProgressBar: React.FC<ProgressIndicatorProps> = ({
  currentStep = 1,
  totalSteps = 4
}) => {
  return (
    <nav className="fixed top-0 mx-auto flex gap-2 items-center mt-9 text-xs font-medium text-center whitespace-nowrap text-zinc-50">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isHighlighted = stepNumber <= currentStep;

        return (
          <React.Fragment key={stepNumber}>
            {/* Step Circle */}
            <div
              className={`flex flex-col justify-center items-center self-stretch my-auto w-6 h-6 rounded-3xl min-h-6 ${
                isHighlighted ? "bg-yellow-300" : "bg-stone-300"
              }`}
            >
              <span className="text-zinc-50">{stepNumber}</span>
            </div>

            {/* Connector */}
            {stepNumber < totalSteps && (
              <img
                src={
                  stepNumber < currentStep
                    ? "https://api.builder.io/api/v1/image/assets/TEMP/beb091b81f1e69fbab7640755b927cb017543602?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
                    : "https://api.builder.io/api/v1/image/assets/TEMP/b40b1b28d633ea1766955b1d37f3ac1277e0c09a?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c"
                }
                className={`object-contain shrink-0 self-stretch my-auto rounded-xl aspect-[23.81] w-[72px]`}
                alt="Progress connector"
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
