import { Button, Col, Menu, Row } from 'antd'
import Layout, { Header } from 'antd/lib/layout/layout'
import React from 'react'
import {Link, } from "react-router-dom";

export const Navbar: React.FC = () => {
    return (
        <>
            <Layout>
                <Header style={{ backgroundColor: 'white' }}>
                    <Row style={{ height: '100%' }} > 
                        <Col span={4} style={{ height: '100%' }} >
                            <Link to='/'><img alt='logo' src='logo.jpg' style={{ height: '98%' }} /></Link>
                        </Col>
                        <Col span={16} style={{ height: '100%' }} >
                            <Menu style={{ backgroundColor: 'white', color: 'black' }} mode="horizontal" theme='dark' defaultSelectedKeys={['2']}>
                                <Menu.Item><Link to='/'>Home</Link></Menu.Item>
                                <Menu.Item><Link to='/'>About Us</Link></Menu.Item>
                                <Menu.Item><Link to='/'>Blog</Link></Menu.Item>
                                <Menu.Item><Link to='/contact'>Contact Us</Link></Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={4} style={{ height: '100%' }}> 
                            <Button type='primary' size='large'>
                                TAKE A TEST
                            </Button>
                        </Col>
                    </Row>
                </Header>
            </Layout>
        </>
    );
}