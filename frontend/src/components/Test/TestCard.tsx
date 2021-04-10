import { Button, Card, Row, Col, Tag } from 'antd';
import React from 'react'
import {useHistory} from 'react-router-dom';
interface TestCardProps {
    test:
    {
        testid: number,
        testname: string,
        subjectsallowed: string[],
    }
};
export const TestCard: React.FC<TestCardProps> = ({ test }) => {
    const history = useHistory()
    const onClick = () => {
        localStorage.setItem("testid",test.testid.toString());
        history.push(`/test/${test.testid}`)
    };
    return (
        <div style={{ textAlign: 'center' }}>
            <Card style={{ minHeight: '300px', width: "90%", margin: '30px auto', borderRadius: "17px", backgroundColor: '#0a101a' }}>
                <Row>
                    <Col span={24}>
                        <h1 style={{ marginBottom: '0' }}><b>{test.testname}</b></h1>
                    </Col>
                    <Col span={24}>
                        <h3>JEE Mains 2019 Pattern</h3>
                        <h4>Duration: 3hr</h4>
                    </Col>
                    <Col span={24}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut vulputate ex, sit amet sagittis felis.  </p>
                    </Col>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        {test.subjectsallowed.map((item) => (
                            <>
                                {item === "physics" && <Tag color="#007371">Physics</Tag>}
                                {item === "maths" && <Tag color="#5e9100">Maths</Tag>}
                                {item === "chemistry" && <Tag color="#006316">Chemistry</Tag>}
                            </>
                        ))}
                    </Col>
                    <Col span={24} style={{ marginTop: '6%' }}>
                        <Button onClick={onClick} style={{ width: '80%' }}>Give Test</Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}