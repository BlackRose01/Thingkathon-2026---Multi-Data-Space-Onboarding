
import { OnboardingStep, OnboardingStepConfig } from './types';

// This represents the full flow for a new user.
// The App component will handle conditional skips for returning users.
export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
    { id: OnboardingStep.Welcome, title: "Start" },
    { id: OnboardingStep.OnboardingExperience, title: "Onboarding" },
    { id: OnboardingStep.WalletConnect, title: "Connect Wallets" },
    { id: OnboardingStep.PersonalIdentityVerification, title: "Identity Verification" },
    { id: OnboardingStep.OrganizationSetup, title: "Identity Overview" },
    { id: OnboardingStep.NationalLevel, title: "National Compliance" },
    { id: OnboardingStep.IndustryLevel, title: "Industry Compliance" },
    { id: OnboardingStep.DataSpaceLevel, title: "Data Space Compliance" },
    { id: OnboardingStep.Summary, title: "Summary" },
    { id: OnboardingStep.Completion, title: "Done" }
];
