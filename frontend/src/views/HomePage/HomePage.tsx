import { Card, Col, Divider, List, Row } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react'
import { EnquiryForm } from '../../components/HomePage/EnquiryForm';
import { Blob } from 'react-blob'
import './HomePage.css';
import CourseData from './CourseData';


interface CourseInterface {
    name: string,
    description: string,
    icon: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
}

export const HomePage: React.FC = () => {
    let courseData: Array<CourseInterface> = CourseData;
    return (
        <Layout>
            <Content style={{ backgroundColor: '#1c2229' }}>
                <Row style={{paddingBottom:'2%'}}>
                    <Col span={4} />
                    <Col span={9} style={{ paddingTop: '5%' }}>
                        <Blob size="90%"
                            style={{
                                backgroundColor: '#323c48',
                                color: 'white',
                                fontSize: '50vh',
                                padding: '4%'
                            }}
                        ><h1 style={{ fontSize: '20px' }}><b>Want to perform exceptionally in the upcoming competitive exams?</b></h1>
                            <h1 style={{ fontSize: '30px' }} ><b><b>Join us today!</b></b></h1>
                            <img src='terms.svg' alt='study' style={{ width: '100%' }} />
                        </Blob>

                    </Col>
                    <Col span={7} style={{ padding: '.4%', paddingTop: '4%' }}>
                        <EnquiryForm />
                    </Col>
                    <Col span={4} />
                </Row>
                <Row style={{height:'280px',textAlign:'center'}} className='parallex'>
                    <h1 style={{width:'100%',margin:'auto',fontSize:'30px'}}><b>Located in Pune, We are here to nurture bright minds for their bright future.</b></h1>
                </Row>
                <Row style={{marginTop:'3%'}}>
                    <Col span={4} />
                    <Col span={16}>
                        <h1 style={{fontSize:'60px'}}>Courses Offered</h1>
                        <Divider />
                        <List grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 3,
                            xxl: 3,
                        }}
                            style={{ width: "100%", margin: 'auto' }}
                            dataSource={courseData}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card hoverable style={{height:'250px'}}>
                                        <Row>
                                            <div style={{ width: '100%', margin: 'auto' }}>{item.icon}</div>
                                        </Row>
                                        <h1>{item.name}</h1>
                                    </Card>
                                </List.Item>
                            )}
                        ></List>
                    </Col>
                    <Col span={4} />
                </Row>
            </Content>
        </Layout>
    );
}   