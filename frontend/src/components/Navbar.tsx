import { Button, Col, Menu, Row, Avatar, Dropdown } from "antd";
import Layout, { Header } from "antd/lib/layout/layout";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../context/User/UserContext";
import './Navbar.css'
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
          <Header style={{ backgroundColor: "white"}}>
            <Row style={{ height: "100%" }}>
              <Col lg={2}/>
              <Col lg={2} md ={4} sm={4} xs={8}style={{ height: "100%" }}>
                <Link to="/" onClick={onClickLogo}>
                  <img alt="logo" src="logo.jpg" style={{ width: "55%" }} />
                </Link>
              </Col>
              <Col lg={16} xs={14} style={{ width: "100%",backgroundColor: "white", color: "black" }}>
                <Menu
                  style={{ backgroundColor: "white", color: "black" ,borderBottom:'0'}}
                  mode="horizontal"
                  theme='dark'
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
              {/* <Col lg={4} xs={0} style={{ height: "100%" }}>
                {userContext.user != null ? (
                  <Dropdown
                    overlay={
                      <Menu
                        style={{ backgroundColor: "white", color: "black" }}
                        theme="dark"
                        onClick={onClick}
                      >
                        <Menu.Item key="dashboard">
                          <Link style={{ color: "black" }} to="/dashboard">
                            Dashboard
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="tests">
                          <Link style={{ color: "black" }} to="/mytests">
                            My Tests
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
                      <Avatar icon={<img alt='user' style={{margin:'10% 0 30% 0'}}src="https://img.icons8.com/fluent-systems-filled/96/000000/user.png"/>} size={50} />
                    </Button>
                  </Dropdown>
                ) : (
                  <Button type="primary" size="large">
                    <Link to="/login">TAKE A TEST</Link>
                  </Button>
                )}
              </Col> */}
            </Row>
          </Header>
        </Layout>
      )}
    </>
  );
};
