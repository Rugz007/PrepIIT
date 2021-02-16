import { Button, Col, Menu, Row, Avatar, Dropdown } from "antd";
import Layout, { Header } from "antd/lib/layout/layout";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../context/User/UserContext";
export const Navbar: React.FC = () => {
  const userContext = useContext(UserContext);
  const [current, setCurrent] = useState("Home");
  const location = useLocation();

  const onClick = (e: any) => {
    setCurrent(e.key);
  };
  const onClickLogo = () => {
    setCurrent("Home");
  };
  return (
    <>
      {location.pathname === "/test" ? (
        <></>
      ) : (
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
                  <Menu.Item key="home">
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item key="courses">
                    <Link to="/courses">Courses</Link>
                  </Menu.Item>
                  <Menu.Item key="faq">
                    <Link to="/faq">FAQ</Link>
                  </Menu.Item>
                  <Menu.Item key="about">
                    <Link to="/about">About Us</Link>
                  </Menu.Item>
                  <Menu.Item key="contact">
                    <Link to="/contact">Contact Us</Link>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col span={4} style={{ height: "100%" }}>
                {userContext.user != null ? (
                  <Dropdown
                    overlay={
                      <Menu
                        style={{ backgroundColor: "white", color: "black" }}
                        theme="dark"
                      >
                        <Menu.Item key="dashboard">
                          <Link style={{ color: "black" }} to="/dashboard">
                            Dashboard
                          </Link>
                        </Menu.Item>
                        <Menu.Item
                          key="logout"
                          onClick={() => {
                            userContext.logout();
                          }}
                        >
                          <Link style={{ color: "black" }} to="/">
                            Logout
                          </Link>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button
                      style={{
                        backgroundColor: "white",
                        border: "0",
                        height: "100%",
                      }}
                    >
                      <Avatar size={50}>User</Avatar>
                    </Button>
                  </Dropdown>
                ) : (
                  <Button type="primary" size="large">
                    <Link to="/login">TAKE A TEST</Link>
                  </Button>
                )}
              </Col>
            </Row>
          </Header>
        </Layout>
      )}
    </>
  );
};
