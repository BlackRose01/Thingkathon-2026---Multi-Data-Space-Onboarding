
import React from 'react';

interface TitleSlideProps {
    onStart: () => void;
}

const TitleSlide: React.FC<TitleSlideProps> = ({ onStart }) => {
    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-16 flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-slate-900 tracking-tight">Multi Data Space Onboarding</h1>
            <h2 className="text-2xl text-slate-500 mt-6 max-w-3xl">How to onboard companies to exchange data in different industries with clean UI</h2>
            <button
                onClick={onStart}
                className="mt-12 px-10 py-4 text-lg text-white font-semibold rounded-lg bg-[#002366] hover:bg-[#001b4d] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
                Start Presentation
            </button>
        </div>
    );
};

export default TitleSlide;
