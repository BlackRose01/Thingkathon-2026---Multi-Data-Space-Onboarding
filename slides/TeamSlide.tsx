import React from 'react';

const teamMembers = [
    { name: 'Tobias', imageUrl: '/tobias.jpg', angle: -90, position: 'bottom', color: 'bg-sky-100' },
    { name: 'Paul', imageUrl: '/paul.jpeg', angle: -18, position: 'right', color: 'bg-teal-100' },
    { name: 'Nuno', imageUrl: '/nuno.jpeg', angle: 54, position: 'right', color: 'bg-indigo-100' },
    { name: 'Thomas', imageUrl: '/thomas.jpeg', angle: 126, position: 'left', color: 'bg-rose-100' },
    { name: 'Xin', imageUrl: '/xin.jpeg', angle: 198, position: 'left', color: 'bg-amber-100' },
];

interface MemberProps {
    name: string;
    imageUrl: string;
    angle: number;
    position: 'left' | 'right' | 'top' | 'bottom';
    color: string;
}

const Member: React.FC<MemberProps> = ({ name, imageUrl, angle, position, color }) => {
    const radius = 260; // in pixels
    const angleRad = (angle * Math.PI) / 180;
    const x = 50 + (radius / 600 * 100) * Math.cos(angleRad);
    const y = 50 + (radius / 600 * 100) * Math.sin(angleRad);

    const style = {
        position: 'absolute' as const,
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
    };

    const getTextPositionClass = () => {
        switch (position) {
            case 'right': return 'left-full ml-5 top-1/2 -translate-y-1/2 text-left';
            case 'left': return 'right-full mr-5 top-1/2 -translate-y-1/2 text-right';
            case 'top': return 'bottom-full mb-3 left-1/2 -translate-x-1/2 text-center';
            case 'bottom': return 'top-full mt-3 left-1/2 -translate-x-1/2 text-center';
            default: return '';
        }
    };

    return (
        <div style={style}>
            <div className="relative w-28 h-28">
                <div className={`w-full h-full rounded-full ${color} flex items-center justify-center border-4 border-white shadow-lg overflow-hidden`}>
                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className={`absolute w-max ${getTextPositionClass()}`}>
                    <p className="text-xl font-bold text-slate-800">{name}</p>
                </div>
            </div>
        </div>
    );
};



const TeamSlide: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-16 flex flex-col items-center justify-center text-center">
            {/* <h2 class="text-4xl font-bold text-slate-900 tracking-tight mb-16">The Team</h2> */}
            <div className="relative w-[600px] h-[600px]">
                {/* Central Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 bg-slate-100 rounded-full flex items-center justify-center">
                        <h3 className="text-6xl font-bold text-slate-700">X-Forces</h3>
                    </div>
                </div>

                {/* Dashed Orbital Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[520px] h-[520px] rounded-full border-2 border-dashed border-slate-300"></div>
                </div>

                {/* Team Members */}
                {teamMembers.map(member => (
                    <Member key={member.name} {...member} />
                ))}
            </div>
        </div>
    );
};

export default TeamSlide;