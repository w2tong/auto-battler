import { NavLink } from "react-router";

function Header() {
    return (
        <nav className={'w-full flex justify-evenly'}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/equipment'>Equipment</NavLink>
            <NavLink to='/battle'>Battle</NavLink>
        </nav>
    );
}


export default Header;