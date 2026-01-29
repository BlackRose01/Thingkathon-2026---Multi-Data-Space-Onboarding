
import React, { useState, useEffect } from 'react';
import { OnboardingStep } from './types';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingExperienceScreen from './screens/OnboardingExperienceScreen';
import WalletConnectScreen from './screens/WalletConnectScreen';
import PersonalIdentityScreen from './screens/PersonalIdentityScreen';
import OrganizationSetupScreen from './screens/OrganizationSetupScreen';
import DataSpaceLevelScreen from './screens/DataSpaceLevelScreen';
import NationalLevelScreen from './screens/NationalLevelScreen';
import IndustryLevelScreen from './screens/IndustryLevelScreen';
import SummaryScreen from './screens/SummaryScreen';
import CompletionScreen from './screens/CompletionScreen';
import { ONBOARDING_STEPS } from './constants';

interface OnboardingFlowProps {
    onComplete: () => void;
}


const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.Welcome);
    const [hasExistingIdentity, setHasExistingIdentity] = useState<boolean | null>(null);
    const [did, setDid] = useState('');
    const [industryCertifications, setIndustryCertifications] = useState<Record<string, string>>({});

    const handleNext = () => {
        const currentIndex = ONBOARDING_STEPS.findIndex(step => step.id === currentStep);
        let nextStepId: OnboardingStep | undefined = ONBOARDING_STEPS[currentIndex + 1]?.id;

        if (currentStep === OnboardingStep.DataSpaceLevel) {
            nextStepId = OnboardingStep.Summary;
        }

        if (nextStepId) {
            setCurrentStep(nextStepId);
        }
    };

    const handleBack = () => {
        const currentIndex = ONBOARDING_STEPS.findIndex(step => step.id === currentStep);
        if (currentIndex <= 0) return;

        let prevStepId: OnboardingStep = ONBOARDING_STEPS[currentIndex - 1].id;

        if (currentStep === OnboardingStep.Summary) {
            prevStepId = OnboardingStep.DataSpaceLevel;
        }

        setCurrentStep(prevStepId);
    };

    const restart = () => {
        setCurrentStep(OnboardingStep.Welcome);
        setHasExistingIdentity(null);
        setDid('');
        setIndustryCertifications({});
    }

    const renderScreen = () => {
        switch (currentStep) {
            case OnboardingStep.Welcome:
                return <WelcomeScreen onNext={handleNext} />;
            case OnboardingStep.OnboardingExperience:
                return <OnboardingExperienceScreen onNext={handleNext} onBack={restart} setHasExistingIdentity={setHasExistingIdentity} setDid={setDid} />;
            case OnboardingStep.WalletConnect:
                return <WalletConnectScreen onNext={handleNext} onBack={handleBack} />;
            case OnboardingStep.PersonalIdentityVerification:
                return <PersonalIdentityScreen onNext={handleNext} onBack={handleBack} />;
            case OnboardingStep.OrganizationSetup:
                return <OrganizationSetupScreen onNext={handleNext} onBack={handleBack} />;
            case OnboardingStep.NationalLevel:
                return <NationalLevelScreen onNext={handleNext} onBack={handleBack} />;
            case OnboardingStep.IndustryLevel:
                return <IndustryLevelScreen onNext={handleNext} onBack={handleBack} onCertsChange={setIndustryCertifications} />;
            case OnboardingStep.DataSpaceLevel:
                 return <DataSpaceLevelScreen onNext={handleNext} onBack={handleBack} />;
            case OnboardingStep.Summary:
                return <SummaryScreen onNext={handleNext} onBack={handleBack} isNewUser={!hasExistingIdentity} did={did} industryCertifications={industryCertifications} />;
            case OnboardingStep.Completion:
                return <CompletionScreen onRestart={restart} onFinish={onComplete} />;
            default:
                return <WelcomeScreen onNext={handleNext} />;
        }
    };

    return (
        <div className="h-full w-full">
            {renderScreen()}
        </div>
    );
};

export default OnboardingFlow;
