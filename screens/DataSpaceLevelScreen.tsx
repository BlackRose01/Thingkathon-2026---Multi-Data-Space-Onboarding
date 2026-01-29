
import React, { useState, useEffect } from 'react';
import { OnboardingStep, CopilotMessage } from '../types';
import OnboardingLayout from '../components/OnboardingLayout';

const AgreementCheckbox: React.FC<{ id: string; name: string; label: string; description: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ id, name, label, description, checked, onChange }) => (
    <div className="relative flex items-start p-4 border rounded-lg hover:bg-slate-50">
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
            <label htmlFor={id} className="font-semibold text-slate-800">{label}</label>
            <p className="text-slate-500">{description}</p>
        </div>
    </div>
);


const DataSpaceLevelScreen: React.FC<{ onNext: () => void; onBack: () => void; }> = ({ onNext, onBack }) => {
    const [agreements, setAgreements] = useState({
        terms: false,
        coc: false,
    });
    
    const copilotMessage: CopilotMessage = {
        text: "To participate, you must agree to the foundational rules of the data space. These ensure fair and secure collaboration for everyone.",
        status: 'idle'
    };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setAgreements(prev => ({ ...prev, [name]: checked }));
    };

    const isComplete = Object.values(agreements).every(Boolean);

    return (
        <OnboardingLayout
            title="Data Space Compliance"
            description="Please review and accept the terms that govern participation in the Multi Data Space."
            onNext={onNext}
            onBack={onBack}
            isNextDisabled={!isComplete}
            currentStep={OnboardingStep.DataSpaceLevel}
            copilotMessage={copilotMessage}
        >
            <div className="space-y-4">
               <AgreementCheckbox 
                    id="terms" 
                    name="terms" 
                    label="Terms of Service"
                    description="I accept the general terms for data usage, service provision, and liability."
                    checked={agreements.terms} 
                    onChange={handleCheckboxChange} 
                />
                <AgreementCheckbox 
                    id="coc" 
                    name="coc" 
                    label="Code of Conduct"
                    description="I agree to follow the principles of fair collaboration, data ethics, and responsible use."
                    checked={agreements.coc} 
                    onChange={handleCheckboxChange} 
                />
            </div>
        </OnboardingLayout>
    );
};

export default DataSpaceLevelScreen;
