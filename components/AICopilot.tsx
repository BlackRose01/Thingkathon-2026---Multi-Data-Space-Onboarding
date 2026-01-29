
import React from 'react';
import { CopilotMessage } from '../types';

interface AICopilotProps {
    message: CopilotMessage;
}

const RobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5a.75.75 0 01-1.5 0V7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5l.415-.207a.75.75 0 011.085.67V10.5a.75.75 0 01-1.5 0V7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 005.65-2.263V16.5a.75.75 0 00-.75-.75h-1.5a.75.75 0 01-.75-.75V13.5a.75.75 0 00-.75-.75H12a.75.75 0 00-.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 00-.75.75v2.237A8.25 8.25 0 0012 21z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.75v-.063a.75.75 0 01.65-.74 12.02 12.02 0 016.1-1.735 12.02 12.02 0 016.1 1.735.75.75 0 01.65.74v.063" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25v-.063a.75.75 0 01.65-.74 12.02 12.02 0 016.1-1.735 12.02 12.02 0 016.1 1.735.75.75 0 01.65.74v.063" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 3z" />
  </svg>
);

const ThinkingIcon = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#00d1c1]"></div>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00d1c1]" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


const AICopilot: React.FC<AICopilotProps> = ({ message }) => {
    const getStatusIcon = () => {
        switch(message.status) {
            case 'thinking':
                return <ThinkingIcon />;
            case 'success':
                return <CheckCircleIcon />;
            default:
                return null;
        }
    }

    return (
        <div className="bg-slate-900/30 border-l-4 border-[#00d1c1] p-4 rounded-r-lg hidden">
            <div className="flex items-center">
                <div className="flex-shrink-0 text-[#00d1c1]">
                    <RobotIcon />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-semibold text-white">AI Onboarding Copilot</p>
                </div>
            </div>
            <div className="mt-3 flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon()}
                </div>
                <p className="ml-3 text-sm text-slate-300">{message.text}</p>
            </div>
        </div>
    );
};

export default AICopilot;
