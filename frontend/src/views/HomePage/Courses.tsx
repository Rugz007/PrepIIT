import { Collapse, Row, Col, Divider } from 'antd';
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
                        <Collapse >
                            <Panel header={
                                <Row>
                                    <Col span={4}>
                                        <img alt='jee' src="https://img.icons8.com/office/70/000000/engineering.png" />
                                    </Col>
                                    <Col span={20} style={{ textAlign: "left" }}>
                                        <h1 style={{ fontSize: '3em', marginBottom: '0' }}>JEE Mains and Advanced</h1>
                                    </Col></Row>
                            } key={1}>
                                <p>
                                    <b>Integrated Program:</b> JEE Mains and Advanced + XI and XII ( CBSE | ICSE | HSC )<br />
                                    <b>Duration:</b> 2 years<br />
                                    Over 1000 Hrs of classroom teaching + Over 200 hrs of revision sessions + over 100 evaluation tests<br />
                                    <b>Eligibility:</b> Motivated students passing/ passed 10th standard with the consistent academic record.<br />
                                    PrepiiT will hold a screening test and personal interview and issue the admission letter to all eligible candidates.<br />
                                    <b>PrepiiT Screening test:</b> The test is administered at our centers to evaluate basic understanding of Maths and science subjects.<br />
                                    <b>Personal interview:</b> This is most important aspect of the admission process, in this 5 to 10  minutes interview all we want is to ascertain is the sincerity, motivation, and dedication of the candidate.
                                    To phrase it in one line this process helps us to ascertain if the student is ready to take on the challenges for next two years, we are always there by their side as a support system once we start this journey together.
                                    </p>
                            </Panel>

                        </Collapse>
                        <Collapse style={{ marginTop: '3%' }}>
                            <Panel header={
                                <Row>
                                    <Col span={4}>
                                        <img alt='kvpy' src="https://img.icons8.com/officel/70/000000/microscope.png" />
                                    </Col>
                                    <Col span={20} style={{ textAlign: "left" }}>
                                        <h1 style={{ fontSize: '3em', marginBottom: '0' }}>KVPY and Olympiad Program</h1>
                                    </Col></Row>
                            } key={2}>
                                <p>
                                    <b>Duration:</b> 2 years<br />
                                    <b>Eligibility:</b> Students enrolled in our Integrated Program displaying aptitude towards Pure Science and Mathematics.
                                    <br />
                                    This program is for those select few who display the aptitude and are inclined to choose Pure Science and Mathematics as the careers option.
                                    </p>
                            </Panel>
                        </Collapse>
                        <Collapse style={{ marginTop: '3%' }}>
                            <Panel header={
                                <Row>
                                    <Col span={4}>
                                        <img alt='NDA' src="https://img.icons8.com/officel/70/000000/staff-sergeant-ssg.png" />
                                    </Col>
                                    <Col span={20} style={{ textAlign: "left" }}>
                                        <h1 style={{ fontSize: '3em', marginBottom: '0' }}>NDA and NA</h1>
                                    </Col></Row>
                            } key={3}>
                                <p>
                                    <b>Duration:</b> 2 years<br />
                                    <b>Eligibility:</b> Students enrolled in our Integrated Program displaying aptitude towards Joining INDIAN ARMED FORCES.
                                    <br />
                                    Students enrolling for this program will get regular guidance from Retd. Indian Navy officers.
                                    </p>
                            </Panel>
                        </Collapse>
                        <Collapse style={{ marginTop: '3%' }}>
                            <Panel header={
                                <Row>
                                    <Col span={4}>
                                        <img alt='stem' src="https://img.icons8.com/officel/70/000000/knowledge-sharing.png" />
                                    </Col>
                                    <Col span={20} style={{ textAlign: "left" }}>
                                        <h1 style={{ fontSize: '3em', marginBottom: '0' }}>Summer Foundation Program (STEM)</h1>
                                    </Col></Row>
                            } key={4}>
                                <p>
                                    <b>Duration:</b> 2 months<br />
                                    <b>Eligibility:</b> Students from 8th, 9th and 10th
                                    <br />
                                    This program is solely designed to enrich the curious minds of children and build a scientific temperament. enabling them to retain this curious attitude alive!
                                    They perform various experiments and activities in STEM subjects and have lots of fun while learning basic concepts to build their fundamentals right.
                                    The special problem-solving sessions make them aware of the pattern and prepare them for facing the competitive exams in the future.
                                    </p>
                            </Panel>
                        </Collapse>
                        <Collapse style={{ marginTop: '3%' }}>
                            <Panel header={
                                <Row>
                                    <Col span={4}>
                                        <img alt='test' src="https://img.icons8.com/officel/70/000000/math.png" />
                                    </Col>
                                    <Col span={20} style={{ textAlign: "left" }}>
                                        <h1 style={{ fontSize: '3em', marginBottom: '0' }}>PrepiiT Test series</h1>
                                    </Col></Row>
                            } key={5}>
                                <p>
                                    JEE Mains and Advanced + XI and XII ( CBSE | ICSE | HSC )
                                    <br />
                                    <b>Duration:</b>2 years (Distance Learning Program)  <br />
                                    Over 100 evaluation tests.<br />
                                    <b>Eligibility:</b> Motivated students passing/ passed 10th standard with the consistent academic record.
                                    <br />
                                    PrepiiT Test series is specially designed distance learning program to help students evaluate their strength in each topic, our evaluation report is the main key to this program, it helps students pinpoint their strength and weakness in each topic of study.
                                    </p>
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