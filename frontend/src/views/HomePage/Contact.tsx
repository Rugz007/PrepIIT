import { Row, Col, Card } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

export const Contact: React.FC = () => {
    return (
        <Layout>
            <Content style={{ backgroundColor: '#2a323c' }}>
                <Row>
                    <Col
                        span={12}
                        style={{
                            fontSize: "6rem",
                            margin: "1.8% auto",
                            marginBottom:'0'
                        }}
                    >
                        Contact Us
                        <Divider />
                    </Col>
                </Row>
                <Row>
                    <Col span={4} />
                    <Col span={8}>
                        <img src='logo-nobg.png' alt='logo' style={{ padding: '5%'}} />
                    </Col>
                    <Col span={8}>
                        <Card title={<h1>A Center for excellence in STEM education</h1>} style={{ padding: '5%', marginBottom: '8%' }} >
                            <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.3791406872296!2d73.7890753077253!3d18.59582154759184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9e0f7613d1ce8b8b!2sFortuna%20Business%20Center!5e0!3m2!1sen!2sin!4v1612682827503!5m2!1sen!2sin" style={{ width: "100%", height: "100%" }} />
                            <b style={{fontSize:'5vem'}}>
                                <PhoneOutlined />: 9890401239 | 9518512567
                            <br />
                                <MailOutlined />: admissions@prepiit.com
                    </b>
                        </Card>
                    </Col>
                    <Col span={4} />
                </Row>
            </Content>
        </Layout>
    );
}