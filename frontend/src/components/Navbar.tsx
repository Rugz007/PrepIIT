import { Menu } from 'antd'
import Layout, { Header } from 'antd/lib/layout/layout'
import React from 'react'
export const Navbar: React.FC = () => {
    return (
        <>
            <Layout>
                <Header>
                    <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item>Home</Menu.Item>
                        <Menu.Item>Home</Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        </>
    );
}