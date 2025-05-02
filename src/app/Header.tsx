import { NavLink } from "react-router";
import CharacterSelect from "../features/CharacterSelect/CharacterSelect";

function Header() {
    return (
        <div>
            <nav className={'w-full flex justify-evenly'}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/equipment'>Equipment</NavLink>
                <NavLink to='/battle'>Battle</NavLink>
                <NavLink to='/create-character'>Create Character</NavLink>
            </nav>
            <CharacterSelect />
        </div>
    );
}


export default Header;