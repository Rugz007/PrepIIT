import Layout, { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { Row, Col, Form, Input, Card, Divider, Button } from 'antd';
import { UserOutlined, KeyOutlined, MailOutlined, PhoneOutlined, HomeOutlined, AccountBookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const Register: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Layout>
            <Content style={{ backgroundColor: '#2a323c' }}>
                <Row >
                    <Col span={4} />
                    <Col span={16} style={{ padding: '.4%', paddingTop: '1%' }}>
                        <Card style={{ height: '100%', borderRadius: '17px', margin: '0% 30%' }}>
                            <img src='logo-nobg.png' alt='logo' style={{ width: '46%', margin: 'auto' }} />
                            <h1 style={{ fontSize: '25px', marginBottom: '0' }}>Create new account</h1>
                            <Divider />
                            <Form
                                name="register"
                                onFinish={onFinish}
                                scrollToFirstError
                                style={{ textAlign: 'left' }}
                            >
                                <Form.Item name="name">
                                    <Input size='large' prefix={<UserOutlined />} placeholder={'Enter your name.'} />
                                </Form.Item>
                                <Form.Item name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}>
                                    <Input size='large' prefix={<MailOutlined />} placeholder={'Enter your Email ID.'} />
                                </Form.Item>
                                <Form.Item name="phone">
                                    <Input size='large' prefix={<PhoneOutlined />} placeholder={'Enter your phone number.'} />
                                </Form.Item>
                                <Form.Item name="address">
                                    <Input size='large' prefix={<HomeOutlined />} placeholder={'Enter your Address.'} />
                                </Form.Item>
                                <Form.Item name="class">
                                    <Input size='large' prefix={<AccountBookOutlined />} placeholder={'Enter your class.'} />
                                </Form.Item>
                                <Form.Item name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback>
                                    <Input.Password size='large' prefix={<KeyOutlined />} placeholder={'Enter your Password.'} />
                                </Form.Item>
                                <Form.Item name="confirmPassword"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        }),
                                    ]}>
                                    <Input.Password size='large' prefix={<KeyOutlined />} placeholder={'Re-enter your Password.'} />
                                </Form.Item>
                                <Form.Item >
                                    <Button type='primary' htmlType="submit" size='large' style={{ width: '100%', margin: 'auto' }}>Submit</Button>
                                </Form.Item>
                            </Form>
                            <Divider />
                            <p>Already have an account? <Link to='/login'>Login</Link></p>
                        </Card>
                    </Col>

                    <Col span={4} />
                </Row>
            </Content>
        </Layout>
    );
}