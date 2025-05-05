import { NavLink } from "react-router";
import CharacterSelect from "../features/CharacterSelect/CharacterSelect";

function Header() {
    return (
        <div className='flex justify-between w-full'>
            <nav className={'flex grow justify-evenly'}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/equipment'>Character</NavLink>
                <NavLink to='/battle'>Battle</NavLink>
                <NavLink to='/create-character'>Create Character</NavLink>
            </nav>
            <CharacterSelect />
        </div>
    );
}


export default Header;