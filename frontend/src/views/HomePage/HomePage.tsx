import { Col, Row } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react'
import { EnquiryForm } from '../../components/HomePage/EnquiryForm';
import { Blob } from 'react-blob'

export const HomePage: React.FC = () => {
    return (
        <Layout>
            <Content style={{ backgroundColor: '#2a323c' }}>
                <Row >
                    <Col span={4} />
                    <Col span={9} style={{ paddingTop: '5%' }}>
                        <Blob size="90%"
                            style={{
                                backgroundColor: '#323c48',
                                color: 'white',
                                fontSize: '50vh',
                                padding: '4%'
                            }}
                        ><h1 style={{ fontSize: '28px' }}><b>Want to perform exceptionally in the upcoming competitive exams?</b></h1>
                            <h1 style={{ fontSize: '22px' }} ><b><b>Join us today!</b></b></h1>
                            <img src='terms.svg' alt='study' style={{ width: '50%' }} />
                        </Blob>

                    </Col>
                    <Col span={7} style={{ padding: '.4%', paddingTop: '4%' }}>
                        <EnquiryForm />
                    </Col>
                    <Col span={4} />
                </Row>
            </Content>
        </Layout>
    );
}   