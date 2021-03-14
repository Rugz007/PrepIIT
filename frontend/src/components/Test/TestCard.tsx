import { Button, Card, Row, Col, Tag } from 'antd';
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';

interface TestCardProps {

}

export const TestCard: React.FC<TestCardProps> = ({ }) => {
    const [flipped, setFlipped] = useState(false)

    const handleClick = () => {
        setFlipped(!flipped)
    }
    return (
        <div>
            <Card style={{ height: '300px', width: "90%", margin: '30px auto', borderRadius: "17px",backgroundColor:'#0a101a' }}>
                <Row>
                    <Col span={24}>
                        <h1 style={{marginBottom:'0'}}><b>Test Name</b></h1>
                    </Col>
                    <Col span={24}>
                        <h3>JEE Mains Pattern</h3>
                        <h4>Duration: 3hr</h4>
                    </Col>
                    <Col span={24}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut vulputate ex, sit amet sagittis felis.  </p>
                    </Col>
                    <Col span={24} style={{textAlign:'center'}}>
                        <div style={{width:'100%',margin:'auto'}}>
                        <Tag color="#007371">Physics</Tag>
                        <Tag color="#5e9100">Maths</Tag>
                        <Tag color="#006316">Chemistry</Tag>
                        </div>
                        
                    </Col>
                    <Col span={24} style={{marginTop:'6%'}}>
                        <Button style={{ width: '80%'}}>Give Test</Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}