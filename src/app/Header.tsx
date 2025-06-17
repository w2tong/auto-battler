import { NavLink } from "react-router";
import CharacterSelect from "@features/CharacterSelect/CharacterSelect";
import { cn } from "@utils/utils";

const navLinks: { to: string, text: string; }[] = [
    { to: '/', text: 'Home' },
    { to: '/character', text: 'Character' },
    { to: '/equipment', text: 'Equipment' },
    { to: '/battle', text: 'Battle' },
    { to: '/account', text: 'Account' },
];

function Header({ className }: { className?: string; }) {
    return (
        <div className={cn('flex justify-between w-full bg-secondary', className)}>
            <nav className={'flex grow'}>
                {navLinks.map(({ to, text }, i) =>
                    // <NavLink key={i} to={to} className={({ isActive }) => `${isActive ? 'text-primary-active' : ''} flex-1 h-full hover:text-primary-hover`}>
                    <NavLink key={i} to={to} className={({ isActive }) => cn('flex-1 h-full text-primary-text hover:text-primary-text-hover', isActive && 'text-primary-text-active')}>
                        <button className='w-full h-full cursor-pointer text-md sm:text-xl md:text-3xl  font-extrabold flex items-center justify-center'>
                            {text}
                        </button>
                    </NavLink>
                )}
            </nav>
            <CharacterSelect />
        </div >
    );
}

export default Header;