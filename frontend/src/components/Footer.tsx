import { Row, Col } from 'antd'
import React from 'react'

export const Footer: React.FC = () => {
    return (
        <Row style={{ backgroundColor: '#FFFFFF', color: 'black', paddingTop: '1%' }}>
            <Col span={3} />
            <Col span={6}>
                <h1 style={{ color: 'black', marginBottom: '0' }}>Check us out on Social Media</h1>
                <div >
                    <img alt='facebook' src="https://img.icons8.com/fluent/48/000000/facebook-new.png" />
                    <img alt='instagram' src="https://img.icons8.com/fluent/48/000000/instagram-new.png" />
                    <img alt='linkedin' src="https://img.icons8.com/fluent/48/000000/linkedin.png" />
                    <img alt='youtube' src="https://img.icons8.com/fluent/48/000000/youtube-play.png" />
                </div>
            </Col>
            <Col span={6}>
                <h1 style={{ color: 'black' }}>Quick Links</h1>
                <ul>
                    <li>
                        <a>Courses</a>
                    </li>
                    <li>
                        <a>Resources</a>
                    </li>
                </ul>
            </Col>
            <Col span={6}>
                <h1 style={{ color: 'black' }}>Contact</h1>
            </Col>
            <Col span={3} />
        </Row>
    );
}