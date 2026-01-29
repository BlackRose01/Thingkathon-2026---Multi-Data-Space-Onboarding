
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { OnboardingStep, CopilotMessage } from '../types';
import OnboardingLayout from '../components/OnboardingLayout';

const CheckCircleIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const UploadCloudIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>;

interface CertificationItemProps {
    id: string;
    label: string;
    onStatusChange: (id: string, label: string, isComplete: boolean) => void;
}

const CertificationItem: React.FC<CertificationItemProps> = ({ id, label, onStatusChange }) => {
    const [selection, setSelection] = useState<'wallet' | 'upload' | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const isComplete = selection === 'wallet' || (selection === 'upload' && !!file);
        onStatusChange(id, label, isComplete);
    }, [selection, file, id, label, onStatusChange]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-white">
            <p className="font-semibold text-slate-800">{label}</p>
            <div className="mt-3 flex items-center space-x-4">
                <button onClick={() => setSelection('wallet')} className={`px-4 py-1.5 text-sm rounded-md ${selection === 'wallet' ? 'bg-[#002366] text-white' : 'bg-slate-200 text-slate-700'}`}>In Wallet</button>
                <button onClick={() => setSelection('upload')} className={`px-4 py-1.5 text-sm rounded-md ${selection === 'upload' ? 'bg-[#002366] text-white' : 'bg-slate-200 text-slate-700'}`}>Upload</button>
            </div>
            {selection === 'upload' && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" />
                    {file ? (
                        <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-md">
                            <span className="text-sm font-medium text-green-800 truncate">{file.name}</span>
                            <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                        </div>
                    ) : (
                        <button onClick={() => fileInputRef.current?.click()} className="w-full flex justify-center items-center px-4 py-2 border-2 border-dashed border-slate-300 rounded-md text-sm font-medium text-slate-500 hover:border-[#00d1c1] hover:text-[#00d1c1] transition-colors">
                            <UploadCloudIcon className="h-5 w-5 mr-2" />
                            Upload Certificate
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

interface IndustryLevelScreenProps {
    onNext: () => void;
    onBack: () => void;
    onCertsChange: (certs: Record<string, string>) => void;
}

const IndustryLevelScreen: React.FC<IndustryLevelScreenProps> = ({ onNext, onBack, onCertsChange }) => {
    const [completionStatus, setCompletionStatus] = useState<Record<string, {label: string, isComplete: boolean}>>({
        iso9001: {label: "ISO 9001 - Quality Management", isComplete: false },
        iso27001: {label: "ISO/IEC 27001 - Information Security", isComplete: false },
        tisax: {label: "TISAX - Trusted Information Security Assessment Exchange", isComplete: false },
    });
    
    const copilotMessage: CopilotMessage = {
        text: "Confirm your existing certifications or provide verification for those you don't hold. This strengthens your digital business profile.",
        status: 'idle'
    };
    
    const handleStatusChange = useCallback((id: string, label: string, isComplete: boolean) => {
        setCompletionStatus(prev => {
            const newState = { ...prev, [id]: { label, isComplete } };
            
            const completedCerts = Object.entries(newState)
                // FIX: Cast value to its expected type to allow property access.
                .filter(([, value]) => (value as { isComplete: boolean }).isComplete)
                .reduce((acc, [key, value]) => {
                    // FIX: Cast value to its expected type to allow property access.
                    acc[key] = (value as { label: string }).label;
                    return acc;
                }, {} as Record<string, string>);

            onCertsChange(completedCerts);
            return newState;
        });
    }, [onCertsChange]);

    // FIX: Cast status to its expected type to allow property access.
    const isAllComplete = Object.values(completionStatus).every(status => (status as { isComplete: boolean }).isComplete);

    return (
        <OnboardingLayout
            title="Industry Compliance"
            description="Please provide the following certifications."
            onNext={onNext}
            onBack={onBack}
            currentStep={OnboardingStep.IndustryLevel}
            copilotMessage={copilotMessage}
            isNextDisabled={!isAllComplete}
        >
            <div className="space-y-4">
               <CertificationItem id="iso9001" label={completionStatus.iso9001.label} onStatusChange={handleStatusChange} />
               <CertificationItem id="iso27001" label={completionStatus.iso27001.label} onStatusChange={handleStatusChange} />
               <CertificationItem id="tisax" label={completionStatus.tisax.label} onStatusChange={handleStatusChange} />
            </div>
        </OnboardingLayout>
    );
};

export default IndustryLevelScreen;
