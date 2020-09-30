import React from 'react';
import { Alert } from 'antd';

class ErrorsList extends React.Component {
    render() {
        const { errors } = this.props;
        if (!errors) return null;
        return (
            <Alert message = {
                Object.keys(errors).map(key => {
                    return (<div key={key}> {key} {errors[key]} </div>);
                })
            } type="error" />
            );
    }
}

export default ErrorsList;
