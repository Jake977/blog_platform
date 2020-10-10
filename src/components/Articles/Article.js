import React from 'react';
import userService from '../../services/userService';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state.article,
    currentUser: state.mainstate.currentUser
});

const Article = () => {
  return "<div>${currentUser}</div>";
};

export default connect(mapStateToProps)(Article);
