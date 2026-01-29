
import React from 'react';

interface CompletionScreenProps {
    onRestart: () => void;
    onFinish: () => void;
}

const CompletionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#00d1c1]" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


const CompletionScreen: React.FC<CompletionScreenProps> = ({ onRestart, onFinish }) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl border border-slate-200/50 p-8 md:p-16 text-center flex flex-col items-center">
            <CompletionIcon />
            <h1 className="text-4xl font-bold text-slate-900 mt-6 tracking-tight">Onboarding Complete!</h1>
            <p className="text-slate-500 mt-4 max-w-2xl">
                Congratulations, Vibe Chemicals GmbH is now an active participant in the Multi Data Space. Your dashboard is successfully loaded and you can start collaborating.
            </p>
            <div className="mt-10 flex items-center space-x-4">
                <button
                    onClick={onFinish}
                    className="px-8 py-3 text-white font-semibold rounded-md bg-[#002366] hover:bg-[#001b4d] transition-all shadow-md hover:shadow-lg"
                >
                    Finish Demo
                </button>
                 <button
                    onClick={onRestart}
                    className="px-8 py-3 text-slate-600 font-semibold rounded-md bg-slate-100 hover:bg-slate-200 transition-all"
                >
                    Restart Demo
                </button>
            </div>
        </div>
    );
};

export default CompletionScreen;
