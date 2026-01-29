
import React, { useState } from 'react';
import { OnboardingStep, CopilotMessage } from '../types';
import OnboardingLayout from '../components/OnboardingLayout';

const UserPlusIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21h-5.036A12.318 12.318 0 014 19.235z" />
    </svg>
);

const LinkIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);

interface OnboardingExperienceScreenProps {
    onNext: () => void;
    onBack: () => void;
    setHasExistingIdentity: (hasIdentity: boolean) => void;
    setDid: (did: string) => void;
}

const OnboardingExperienceScreen: React.FC<OnboardingExperienceScreenProps> = ({ onNext, onBack, setHasExistingIdentity, setDid: setAppDid }) => {
    const [selection, setSelection] = useState<'yes' | 'no' | null>(null);
    const [localDid, setLocalDid] = useState('did:web:catena-x-dataspace:BPNL0123567890');

    const copilotMessage: CopilotMessage = {
        text: "Let's get started. Please tell me if you've been onboarded to a Catena-X compliant data space before.",
        status: 'idle',
    };

    const handleSelect = (choice: 'yes' | 'no') => {
        setSelection(choice);
        setHasExistingIdentity(choice === 'yes');
        if (choice === 'no') {
            setAppDid(''); // Clear DID if user is new
        }
    };
    
    const handleContinue = () => {
        if (selection === 'yes') {
            setAppDid(localDid);
        }
        onNext();
    };

    const isNextDisabled = !selection || (selection === 'yes' && !localDid);

    const RadioOption: React.FC<{
        value: 'yes' | 'no';
        title: string;
        description: string;
        icon: React.ReactNode;
        children?: React.ReactNode;
    }> = ({ value, title, description, icon, children }) => {
        const isSelected = selection === value;
        return (
            <div
                onClick={() => handleSelect(value)}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'border-[#002366] bg-slate-50' : 'border-slate-300 hover:border-slate-400'}`}
            >
                <div className="flex items-center">
                    <div className="flex-shrink-0 text-[#002366]">{icon}</div>
                    <div className="ml-4">
                        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                        <p className="text-sm text-slate-500">{description}</p>
                    </div>
                </div>
                {isSelected && children && <div className="mt-4">{children}</div>}
            </div>
        );
    };

    return (
        <OnboardingLayout
            title="Your Onboarding"
            description="This helps us determine the fastest way to get you connected and operational in the data space."
            onNext={handleContinue}
            onBack={onBack}
            currentStep={OnboardingStep.OnboardingExperience}
            copilotMessage={copilotMessage}
            isNextDisabled={isNextDisabled}
        >
            <div className="space-y-4">
                <RadioOption
                    value="yes"
                    title="Yes, I have an existing identity"
                    description="I will connect using my Decentralized Identifier (DID)."
                    icon={<LinkIcon className="h-10 w-10" />}
                >
                    <div>
                        <label htmlFor="did" className="block text-sm font-medium text-slate-700">Decentralized Identifier (DID)</label>
                        <input
                            type="text"
                            id="did"
                            value={localDid}
                            onChange={(e) => setLocalDid(e.target.value)}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-[#00d1c1] focus:border-[#00d1c1] sm:text-sm p-2"
                            placeholder="did:web:..."
                            autoFocus
                        />
                    </div>
                </RadioOption>
                <RadioOption
                    value="no"
                    title="No, this is my first time"
                    description="I need a new identity for my organization."
                    icon={<UserPlusIcon className="h-10 w-10" />}
                />
            </div>
        </OnboardingLayout>
    );
};

export default OnboardingExperienceScreen;
