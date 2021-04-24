import { Card, Row, Col, Avatar, Divider, Button } from 'antd';
import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../context/User/UserContext';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './Profile.css'
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
const { REACT_APP_NODEJS_URL } = process.env;

interface ProfileProps {

}
interface HeatMapDetails {
    date: string,
    count: number | string,
}

export const Profile: React.FC<ProfileProps> = () => {
    const userContext = useContext(UserContext);
    const [heatmapDetails, setHeatmapDetails] = useState<HeatMapDetails[] | undefined>(undefined)
    const getHeatMapDetails = () => {
        axios({
            method: "POST",
            url: `https://${REACT_APP_NODEJS_URL}/secure/getheatmap`,
            headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: {
                userid: userContext.user.userid
            },
        })
            .then((res) => {
                if (res.data !== []) {
                    res.data.forEach((element :any)=> {
                        element.count = parseInt(element.count)
                    });
                    setHeatmapDetails(res.data)
                }
            })
    }
    useEffect(() => {
        if (heatmapDetails === undefined) {
            getHeatMapDetails()
        }
    })
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
                        {heatmapDetails && <CalendarHeatmap
                            startDate={new Date('2020-12-31')}
                            endDate={new Date('2021-12-01')}
                            values={heatmapDetails}
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
                        />}

                        <ReactTooltip />
                    </Card>
                </Col>
            </Row>
        </>

    );
}