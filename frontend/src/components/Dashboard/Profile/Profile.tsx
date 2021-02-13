import { Card, Row, Col, Avatar, Descriptions } from 'antd';
import React, { useContext } from 'react'
import UserContext from '../../../context/User/UserContext';

interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = () => {
    const userContext = useContext(UserContext);
    return (
        <>
            <Row>
                <h1 style={{ fontSize: '40px' }}>My Profile</h1>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <Card style={{ textAlign: 'left', width: '100%', borderRadius: '10px' }}>
                        <Row>
                            <Col span={9}><Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} /></Col>
                            <Col span={15}>

                                {userContext.user && <h1 style={{fontSize:'1.3rem'}}>{userContext.user.name}</h1>}
                                <h1 style={{fontSize:'1rem'}}>Class:XII</h1>
                                <h1 style={{fontSize:'1rem'}}>Located at: Nashik,Maharashtra</h1>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card style={{ textAlign: 'left', width: '100%', borderRadius: '10px' }}>
                        <Descriptions bordered={true}>
                            <Descriptions.Item label='Hello'>Hello</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </>

    );
}