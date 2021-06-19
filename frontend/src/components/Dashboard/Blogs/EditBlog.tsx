import { Card, Row, Col, Button, Form } from 'antd';
import React, { useContext } from 'react'
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import UserContext from '../../../context/User/UserContext';
const { REACT_APP_NODEJS_URL } = process.env;

interface BlogsElementInterface {
    title: string,
    author: string,
    content: string,
}
export const EditBlog: React.FC= () => {
    const userContext = useContext(UserContext)
    const onSubmit = (values: BlogsElementInterface) => {
        axios.post(`http://${REACT_APP_NODEJS_URL}/admin/blog`,
            {
                title: values.title,
                author: values.author,
                content: values.content,
                userid: userContext.user.userid,
                imagepath: null
            },
            {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error);
            })
    }
    return (
        <Form onFinish={onSubmit}>
            <h1 style={{ fontSize: '30px' }}>Enter Details</h1>
            <Row>
                <Col span={10}>
                    <h1 style={{ fontSize: '20px' }}>Title</h1>
                    <Form.Item name='title'>
                        <TextArea autoSize={{ minRows: 1, maxRows: 2 }} />
                    </Form.Item>
                </Col>
                <Col span={1} />

                <Col span={10}>
                    <h1 style={{ fontSize: '20px' }}>Author</h1>
                    <Form.Item name='author'>
                        <TextArea autoSize={{ minRows: 1, maxRows: 2 }} />
                    </Form.Item>
                </Col>
                <Col span={3} />
            </Row>
            <Row style={{ marginTop: "2%" }}>
                <h1 style={{ fontSize: '20px' }}>Content</h1>
                <Form.Item name='content' style={{ width: '100%' }}>
                    <TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
                </Form.Item>
            </Row>
            <Button type='primary'>Upload Image</Button>
            <Button type='primary' danger style={{ float: 'right', marginTop: '3%' }}>Clear</Button>
            <Form.Item>
                <Button htmlType='submit' type='primary' style={{ float: 'right', marginRight: "1%", marginTop: '3%' }}>Save</Button>
            </Form.Item>
        </Form>
    );
}