import { Link } from 'react-router-dom';
import ErrorsList from '../ErrorsList/ErrorsList';
import React from 'react';
import userService from '../../services/userService';
import { connect } from 'react-redux';
import './loginForm.scss';


import {
    UPDATE_FIELD_AUTH,
    SIGNUP,
    SIGNUP_PAGE_UNLOADED
} from '../../actionTypes';

import { Form, Input, Button } from 'antd';

const formItemLayout = {
    labelCol: { span: 24},
    wrapperCol: {span: 24}
};

const formSingleItemLayout = {
    wrapperCol: { span: 24, offset: 0 }
};

const mapStateToProps = (state) => ({ ...state.authorization });

const mapDispatchToProps = (dispatch) => ({
    onChangeUsername: (value) =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
    onChangeEmail: (value) =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    onChangePassword: (value) =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onSubmit: (username, email, password) => {
        const payload = userService.authorization.signup(username, email, password);
        dispatch({ type: SIGNUP, payload })
    },
    onUnload: () =>
        dispatch({ type: SIGNUP_PAGE_UNLOADED })
});

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.changeEmail = (e) => this.props.onChangeEmail(e.target.value);
        this.changePassword = (e) => this.props.onChangePassword(e.target.value);
        this.changeUsername = (e) => this.props.onChangeUsername(e.target.value);
        this.submitForm = (username, email, password) => (e) => {
            this.props.onSubmit(username, email, password);
        }
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const {email, password, username, errors } = this.props;
        return (
            <div className="login-form">
                <div className="login-form__title">Sign Up</div>
                <ErrorsList errors={errors} />
                <Form
                    {...formItemLayout}
                    onFinish={this.submitForm(username, email, password)}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            value={username}
                            onChange={this.changeUsername}
                        />
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input
                            value={email}
                            onChange={this.changeEmail}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            value={password}
                            onChange={this.changePassword}
                        />
                    </Form.Item>
                    <Form.Item {...formSingleItemLayout}>
                        <Button
                            className="login-form__btn"
                            type="primary"
                            htmlType="submit"
                            disabled={this.props.inProgress}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <p className="login-form__tailText">
                    Already have an account? <Link to="/login">Log In.</Link>
                </p>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
