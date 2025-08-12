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
                isHighlighted ? "bg-[#4C8ACD]" : "bg-stone-300"
              }`}
            >
              <span className="text-zinc-50">{stepNumber}</span>
            </div>

            {/* Connector */}
            {stepNumber < totalSteps && (
              stepNumber < currentStep
                    ? <div className="relative top-0 left-0 shrink-0 bg-slate-300 h-[3px] w-[72px]" />
                    : <div className="relative top-0 left-0 shrink-0 bg-stone-300 h-[3px] w-[72px]" />
              
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
