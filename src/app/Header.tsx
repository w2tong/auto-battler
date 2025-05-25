import { NavLink } from "react-router";
import CharacterSelect from "../features/CharacterSelect/CharacterSelect";

const navLinks: { to: string, text: string; }[] = [
    { to: '/', text: 'Home' },
    { to: '/equipment', text: 'Equipment' },
    { to: '/battle', text: 'Battle' },
    { to: '/create-character', text: 'Create Character' },
];

function Header() {
    return (
        <div className='flex justify-between w-full shadow-2xl'>
            <nav className={'flex grow'}>
                {navLinks.map(({ to, text }, i) =>
                    <NavLink key={i} to={to} className={({ isActive }) => `${isActive ? 'text-primary-active' : ''} flex-1 h-full hover:text-primary-hover`}>
                        <button className='w-full h-full cursor-pointer text-4xl font-extrabold flex items-center justify-center'>
                            {text}
                        </button>
                    </NavLink>
                )}
            </nav>
            <CharacterSelect />
        </div>
    );
}

export default Header;