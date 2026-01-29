
import React, { useState, useEffect } from 'react';
import TitleSlide from './slides/TitleSlide';
import TeamSlide from './slides/TeamSlide';
import StateOfTheArtSlide from './slides/StateOfTheArtSlide';
import RequirementsSlide from './slides/RequirementsSlide';
import SolutionSlide from './slides/SolutionSlide';
import ChallengesSlide from './slides/ChallengesSlide';
import ThankYouSlide from './slides/ThankYouSlide';

const totalSlides = 7;

const App: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDemoCompleted, setIsDemoCompleted] = useState(true);

    const handleNext = () => {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
    };

    const handleBack = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
    };
    
    // Allow keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                // Allow advancing from solution slide only if demo is complete
                if (currentSlide === 4 && !isDemoCompleted) return;
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handleBack();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide, isDemoCompleted]);


    const renderSlide = () => {
        switch (currentSlide) {
            case 0: return <TitleSlide />;
            case 1: return <TeamSlide />;
            case 2: return <StateOfTheArtSlide />;
            case 3: return <RequirementsSlide />;
            case 4: return <SolutionSlide onDemoComplete={() => setIsDemoCompleted(true)} />;
            case 5: return <ChallengesSlide />;
            case 6: return <ThankYouSlide />;
            default: return <TitleSlide />;
        }
    };
    
    // The first slide (index 0) is a special case without standard navigation
    if (currentSlide === 0) {
        return (
            <div className="min-h-screen bg-slate-100/50 flex flex-col items-center justify-center p-4 lg:p-8">
                <TitleSlide onStart={handleNext} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100/50 flex flex-col items-center justify-center p-4 lg:p-8">
            <div className="w-full h-full flex-grow flex items-center justify-center">
                 {renderSlide()}
            </div>
            <footer className="w-full max-w-6xl mx-auto mt-4 p-4 flex justify-between items-center text-slate-500">
                <button 
                    onClick={handleBack} 
                    disabled={currentSlide <= 1}
                    className="px-4 py-2 rounded-md hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    &larr; Previous
                </button>
                <span className="text-sm font-medium">Slide {currentSlide} / {totalSlides -1}</span>
                <button 
                    onClick={handleNext} 
                    disabled={currentSlide >= totalSlides - 1 || (currentSlide === 4 && !isDemoCompleted)}
                    className="px-4 py-2 rounded-md hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next &rarr;
                </button>
            </footer>
        </div>
    );
};

export default App;
