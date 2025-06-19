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
        <div className={cn('flex justify-between w-full bg-secondary h-[68px]', className)}>
            <nav className='flex grow gap-2'>
                {navLinks.map(({ to, text }, i) =>
                    // TODO: adjust text size at breakpoints to add space
                    // TODO: adjust colors
                    <NavLink
                        key={i}
                        to={to}
                        className={({ isActive }) => cn(
                            'flex-1 h-full text-primary-text hover:text-primary-text-hover',
                            isActive && 'text-primary-text-active'
                        )}
                    >
                        <button className='w-full h-full cursor-pointer text-[3vw] sm:text-[3vw] md:text-xl  font-extrabold flex items-center justify-center'>
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