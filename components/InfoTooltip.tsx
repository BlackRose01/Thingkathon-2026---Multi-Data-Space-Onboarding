
import React from 'react';

interface InfoTooltipProps {
    text: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
    return (
        <div className="group relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 hidden group-hover:block bg-slate-700 text-white text-xs rounded py-2 px-3 z-10 shadow-lg">
                {text}
                <svg className="absolute text-slate-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                </svg>
            </div>
        </div>
    );
};

export default InfoTooltip;
