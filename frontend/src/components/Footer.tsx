import { Row, Col } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

export const Footer: React.FC = () => {
    const location = useLocation();
    return (
        <>
            {(location.pathname.split("/")[1] === 'test' || location.pathname.split("/")[1] === 'login' || location.pathname.split("/")[1] === 'register' || location.pathname.split("/")[1] === 'dashboard' || location.pathname.split("/")[1] === 'submitted') ? <></> : <Row style={{ backgroundColor: '#FFFFFF', color: 'black', paddingTop: '1%', textAlign: 'left' }}>
                <Col lg={3} />
                <Col lg={6} md={24}  sm={24}style={{ padding: '0 3%' }}>
                    <h1 style={{ color: 'black', marginBottom: '0' }}>Details</h1>
                    <hr />
                    <p style={{ textAlign: 'left' }}>
                        <h3  style={{ color: 'black', marginBottom: '0' }}>Admission Hotline </h3>
                        <h2  style={{ color: 'black', marginBottom: '0' }}><PhoneOutlined />: 9890401239</h2>
                        <h3 style={{ color: 'black', marginBottom: '0' }}>Center for excellence in STEM education</h3>
                        Fortuna Business centre 303, 304, Shivar Garden Road, Pune, Maharashtra 411027
                        <br />
                        <b>
                            <MailOutlined />: admissions@prepiit.com
                        </b>
                    </p>
                    <div >
                        <a href='https://www.facebook.com/prepiit' rel="noopener noreferrer" target="_blank"><img alt='facebook' src="https://img.icons8.com/fluent/48/000000/facebook-new.png" /></a>
                        <a href='https://www.instagram.com/prepiit/' rel="noopener noreferrer" target="_blank"><img alt='instagram' src="https://img.icons8.com/fluent/48/000000/instagram-new.png" /></a>
                        <a href='https://in.linkedin.com/in/prepiit' rel="noopener noreferrer" target="_blank"><img alt='linkedin' src="https://img.icons8.com/fluent/48/000000/linkedin.png" /></a>
                        <a href='https://www.youtube.com/channel/UCHZ1Uz5irKGZrEPXQYN92mA' rel="noopener noreferrer" target="_blank"><img alt='youtube' src="https://img.icons8.com/fluent/48/000000/youtube-play.png" /></a>
                    </div>
                </Col>
                <Col lg={6} sm={24}  md={24} style={{ padding: '0 3%' }}>
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
                <Col lg={6} md={24} sm={24} style={{ padding: '0 3%' }}>
                    <h1 style={{ color: 'black', marginBottom: '0' }}>Contact</h1>
                    <hr />
                    <img src='logo.jpg' alt='logo' style={{ height: '60px' }} />
                    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.51781872726!2d73.78694331489385!3d18.595764987365264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b91f2b19a78d%3A0x50cda88d1f11206e!2sPrepiiT!5e0!3m2!1sen!2sin!4v1617301346273!5m2!1sen!2sin" style={{ width: "100%", height: "30%" }} />

                    <h3 style={{ color: 'black', marginBottom: '0' }}>Stay Updated</h3>
                    <input style={{width:'70%'}} id='newsletter' placeholder="Subscribe to our newsletter"/>
                </Col>
                <Col lg={3} />
            </Row>}
        </>
    );
}