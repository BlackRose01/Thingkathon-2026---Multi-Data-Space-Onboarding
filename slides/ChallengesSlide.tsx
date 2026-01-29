
import React from 'react';

const TopicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
        {/* The bulb shape */}
        <path
            d="M12 3a6 6 0 00-6 6c0 2.21 1.2 4.156 3 5.188V18h6v-3.812C16.8 13.156 18 11.21 18 9a6 6 0 00-6-6z"
            fill="#FBBF24" // Yellow fill for the bulb
            stroke="black" // Black outline for the bulb
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* The socket/base shape */}
        <path
            d="M9 18h6v4H9z"
            fill="black" // Black fill for the socket
            stroke="black" // Black outline for the socket to be consistent
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ChallengeItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center mx-auto">
        <div className="flex-shrink-0 mt-1 w-5">
            <TopicIcon style={{ backgroundColor: "yellow" }} />
        </div>
        <span className="ml-3 text-lg text-slate-700">{children}</span>
    </li>
);

const ChallengesSlide: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-16">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-12 text-center">Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <ul className="space-y-6">
                    <ChallengeItem>Governance</ChallengeItem>
                    <ChallengeItem>Credentials compatibility</ChallengeItem>
                    <ChallengeItem>Architecture Integration</ChallengeItem>
                </ul>
                <ul className="space-y-6">
                    <ChallengeItem>Onthology Gaia-x (AI RAG)</ChallengeItem>
                    <ChallengeItem>Protocol Integration</ChallengeItem>
                    <ChallengeItem>Digital CH-Integration in Tractus-X</ChallengeItem>
                </ul>
            </div>
        </div>
    );
};

export default ChallengesSlide;
