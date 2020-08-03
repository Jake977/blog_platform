import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles.scss';

const LoggedOutView = (props) => {
    if (!props.currentUser) {
        return (
            <>
                <NavLink exact to="/" className="nav-link">Home</NavLink>
                <NavLink to="/login" className="nav-link">Log In</NavLink>
                <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
            </>
        )
    }
    return null;
};

const LoggedInView = (props) => {
    if (props.currentUser) {
        return (
            <>
                <NavLink exact to="/" className="nav-link">Home</NavLink>
                {props.currentUser.username}
                <NavLink to="/logout" className="nav-link">Log Out</NavLink>
            </>
        )
    }
    return null;
};

class NavBar extends React.Component {
    render() {
        const { currentUser } = this.props;
        return (
            <nav className="navbar">
                <div className="navbar-nav">
                    <LoggedOutView currentUser={currentUser} />
                    <LoggedInView currentUser={currentUser} />
                </div>
            </nav>
        );
    }
}

export default NavBar;

// const NavBar = () => {
//     return (
//         <nav className="navbar">
//             <div className="navbar-nav">
//                 <NavLink exact to="/" className="nav-link">Home</NavLink>
//                 <NavLink to="/users" className="nav-link">Users</NavLink>
//                 <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
//             </div>
//         </nav>
//     );
// };
