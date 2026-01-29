
import React from 'react';

interface WelcomeScreenProps {
    onNext: () => void;
}

const LogoIcon = () => (
    <svg className="h-16 w-16 text-[#002366]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl border border-slate-200/50 p-8 md:p-16 text-center flex flex-col items-center">
            <LogoIcon />
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mt-6">Welcome to the Multi Data Space</h1>
            <p className="text-slate-500 mt-4 max-w-2xl">
                Onboard your organization seamlessly into the Catena-X ecosystem. Our process (Vision 2028) makes joining secure, simple, and fast.
            </p>
            <div className="mt-10">
                <button
                    onClick={onNext}
                    className="px-10 py-4 text-lg text-white font-semibold rounded-lg bg-[#002366] hover:bg-[#001b4d] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    Begin Onboarding
                </button>
            </div>
            <p className="text-xs text-slate-400 mt-8">
                This is a clickable prototype demonstrating a future vision of SME onboarding.
            </p>
        </div>
    );
};

export default WelcomeScreen;
