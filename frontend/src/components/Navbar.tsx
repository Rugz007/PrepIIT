//Bug Report: Navbar doesn't reflect changes when home logo is pressed
import { Button, Col, Menu, Row } from "antd";
import Layout, { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [current, setCurrent] = useState('Home');
  const onClick = (e: any) => {
    setCurrent(e.key);
  };
  const onClickLogo = () => {
    setCurrent("Home");
  };

  return (
    <>
      <Layout>
        <Header style={{ backgroundColor: "white" }}>
          <Row style={{ height: "100%" }}>
            <Col span={4} style={{ height: "100%" }}>
              <Link to="/" onClick={onClickLogo}>
                <img alt="logo" src="logo.jpg" style={{ height: "98%" }} />
              </Link>
            </Col>
            <Col span={16} style={{ height: "100%" }}>
              <Menu
                style={{ backgroundColor: "white", color: "black" }}
                mode="horizontal"
                theme="dark"
                selectedKeys={[current]}
                onClick={onClick}
              >
                <Menu.Item key='home'>
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key='courses'>
                  <Link to="/courses">Courses</Link>
                </Menu.Item>
                <Menu.Item key='faq'>
                  <Link to="/faq">FAQ</Link>
                </Menu.Item>
                <Menu.Item key='about'>
                  <Link to="/about">About Us</Link>
                </Menu.Item>
                <Menu.Item key='contact'>
                  <Link to="/contact">Contact Us</Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={4} style={{ height: "100%" }}>
              <Button type="primary" size="large">
                TAKE A TEST
              </Button>
            </Col>
          </Row>
        </Header>
      </Layout>
    </>
  );
};
