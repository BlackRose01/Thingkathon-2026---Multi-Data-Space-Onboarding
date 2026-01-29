
import React, { useState } from 'react';
import { OnboardingStep, CopilotMessage } from '../types';
import OnboardingLayout from '../components/OnboardingLayout';
import InfoTooltip from '../components/InfoTooltip';

interface WalletConnectScreenProps {
    onNext: () => void;
    onBack: () => void;
}

const WalletConnectScreen: React.FC<WalletConnectScreenProps> = ({ onNext, onBack }) => {
    const [view, setView] = useState<'connect' | 'connected'>('connect');
    const [companyWallet, setCompanyWallet] = useState("https://company.wallet.de");
    const [prokuraWallet, setProkuraWallet] = useState('https://private.wallet.de');
    const [copilotMessage, setCopilotMessage] = useState<CopilotMessage>({
        text: "Please provide the addresses of your company and personal (Prokura) wallets to link them to your identity.",
        status: 'idle',
    });

    const renderContent = () => {
        return (
        <div className="w-full max-w-md mx-auto space-y-4">
            <div>
                <div className="flex items-center justify-between mb-1">
                    <label htmlFor="company-wallet" className="block text-sm font-medium text-slate-700">Company Wallet (LPID Wallet)</label>
                    <InfoTooltip text="The Legal Person Identity Wallet represents your entire organization." />
                </div>
                <input
                    type="text"
                    id="company-wallet"
                    value={companyWallet}
                    onChange={(e) => setCompanyWallet(e.target.value)}
                    className="block w-full rounded-md border-slate-300 shadow-sm focus:ring-[#00d1c1] focus:border-[#00d1c1] sm:text-sm p-2"
                    placeholder="0x..."
                />
            </div>
                <div>
                <div className="flex items-center justify-between mb-1">
                    <label htmlFor="prokura-wallet" className="block text-sm font-medium text-slate-700">Prokura Wallet (PID Wallet)</label>
                    <InfoTooltip text="The Personal Identity Wallet belongs to the authorized person acting on behalf of the company." />
                </div>
                <input
                    type="text"
                    id="prokura-wallet"
                    value={prokuraWallet}
                    onChange={(e) => setProkuraWallet(e.target.value)}
                    className="block w-full rounded-md border-slate-300 shadow-sm focus:ring-[#00d1c1] focus:border-[#00d1c1] sm:text-sm p-2"
                    placeholder="0x..."
                />
            </div>
        </div>
    );
    }

    return (
        <OnboardingLayout
            title="Connect Your Wallets"
            description="Your secure digital wallets manage your organization's and your personal credentials."
            onNext={onNext}
            onBack={onBack}
            isNextDisabled={(!companyWallet || !prokuraWallet)}
            currentStep={OnboardingStep.WalletConnect}
            copilotMessage={copilotMessage}
        >
           {renderContent()}
        </OnboardingLayout>
    );
};

export default WalletConnectScreen;
