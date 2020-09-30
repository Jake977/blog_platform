import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Avatar } from "antd";
import userPic from '../../img/userDefaultImage.png';
import './topBar.scss';
import actionCreators from "../../actionCreators";

const mapStateToProps = (state) => ({
    ...state,
    currentUser: state.mainstate.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    onClickLogout: () => dispatch(actionCreators.doLogOut()),
});

const LoggedOut = (props) => {
    if (!props.currentUser) {
        return (
            <>
                <NavLink to="/login" className="topBar__link">Log In</NavLink>
                <NavLink to="/signup" className="topBar__link">Sign Up</NavLink>
            </>
        )
    }
    return null;
};

const LoggedIn = (props) => {
    if (props.currentUser) {
        return (
            <>
                <NavLink exact to="/" className="topBar__link">Create article</NavLink>
                <div className="topBar__userName">{props.currentUser.username}</div>
                <Avatar src={userPic} size={46} alt={props.currentUser.username} />
                <Button style={{ marginLeft: '10px' }} danger onClick={props.onClickLogout}>Log Out</Button>
            </>
        )
    }
    return null;
};

class NavBar extends React.Component {
    render() {
        const { currentUser, onClickLogout } = this.props;
        return (
            <div className="topBar">
                <div className="topBar__title">Realworld Blog</div>
                <LoggedOut currentUser={currentUser} />
                <LoggedIn currentUser={currentUser} onClickLogout={onClickLogout} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
