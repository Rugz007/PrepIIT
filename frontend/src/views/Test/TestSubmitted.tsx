import { Button, Card, Col, Divider, Result, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export const TestSubmitted: React.FC = () => {
    return (
        <Row>
            <Col span={3} />
            <Col span={18}>
                <Card style={{marginTop:'5%'}}>
                    <Result title="Test Submitted!" status='success' subTitle='Test analysis will be available soon.' />
                    <Divider/>
                    <Button size='large' type='primary'><Link to='/dashboard'>Go to Dashboard</Link></Button>
                </Card>
            </Col>
            <Col span={3} />

        </Row>
    );
}