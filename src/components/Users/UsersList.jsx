import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'antd';
import  { userService } from '../../services/userService';
import 'antd/dist/antd.css';


const UsersList = () => {
    const [users, setUsers] = useState(null);

    const usersTableColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Website', dataIndex: 'website', key: 'website' },
        { title: 'E-mail', dataIndex: 'email', key: 'email' },
    ];

    useEffect(() => {
        userService.getAll('/getUsers/')
            .then(response => setUsers(response));
     }, []);

    const content = (users && users.length > 0)
        ?  <Table
            columns={usersTableColumns}
            expandable={{
                expandedRowRender: record => (
                    <p style={{ margin: 0 }}>Навыки: {record.skills.map(el => el.skill).join(', ')}</p>
                ),
                rowExpandable: record => (
                    record.skills && record.skills.constructor.name === "Array" && record.skills.length > 0
                ),
            }}
            dataSource={users}
            pagination={false}
        />
        : <div className="users-table-noUsers">No Users To Show</div>;

    return(
        <Row className="userListContainer">
            <Col span={4} />
            <Col span={16} >
               <h1>Users</h1>
                <Link to={`/sign-up`} >
                    <Button type="primary">Add User</Button>
                </Link>
                <div>
                    {content}
                </div>
            </Col>
            <Col span={4} />
        </Row>
    )
};

export default UsersList;
