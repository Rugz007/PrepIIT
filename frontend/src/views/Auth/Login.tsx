import Layout, { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { Row, Col, Form, Input, Card, Divider, Button } from 'antd';
import { UserOutlined ,KeyOutlined} from '@ant-design/icons';

export const Login: React.FC = () => {
    const onFinish = () => {

    };
    const [state, setstate] = useState({
        email: '',
        password: '',
    });
    return (
        <Layout>
            <Content style={{ backgroundColor: '#2a323c' }}>
                <Row >
                    <Col span={4} />
                    <Col span={16} style={{ padding: '.4%', paddingTop: '4%' }}>
                        <Card bordered={false} style={{ height: '100%', borderRadius: '17px', margin:'0% 30%' }}>
                            <img src='logo-nobg.png' alt='logo' style={{width:'50%',margin:'auto'}}/>
                            <h1 style={{ fontSize: '25px', marginBottom: '0' }}>Login</h1>
                            <Divider />
                            <Form
                                name="enquiry"
                                onFinish={onFinish}
                                scrollToFirstError
                                style={{ textAlign: 'left' }}
                            >
                                <Form.Item name="email">
                                    <Input size='large'prefix={<UserOutlined />} placeholder={'Enter your Email ID.'} />
                                </Form.Item>
                                <Form.Item name="password">
                                    <Input.Password size='large' prefix={<KeyOutlined />} placeholder={'Enter your Password.'} />
                                </Form.Item>
                                <Form.Item name='button'>
                                    <Button type='primary' size='large' style={{ width: '100%', margin: 'auto' }}>Submit</Button>
                                </Form.Item>
                            </Form>
                            <a>Forgot Password?</a>
                            <Divider />
                            <p>Don't have an account? <a>Register!</a></p>
                        </Card>
                    </Col>

                    <Col span={4} />
                </Row>
            </Content>
        </Layout>
    );
}