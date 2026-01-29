
import React from 'react';
import ProgressBar from './ProgressBar';
import AICopilot from './AICopilot';
import { OnboardingStep, CopilotMessage } from '../types';

interface OnboardingLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    onNext: () => void;
    onBack?: () => void;
    nextButtonText?: string;
    isNextDisabled?: boolean;
    currentStep: OnboardingStep;
    copilotMessage: CopilotMessage;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
    children,
    title,
    description,
    onNext,
    onBack,
    nextButtonText = 'Continue',
    isNextDisabled = false,
    currentStep,
    copilotMessage,
}) => {
    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl border border-slate-200/50 overflow-hidden my-8">
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-8 p-8 md:p-12 flex flex-col">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
                        <p className="text-slate-500 mt-2">{description}</p>
                    </header>
                    
                    <main className="flex-grow">
                        {children}
                    </main>

                    <footer className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
                        <div>
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                                >
                                    Back
                                </button>
                            )}
                        </div>
                        <button
                            onClick={onNext}
                            disabled={isNextDisabled}
                            className="px-8 py-3 text-white font-semibold rounded-md bg-[#002366] hover:bg-[#001b4d] disabled:bg-slate-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            {nextButtonText}
                        </button>
                    </footer>
                </div>
                
                <div className="lg:col-span-4 bg-[#002366] text-white p-8 flex flex-col">
                    <div className="sticky top-8">
                        <ProgressBar currentStep={currentStep} />
                        <div className="mt-10">
                           <AICopilot message={copilotMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingLayout;
