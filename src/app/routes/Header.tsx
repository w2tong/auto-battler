import { NavLink } from "react-router";
import CharacterSelect from "@features/CharacterSelect/CharacterSelect";
import { cn } from "@utils/utils";

import { ReactNode } from "react";
import HomeIcon from '../../components/svgs/HomeIcon';
import CharacterIcon from '../../components/svgs/CharacterIcon';
import EquipmentIcon from '../../components/svgs/EquipmentIcon';
import BattleIcon from '../../components/svgs/BattleIcon';
import AccountIcon from '../../components/svgs/AccountIcon';

const iconClassName = 'w-6 sm:w-8 h-6 sm:h-8';
const navLinks: { to: string, text: string, icon: ReactNode; }[] = [
    { to: '/', text: 'Home', icon: <HomeIcon className={iconClassName} /> },
    { to: '/character', text: 'Character', icon: <CharacterIcon className={iconClassName} /> },
    { to: '/equipment', text: 'Equipment', icon: <EquipmentIcon className={iconClassName} /> },
    { to: '/battle', text: 'Battle', icon: <BattleIcon className={iconClassName} /> },
    { to: '/account', text: 'Account', icon: <AccountIcon className={iconClassName} /> },
];

function Header({ className }: { className?: string; }) {
    return (
        <div className={cn('flex justify-between w-full bg-secondary h-[68px]', className)}>
            <nav className='flex grow gap-2'>
                {navLinks.map(({ to, text, icon }, i) =>
                    // TODO: adjust text size at breakpoints to add space
                    // TODO: adjust colors
                    <NavLink
                        key={i}
                        to={to}
                        className={({ isActive }) => cn(
                            'flex-1 h-full text-primary-text hover:text-primary-text-hover fill-primary-text hover:fill-primary-text-hover',
                            isActive && 'text-primary-text-active fill-primary-text-active'
                        )}
                    >
                        <button className='w-full h-full cursor-pointer text-[3vw] sm:text-[2vw] md:text-lg font-extrabold flex flex-col md:flex-row items-center justify-center gap-0 md:gap-1'>
                            {icon}
                            {text}
                        </button>
                    </NavLink>
                )}
            </nav>
            <CharacterSelect className='min-w-[64px] w-fit sm:w-50 md:w-60 lg:w-70' />
        </div >
    );
}

export default Header;