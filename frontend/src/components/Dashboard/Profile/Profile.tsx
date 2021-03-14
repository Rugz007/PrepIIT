import { Card, Row, Col, Avatar, Descriptions, Divider, Button, Tooltip } from 'antd';
import React, { useContext } from 'react'
import UserContext from '../../../context/User/UserContext';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './Profile.css'
import ReactTooltip from 'react-tooltip';
interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = () => {
    const userContext = useContext(UserContext);

    return (
        <>
            <Row>
                <h1 style={{ fontSize: '40px' }}>My Profile</h1>
            </Row>
            <Row>
                <div style={{ width: '100%', margin: 'auto' }}>
                    <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
                    {userContext.user && <h1 style={{ fontSize: '2rem', marginTop: "1%", marginBottom: '0' }}><b>{userContext.user.name}</b></h1>}
                    <h1 style={{ fontSize: '1rem' }}>Class:XII</h1>
                    <h1 style={{ fontSize: '1rem' }}>Located at: Nashik,Maharashtra</h1>
                </div>
            </Row>
            <Divider />
            <Row gutter={24}>
                <Col span={8}>
                    <Card title={<h2>Subscription Type</h2>} style={{ textAlign: 'left' }}>
                        <Row>
                            <Col span={24}><h2>Type: Free</h2></Col>
                            <Col span={24}><h2>Duration: --</h2></Col>
                            
                       </Row>
                        <Button style={{ float: 'right' }} type='primary'>Upgrade!</Button>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title={<h2>Your Test Activity</h2>} style={{ textAlign: 'left' }}>
                        <CalendarHeatmap
                            startDate={new Date('2015-12-31')}
                            endDate={new Date('2016-12-01')}
                            values={[
                                { date: '2016-01-01', count: 1 },
                                { date: '2016-01-12', count: 1 },
                                { date: '2016-02-12', count: 1 },
                                { date: '2016-01-30', count: 1 },
                                // ...and so on
                            ]}
                            classForValue={(value) => {
                                if (!value) {
                                    return 'color-empty';
                                }
                                return `color-scale-${value.count}`;
                            }}
                            tooltipDataAttrs={(value: any | null) => {
                                if (value.date) {
                                    return {
                                        'data-tip': `On ${value.date.slice(0, 10)}, ${value.count} tests were given.`,
                                    };
                                }
                            }
                            }
                        />
                        <ReactTooltip/>
                    </Card>
                </Col>
            </Row>
        </>

    );
}