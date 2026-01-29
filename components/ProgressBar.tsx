
import React from 'react';
import { ONBOARDING_STEPS } from '../constants';
import { OnboardingStep } from '../types';

interface ProgressBarProps {
    currentStep: OnboardingStep;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#002366]" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
    const currentIndex = ONBOARDING_STEPS.findIndex(step => step.id === currentStep);

    return (
        <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Onboarding Progress</h3>
            <nav aria-label="Progress">
                <ol role="list" className="space-y-4">
                    {ONBOARDING_STEPS.map((step, stepIdx) => {
                        const isCompleted = stepIdx < currentIndex;
                        const isCurrent = stepIdx === currentIndex;

                        return (
                            <li key={step.title} className="flex items-start">
                                <div className="flex-shrink-0">
                                    {isCompleted ? (
                                        <div className="h-8 w-8 rounded-full bg-[#00d1c1] flex items-center justify-center">
                                            <CheckIcon />
                                        </div>
                                    ) : (
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${isCurrent ? 'border-[#00d1c1]' : 'border-slate-500'}`}>
                                            <span className={`${isCurrent ? 'text-[#00d1c1]' : 'text-slate-400'} text-sm font-bold`}>{stepIdx + 1}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="ml-4 pt-1">
                                    <p className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-slate-300'}`}>{step.title}</p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default ProgressBar;
