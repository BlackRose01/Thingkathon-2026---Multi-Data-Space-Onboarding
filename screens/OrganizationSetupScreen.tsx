
import React, { useState, useEffect } from 'react';
import { OnboardingStep, CopilotMessage } from '../types';
import OnboardingLayout from '../components/OnboardingLayout';

const OrganizationIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m6 0h.008v.008H21V3z" />
    </svg>
);

const OrganizationSetupScreen: React.FC<{ onNext: () => void; onBack: () => void; }> = ({ onNext, onBack }) => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [copilotMessage, setCopilotMessage] = useState<CopilotMessage>({
        text: 'Now that your personal identity is confirmed, I will use your authorization to retrieve your company\'s details from the official business registry.',
        status: 'thinking',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDataLoaded(true);
            setCopilotMessage({ text: 'I\'ve found your organization\'s verified data. Please review and confirm it below.', status: 'success' });
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const DataField = ({ label, value, loading }: { label: string; value: string; loading: boolean; }) => (
        <div>
            <label className="block text-sm font-medium text-slate-500">{label}</label>
            {loading ? (
                 <div className="mt-1 h-8 w-3/4 bg-slate-200 rounded animate-pulse"></div>
            ) : (
                <p className="mt-1 text-slate-800 font-semibold">{value}</p>
            )}
        </div>
    );
    
    return (
        <OnboardingLayout
            title="Accessing Company Information"
            description="Your organization's identity is verified through trusted digital credentials, ensuring a secure network."
            onNext={onNext}
            onBack={onBack}
            isNextDisabled={!isDataLoaded}
            nextButtonText="Confirm Details"
            currentStep={OnboardingStep.OrganizationSetup}
            copilotMessage={copilotMessage}
        >
            <div className="space-y-6 p-6 border bg-slate-50/70 border-slate-200 rounded-lg">
                <div className="flex items-center pb-4 border-b border-slate-200">
                    <OrganizationIcon className="h-8 w-8 text-[#002366]" />
                    <h3 className="ml-3 text-xl font-bold text-slate-900">Verified Organization Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DataField label="Legal Name" value="Vibe Chemicals GmbH" loading={!isDataLoaded} />
                    <DataField label="Registration Number" value="HRB 12345" loading={!isDataLoaded} />
                    <DataField label="Country" value="Germany" loading={!isDataLoaded} />
                    <DataField label="Address" value="Industriestraße 1, 12345 Berlin" loading={!isDataLoaded} />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-500">Your Role</label>
                    {isDataLoaded ? (
                        <select className="mt-1 block w-full md:w-1/2 p-2 border border-slate-300 rounded-md shadow-sm focus:ring-[#00d1c1] focus:border-[#00d1c1]">
                            <option>Data Space Administrator</option>
                            <option>Business User</option>
                            <option>IT Contact</option>
                        </select>
                    ) : (
                        <div className="mt-1 h-10 w-1/2 bg-slate-200 rounded animate-pulse"></div>
                    )}
                </div>
            </div>

            <div className="space-y-6 p-6 border bg-slate-50/70 border-slate-200 rounded-lg mt-10">
                <div className="flex items-center pb-4 border-b border-slate-200">
                    <OrganizationIcon className="h-8 w-8 text-[#002366]" />
                    <h3 className="ml-3 text-xl font-bold text-slate-900">Verified Person Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DataField label="Name" value="Justus Aurelis von Haucap" loading={!isDataLoaded} />
                    <DataField label="" value="" loading={false} />
                    <DataField label="Country" value="Germany" loading={!isDataLoaded} />
                    <DataField label="Address" value="An der Promenade 1, 83684 Tegernsee" loading={!isDataLoaded} />
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default OrganizationSetupScreen;
