import React, { useMemo } from 'react';
import { OnboardingStep, CopilotMessage, Credential } from '../types';
import OnboardingLayout from '../components/OnboardingLayout';

// Mock Data for non-industry credentials
const foundCredentialsBase: Credential[] = [
    { id: 'lei', name: 'Legal Entity Identifier (LEI)', issuer: 'GLEIF Foundation', level: 'National' },
    { id: 'bpn', name: 'Business Partner Number (BPN)', issuer: 'Catena-X Association', level: 'Data Space' },
];

const newCredentialsBase: Credential[] = [
    { id: 'national', name: 'National Compliance', issuer: 'Federal Verification Body', level: 'National' },
    { id: 'dataspace', name: 'Data Space Participation', issuer: 'Multi Data Space', level: 'Data Space' },
];


const levelColors = {
    'National': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'Industry': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'Data Space': { bg: 'bg-green-100', text: 'text-green-800' },
};

// --- ICONS ---
const UserIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const OrganizationIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m6 0h.008v.008H21V3z" /></svg>;
const CheckCircleIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const CredentialIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-500"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;

const SummaryCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center pb-3 mb-3 border-b border-slate-200">
            {icon}
            <h3 className="ml-3 text-lg font-bold text-slate-800">{title}</h3>
        </div>
        <div className="space-y-3">{children}</div>
    </div>
);

const InfoRow: React.FC<{ label: string; value: string; isMono?: boolean }> = ({ label, value, isMono = false }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500">{label}:</span>
        <span className={`font-semibold text-slate-800 truncate ${isMono ? 'font-mono text-xs' : ''}`}>{value}</span>
    </div>
);

const VerifiedItem: React.FC<{ label: string }> = ({ label }) => (
     <div className="flex items-center text-sm">
        <CheckCircleIcon className="w-5 h-5 text-[#00d1c1] mr-2" />
        <span className="font-semibold text-slate-800">{label}</span>
    </div>
);

const CredentialRow: React.FC<{ credential: Credential }> = ({ credential }) => {
    const { bg, text } = levelColors[credential.level];
    return (
        <div className="bg-slate-50/70 p-3 rounded-md flex items-center">
            <div className="flex-grow">
                <p className="font-semibold text-sm text-slate-800">{credential.name}</p>
                <p className="text-xs text-slate-500">Issued by: {credential.issuer}</p>
            </div>
            <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${bg} ${text}`}>{credential.level}</div>
        </div>
    );
};

interface SummaryScreenProps {
    onNext: () => void;
    onBack: () => void;
    isNewUser: boolean;
    did: string;
    industryCertifications: Record<string, string>;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ onNext, onBack, isNewUser, did, industryCertifications }) => {
    const copilotMessage: CopilotMessage = {
        text: "This is a complete summary of your onboarding. If everything is correct, confirm to finish the process and create your digital twin.",
        status: 'idle'
    };

    const generatedDid = useMemo(() => `DID:WEB:Catena-X:${crypto.randomUUID()}`, []);
    const displayDid = isNewUser ? generatedDid : did;
    
    const credentials = useMemo(() => {
        const baseCreds = isNewUser ? newCredentialsBase : foundCredentialsBase;
        const industryCreds: Credential[] = Object.entries(industryCertifications).map(([id, name]) => ({
            id,
            // FIX: Cast `name` to string as TypeScript appears to incorrectly infer it as `unknown`.
            name: name as string,
            issuer: 'Self-Asserted / Uploaded',
            level: 'Industry'
        }));
        return [...baseCreds, ...industryCreds];
    }, [isNewUser, industryCertifications]);

    return (
        <OnboardingLayout
            title="Review Your Information"
            description="Please confirm that all the details below are correct before completing the onboarding."
            onNext={onNext}
            onBack={onBack}
            nextButtonText="Confirm & Finish"
            currentStep={OnboardingStep.Summary}
            copilotMessage={copilotMessage}
        >
            <div className="grid grid-cols-1">
                <div className="space-y-6">
                    <SummaryCard icon={<UserIcon className="w-6 h-6 text-[#002366]" />} title="Identity & Wallet">
                        <InfoRow 
                            label={isNewUser ? "Generated DID" : "Your DID"}
                            value={displayDid} 
                            isMono={true} 
                        />
                        <VerifiedItem label="Wallets Connected" />
                        <VerifiedItem label="Identity Authenticated (eIDAS)" />
                    </SummaryCard>
                     <SummaryCard icon={<OrganizationIcon className="w-6 h-6 text-[#002366]" />} title="Organization">
                        <InfoRow label="Legal Name" value="Vibe Chemicals GmbH" />
                        <InfoRow label="Registration No." value="HRB 12345" />
                         <VerifiedItem label="Agreements Accepted" />
                    </SummaryCard>
                     <SummaryCard icon={<OrganizationIcon className="w-6 h-6 text-[#002366]" />} title="Person">
                        <InfoRow label="Name" value="Justus Aurelius von Haucap" />
                        <InfoRow label="Adress" value="An der Promenade 1, 83684 Tegernsee" />
                    </SummaryCard>
                </div>
                <div className="mt-7">
                    <SummaryCard icon={<CredentialIcon />} title={isNewUser ? "Credentials To Be Issued" : "Found Credentials"}>
                        {credentials.length > 0 ? (
                            credentials.map(cred => <CredentialRow key={cred.id} credential={cred} />)
                        ) : (
                            <p className="text-sm text-slate-500">No industry credentials provided.</p>
                        )}
                    </SummaryCard>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default SummaryScreen;