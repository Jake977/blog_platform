import { Link } from 'react-router-dom';
import ErrorsList from '../ErrorsList/ErrorsList';
import React from 'react';
import { connect } from 'react-redux';
import userService from "../../services/userService";
import actionCreators from '../../actionCreators';
import { Form, Input, Button } from 'antd';
import './loginForm.scss';

const mapStateToProps = (state) => ({ ...state.authorization });

const formItemLayout = {
    labelCol: {span: 24},
    wrapperCol: {span: 24}
};

const formSingleItemLayout = {
    wrapperCol: {span: 24, offset: 0}
};

const mapDispatchToProps = dispatch => ({
    onChangeEmail: (value) =>
        dispatch(actionCreators.doUpdateFieldAuth('email', value)),
    onChangePassword: (value) =>
        dispatch(actionCreators.doUpdateFieldAuth('password', value)),
    onSubmit: (email, password) => {
        const payload = userService.authorization.login(email, password);
        dispatch(actionCreators.doLogIn(payload))
        },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.changeEmail = (e) => this.props.onChangeEmail(e.target.value);
        this.changePassword = (e) => this.props.onChangePassword(e.target.value);
        this.submitForm = (email, password) => (e) => {
            this.props.onSubmit(email, password);
        };
    }

    render() {
        const { email, password } = this.props;
        return (
            <div className="login-form">
                <div className="login-form__title">Log In</div>
                <ErrorsList errors={this.props.errors} />
                <Form
                    {...formItemLayout}
                    onFinish={this.submitForm(email, password)}
                >
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
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                <p className="login-form__tailText">
                    Don't have an account? <Link to="/signup">Sign Up.</Link>
                </p>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
