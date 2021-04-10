import { Row, Col, Card } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

export const Contact: React.FC = () => {
    return (
        <Layout>
            <Content style={{ backgroundColor: '#1c2229' }}>
                <Row>
                    <Col
                        lg={12}
                        style={{
                            fontSize: "3rem",
                            margin: "1.8% auto",
                            marginBottom:'0'
                        }}
                    >
                        Contact Us
                        <Divider />
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} />
                    <Col lg={8}>
                        <img src='logo-nobg.png' alt='logo' style={{ padding: '5%',width:'100%'}} />
                    </Col>
                    <Col lg={8}>
                        <Card title={<h1>A Center for excellence in STEM education</h1>} style={{ padding: '5%', marginBottom: '8%' }} >
                            <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.51781872726!2d73.78694331489385!3d18.595764987365264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b91f2b19a78d%3A0x50cda88d1f11206e!2sPrepiiT!5e0!3m2!1sen!2sin!4v1617301346273!5m2!1sen!2sin" style={{ width: "100%", height: "100%" }} />
                            <b style={{fontSize:'5vem'}}>
                                <PhoneOutlined />: 9890401239 | 9518512567
                            <br />
                                <MailOutlined />: admissions@prepiit.com
                    </b>
                        </Card>
                    </Col>
                    <Col lg={4} />
                </Row>
            </Content>
        </Layout>
    );
}