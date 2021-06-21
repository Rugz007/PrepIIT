import { Card, Row, Col, Button, Form, Space, message } from 'antd';
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
export const CreateBlog: React.FC = () => {
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
                message.success("Posted your blog successfully!")
            }).catch((error) => {
                message.error("Something went wrong while uploading the blog.")
                console.log(error);
            })
    }
    return (
        <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '40px' }}>Publish New Blog</h1>
            <Card style={{ textAlign: 'left', borderRadius: '10px' }}>
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
                    <Space>
                        <Button type='primary'>Upload Image</Button>
                        <Form.Item style={{ padding: '0', margin: '0'}}>
                            <Button htmlType='submit' type='primary' style={{  marginRight: "1%", marginTop: '0%' }}>Save</Button>
                        </Form.Item>
                        <Button type='primary' danger style={{ float: 'right', marginTop: '3%' }}>Clear</Button>
                    </Space>

                </Form>
            </Card>
        </div>
    );
}