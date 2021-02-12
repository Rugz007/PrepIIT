import { Row, Col } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import {  MailOutlined, PhoneOutlined } from '@ant-design/icons';

export const Footer: React.FC = () => {
    return (
        <Row style={{ backgroundColor: '#FFFFFF', color: 'black', paddingTop: '1%', textAlign: 'left' }}>
            <Col span={3} />
            <Col span={6} style={{ padding: '0 3%' }}>
                <h1 style={{ color: 'black', marginBottom: '0' }}>Social Media</h1>
                <hr />
                <div >
                    <a href='https://www.facebook.com/prepiit' rel="noopener noreferrer" target="_blank"><img alt='facebook' src="https://img.icons8.com/fluent/48/000000/facebook-new.png" /></a>
                    <a href='https://www.instagram.com/prepiit/' rel="noopener noreferrer" target="_blank"><img alt='instagram' src="https://img.icons8.com/fluent/48/000000/instagram-new.png" /></a>
                    <a href='https://in.linkedin.com/in/prepiit' rel="noopener noreferrer" target="_blank"><img alt='linkedin' src="https://img.icons8.com/fluent/48/000000/linkedin.png" /></a>
                    <a href='https://www.youtube.com/channel/UCHZ1Uz5irKGZrEPXQYN92mA' rel="noopener noreferrer" target="_blank"><img alt='youtube' src="https://img.icons8.com/fluent/48/000000/youtube-play.png" /></a>
                </div>
            </Col>
            <Col span={6} style={{ padding: '0 3%' }}>
                <h1 style={{ color: 'black', marginBottom: '0' }}>Quick Links</h1>
                <hr />
                <ul>
                    <li>
                        <Link to='/courses'>Courses</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                    <li>
                        <Link to='/faq'>FAQ</Link>
                    </li>
                </ul>
            </Col>
            <Col span={6} style={{ padding: '0 3%' }}>
                <h1 style={{ color: 'black', marginBottom: '0' }}>Contact</h1>
                <hr />
                <img src='logo.jpg' alt='logo' style={{ height: '60px' }} />
                <p style={{ textAlign: 'left' }}>
                    <h3 style={{ color: 'black', marginBottom: '0' }}>Center for excellence in STEM education</h3>
                    304/305 Fortuna Business Center, opposite McDonald's, Near Shivar Garden, Pimple Saudagar, Pune 411027
                    <br />
                    <b>
                            <PhoneOutlined/>: 9890401239 | 9518512567
                            <br />
                            <MailOutlined />: admissions@prepiit.com
                    </b>
                </p>
            </Col>
            <Col span={3} />
        </Row>
    );
}