
import React from 'react';

const StateOfTheArtSlide: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-16 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">State of the Art</h2>
            <div className="w-full aspect-video bg-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-400">
                <img src="form.gif" style={{height: "95%"}} />
            </div>
        </div>
    );
};

export default StateOfTheArtSlide;
