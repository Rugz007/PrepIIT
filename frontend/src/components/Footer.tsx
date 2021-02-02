import { Divider, Row, Col } from 'antd'
import Layout, { Footer as AntDFooter } from 'antd/lib/layout/layout';
import React from 'react'

export const Footer: React.FC = () => {
    return (
        <Layout>
            <AntDFooter style={{ backgroundColor: '#2a323c' }}>
                <Divider />
                <Row>
                    <Col span={3} />
                    <Col span={6}>
                        <h1>Check us out on Social Media</h1>
                    </Col>
                    <Col span={6}>
                        <h1>Quick Links</h1>
                    </Col>
                    <Col span={6}>
                        <h1>Check us out on Social Media</h1>
                    </Col>
                    <Col span={3} />
                </Row>
            </AntDFooter>
        </Layout>
    );
}