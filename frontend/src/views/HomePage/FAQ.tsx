import React from 'react'
import { Collapse, Card, Row, Col, Divider } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
const { Panel } = Collapse;
export const FAQ: React.FC = () => {
    return (
        <Layout>
            <Content style={{ backgroundColor: '#2a323c' }}>
                <Row>
                    <h1 style={{ width: '100%', margin: 'auto' }}>Courses we Offer:</h1>
                </Row>
                <Row style={{ paddingBottom: '3%' }}>
                    <Col span={4} />
                    <Col span={16}>
                        <h1>Common Student Questions</h1>
                        <Collapse >
                            <Panel header="What method of study will guarantee my success?" key={1} >

                            </Panel>
                        </Collapse>
                        <Divider style={{ marginTop: '0' }} />
                    </Col>
                    <Col span={4} />
                </Row>
            </Content >
        </Layout >
    );
}