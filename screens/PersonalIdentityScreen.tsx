
import React, { useState, useEffect } from 'react';
import { OnboardingStep, CopilotMessage } from '../types';
import OnboardingLayout from '../components/OnboardingLayout';

const EidasIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM11 11H7V13H11V16L15 12L11 8V11ZM16 11V13H17V11H16Z" />
        <path d="M12 2L11.96 2.01C6.46 2.05 2.05 6.46 2.01 11.96L2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4Z" fillOpacity="0.3" />
        <text x="12" y="16" fontSize="3.5" fill="white" textAnchor="middle" fontWeight="bold">EU</text>
    </svg>
);


const PersonalIdentityScreen: React.FC<{ onNext: () => void; onBack: () => void; }> = ({ onNext, onBack }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [copilotMessage, setCopilotMessage] = useState<CopilotMessage>({
        text: "To securely link you to your organization, we must first verify your personal identity using the EU's official eIDAS framework. This provides the highest level of trust.",
        status: 'thinking',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVerified(true);
            setCopilotMessage({ text: 'Your identity has been verified via the European Digital Identity Wallet. We can now proceed with your organization.', status: 'success' });
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <OnboardingLayout
            title="Verify Your Identity (eIDAS)"
            description="We'll use the European Digital Identity Wallet (EUDI) to confirm your identity with the highest level of assurance."
            onNext={onNext}
            onBack={onBack}
            isNextDisabled={!isVerified}
            currentStep={OnboardingStep.PersonalIdentityVerification}
            copilotMessage={copilotMessage}
        >
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 text-center">
                 <div className="flex justify-center mb-4">
                     <img src="/eidas.png" className="h-20" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Verifying with <b>electronic IDentification, Authentication and trust Services</b></h3>

                <div className="mt-6">
                    {isVerified ? (
                        <div className="inline-flex items-center text-[#004d48] bg-[#00d1c1]/10 p-3 rounded-lg">
                            <svg className="h-6 w-6 mr-2 text-[#00d1c1]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            <div>
                                <span className="font-semibold text-sm">Identity Verified</span>
                            </div>
                        </div>
                    ) : (
                        <div className="inline-flex items-center text-yellow-800 bg-yellow-100 p-3 rounded-lg">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-500 mr-2"></div>
                            <span className="font-semibold text-sm">Requesting confirmation from your EUDI Wallet...</span>
                        </div>
                    )}
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default PersonalIdentityScreen;
