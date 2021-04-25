import { Row, Col, List, Card, Divider } from 'antd';
import React from 'react'

interface CourseDescriptionProps {

}

export const CourseDescription: React.FC<CourseDescriptionProps> = ({ }) => {
    const courseData = [
        { "name": "Ford", "models": ["Fiesta", "Focus", "Mustang"] },
        { "name": "BMW", "models": ["320", "X3", "X5"] },
        { "name": "BMW", "models": ["320", "X3", "X5"] },
        { "name": "Fiat", "models": ["500", "Panda"] }]
    return (
        <div style={{height:'90vh'}}>
            <Row style={{ marginTop: '5%' }}>
                <Col span={2} />
                <Col span={12}>
                    <p style={{ textAlign: 'left' }}>
                        <h1><b>Integrated Program:</b> JEE Mains and Advanced + XI and XII</h1>
                        <Divider/>
                  ( CBSE | ICSE | HSC )<br />
                        <b>Duration:</b> 2 years
                  <br />
                  Over 1000 Hrs of classroom teaching + Over 200 hrs of revision
                  sessions + over 100 evaluation tests
                  <br />
                        <b>Eligibility:</b> Motivated students passing/ passed 10th
                  standard with the consistent academic record.
                  <br />
                  PrepiiT will hold a screening test and personal interview and
                  issue the admission letter to all eligible candidates.
                  <br />
                        <b>PrepiiT Screening test:</b> The test is administered at our
                  centers to evaluate basic understanding of Maths and science
                  subjects.
                  <br />
                        <b>Personal interview:</b> This is most important aspect of
                  the admission process, in this 5 to 10 minutes interview all
                  we want is to ascertain is the sincerity, motivation, and
                  dedication of the candidate. To phrase it in one line this
                  process helps us to ascertain if the student is ready to take
                  on the challenges for next two years, we are always there by
                  their side as a support system once we start this journey
                  together.
                </p>
                </Col>
                <Col span={8}>
                    <img
                        style={{
                            height: "30vh",
                            zIndex: 5,
                            boxShadow: "17px 10px 37px 0px rgba(0,0,0,0.75)",
                        }}
                        src="https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                        alt="insertimage"
                    />
                </Col>
                <Col span={2} />
            </Row>
            <Row style={{ marginTop: '3%' }}>
                <Col span={2} />
                <Col span={20}>
                    <h1 style={{ textAlign: 'center', fontSize: '48px',marginBottom:'0' }}>Batches for this course:</h1>
                    <Divider/>
                    <List grid={{
                        gutter: 24,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                        style={{ width: "100%", margin: 'auto' }}
                        dataSource={courseData}
                        renderItem={(item) => (
                            <List.Item id="course-list">
                                <Card className="course-card" style={{ width: '100%', minHeight: '206px' }}>
                                    <h1>PropPrep+</h1>
                                    <h3>Class 9th passed/appeared</h3>
                                    <h3>Duration: 3 years</h3>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={2} />
                <Col span={2} />
            </Row>
        </div>

    );
}