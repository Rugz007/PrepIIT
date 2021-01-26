import {  Col, Row } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react'
import { InquiryForm } from '../../components/HomePage/InquiryForm';


export const HomePage: React.FC = () => {
    return (
        <Layout>
            <Content style={{backgroundColor:'#000b14'}}>
                <Row >
                    <Col span={4} />
                    <Col span={9} style={{paddingTop:'5%'}}>
                        <h1 style={{fontSize:'28px'}}><b>Want to perform exceptionally in the upcoming competitive exams?</b></h1>
                        <h1 style={{fontSize:'22px'}} ><b><b>Join us today!</b></b></h1>
                        <img src='study.svg' alt='study' style={{width:'50%'}}/>
                    </Col>
                    <Col span={7} style={{padding:'.4%',paddingTop:'4%'}}>
                        <InquiryForm />
                    </Col>
                    <Col span={4} />
                </Row>
            </Content>
        </Layout>
    );
}