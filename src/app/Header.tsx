import { NavLink } from "react-router";

function Header() {
    return (
        <nav className={'w-full flex justify-evenly'}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/battle'>Battle</NavLink>
            <NavLink to='/equipment'>Equipment</NavLink>
        </nav>
    );
}


export default Header;