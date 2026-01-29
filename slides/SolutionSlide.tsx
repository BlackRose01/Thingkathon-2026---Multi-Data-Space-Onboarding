
import React from 'react';
import OnboardingFlow from '../OnboardingFlow';

interface SolutionSlideProps {
    onDemoComplete: () => void;
}

const SolutionSlide: React.FC<SolutionSlideProps> = ({ onDemoComplete }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
             <div className="absolute top-0 left-0 right-0 p-4 text-center">
                 <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Our Solution</h2>
                 <p className="text-slate-500">A clickable prototype of the future onboarding experience.</p>
                 <p className="text-xs text-slate-400 mt-2">Please complete the onboarding flow to proceed to the next slide.</p>
            </div>
            <div className="w-full h-full pt-28">
                <OnboardingFlow onComplete={onDemoComplete} />
            </div>
        </div>
    );
};

export default SolutionSlide;
