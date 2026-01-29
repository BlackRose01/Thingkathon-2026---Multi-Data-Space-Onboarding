
export enum OnboardingStep {
    Welcome = 'WELCOME',
    OnboardingExperience = 'ONBOARDING_EXPERIENCE',
    WalletConnect = 'WALLET_CONNECT',
    PersonalIdentityVerification = 'PERSONAL_IDENTITY_VERIFICATION',
    OrganizationSetup = 'ORGANIZATION_SETUP',
    NationalLevel = 'NATIONAL_LEVEL',
    IndustryLevel = 'INDUSTRY_LEVEL',
    DataSpaceLevel = 'DATA_SPACE_LEVEL',
    Summary = 'SUMMARY',
    Completion = 'COMPLETION',
}

export interface OnboardingStepConfig {
    id: OnboardingStep;
    title: string;
}

export interface Credential {
    id: string;
    name: string;
    issuer: string;
    level: 'National' | 'Industry' | 'Data Space';
    validUntil?: string;
}

export type CopilotMessage = {
    text: string;
    status: 'idle' | 'thinking' | 'success' | 'error';
};
