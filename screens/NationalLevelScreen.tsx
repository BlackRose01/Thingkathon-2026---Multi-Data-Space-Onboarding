
import React, { useState, useRef } from 'react';
import { OnboardingStep, CopilotMessage } from '../types';
import OnboardingLayout from '../components/OnboardingLayout';
import InfoTooltip from '../components/InfoTooltip';

const CheckCircleIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const UploadCloudIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
);

const AgreementCheckbox: React.FC<{ id: string; name: string; label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ id, name, label, checked, onChange }) => (
    <div className="relative flex items-start">
        <div className="flex items-center h-5">
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="focus:ring-[#00d1c1] h-4 w-4 text-[#00d1c1] border-slate-300 rounded"
            />
        </div>
        <div className="ml-3 text-sm">
            <label htmlFor={id} className="font-medium text-slate-700">{label}</label>
        </div>
    </div>
);

const NationalLevelScreen: React.FC<{ onNext: () => void; onBack: () => void; }> = ({ onNext, onBack }) => {
    const [gdpr, setGdpr] = useState(false);
    const [affidavitFile, setAffidavitFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const copilotMessage: CopilotMessage = {
        text: "Please confirm your compliance with national regulations. This ensures your organization operates legally within your jurisdiction.",
        status: 'idle'
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAffidavitFile(e.target.files[0]);
        }
    };
    
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const isComplete = gdpr && !!affidavitFile;

    return (
        <OnboardingLayout
            title="National Compliance"
            description="Fulfill legal requirements specific to your country of operation."
            onNext={onNext}
            onBack={onBack}
            isNextDisabled={!isComplete}
            currentStep={OnboardingStep.NationalLevel}
            copilotMessage={copilotMessage}
        >
            <div className="p-6 bg-slate-50/70 border border-slate-200 rounded-lg space-y-6">
                <AgreementCheckbox id="gdpr" name="gdpr" label="I accept the GDPR and data processing terms." checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} />
                
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <label className="font-medium text-slate-700 text-sm">Eidesstattliche Erklärung (Affidavit)</label>
                        <InfoTooltip text="This is a legal document confirming the accuracy of your information for participation in the data space." />
                    </div>
                    <div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
                        {affidavitFile ? (
                            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-md">
                                <span className="text-sm font-medium text-green-800 truncate">{affidavitFile.name}</span>
                                <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                            </div>
                        ) : (
                            <button onClick={handleUploadClick} className="w-full flex justify-center items-center px-4 py-2 border-2 border-dashed border-slate-300 rounded-md text-sm font-medium text-slate-500 hover:border-[#00d1c1] hover:text-[#00d1c1] transition-colors">
                                <UploadCloudIcon className="h-5 w-5 mr-2" />
                                Upload Document
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default NationalLevelScreen;
