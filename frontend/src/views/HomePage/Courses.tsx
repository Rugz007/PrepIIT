import { Collapse, Card, Row, Col } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react'
const { Panel } = Collapse;

export const Courses: React.FC = () => {
    //Make the courses pages
    return (
        <Layout>
            <Content style={{ backgroundColor: '#2a323c' }}>
                <Row>
                    <h1 style={{ width: '100%', margin: 'auto' }}>Courses we Offer:</h1>
                </Row>
                <Row style={{ paddingBottom: '3%' }}>
                    <Col span={4} />
                    <Col span={16}>
                        <Card hoverable>
                            <Row>
                                <Col span={2}>
                                    <img alt='jee' src="https://img.icons8.com/office/100/000000/engineering.png" />
                                </Col>
                                <Col span={22} style={{ textAlign: "left" }}>
                                    <h1 style={{ fontSize: '4em' }}>JEE</h1>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={4} />
                </Row>
            </Content>
        </Layout>

    );
}