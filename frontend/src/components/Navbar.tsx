import { Button, Col, Menu, Row, Avatar, Dropdown } from "antd";
import Layout, { Header } from "antd/lib/layout/layout";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../context/User/UserContext";
import './Navbar.css'

const StaticHeader: React.FC = () => {
  const userContext = useContext(UserContext);
  const [current, setCurrent] = useState("Home");
  const onClick = (e: any) => {
    setCurrent(e.key);
  };
  const onClickLogo = () => {
    setCurrent("Home");
  };
  return (
    <Layout>
      <Header style={{ backgroundColor: "white" }}>
        <Row style={{ height: "100%" }}>
          <Col lg={2} />
          <Col lg={2} md={4} sm={4} xs={8} style={{ height: "100%" }}>
            <Link to="/" onClick={onClickLogo}>
              <img alt="logo" src="https://i.imgur.com/Nki0mn9.jpg" style={{ width: "55%" }} />
            </Link>
          </Col>
          <Col lg={16} xs={14} style={{ width: "100%", backgroundColor: "white", color: "black" }}>
            <Menu
              style={{ backgroundColor: "white", color: "black", borderBottom: '0' }}
              mode="horizontal"
              theme='dark'
              selectedKeys={[current]}
              onClick={onClick}
              className="sideMenu"
            >
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <SubMenu className='cool-menu' title="Courses">
                <Menu.Item key='jee'>
                  <Link to='/courses/jee'>JEE Mains and Advanced</Link>
                </Menu.Item>
                <Menu.Item key='kvpy'>
                  <Link to='/courses/kvpy'>KVPY and Olympiad Program</Link>
                </Menu.Item>
                <Menu.Item key='nda'>
                  <Link to='/courses/nda'>NDA and NA</Link>
                </Menu.Item>
                <Menu.Item key='genius'>
                  <Link to='/courses/genius'>Raising the genius</Link>
                </Menu.Item>
                <Menu.Item key='tests'>
                  <Link to='/courses/tests'>PrepIIT Test Series</Link>
                </Menu.Item>
                <Menu.Item key='jam'>
                  <Link to='/courses/jam'>IIT JAM</Link>
                </Menu.Item>
              </SubMenu>
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
          <Col lg={4} xs={0} style={{ height: "100%" }}>
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
                  <Avatar icon={<img alt='user' style={{ margin: '10% 0 30% 0' }} src="https://img.icons8.com/fluent-systems-filled/96/000000/user.png" />} size={50} />
                </Button>
              </Dropdown>
            ) : (
              <>
                <Button type="primary" size="large">
                  <Link to="/login">TAKE A TEST</Link>
                </Button>
              </>

            )}
          </Col>
        </Row>
      </Header>
    </Layout>
  )
}

const DashboardHeader: React.FC = () => {
  const userContext = useContext(UserContext);
  const [current, setCurrent] = useState("Home");
  const onClick = (e: any) => {
    setCurrent(e.key);
  };
  const onClickLogo = () => {
    setCurrent("Home");
  };
  return (
    <Layout>
      <Header style={{ backgroundColor: "white", padding: 0 }}>
        <Row style={{ height: "100%" }}>
          <Col lg={2}>
            <Link to="/" onClick={onClickLogo}>
              <img alt="logo" src="https://i.imgur.com/Nki0mn9.jpg" style={{ width: "57%" }} />
            </Link>
          </Col>
          <Col lg={2} md={4} sm={4} xs={8} style={{ height: "100%" }} />
          <Col lg={16} xs={14} />
          <Col lg={4} xs={0} style={{ height: "100%" }}>
            {userContext.user != null ? (
              <Dropdown
                overlay={
                  <Menu
                    style={{ backgroundColor: "white", color: "black" }}
                    theme="dark"
                    onClick={onClick}
                  >
                    <Menu.Item key="home">
                      <Link style={{ color: "black" }} to="/">
                        Home
                      </Link>
                    </Menu.Item>
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
                  <Avatar icon={<img alt='user' style={{ margin: '10% 0 30% 0' }} src="https://img.icons8.com/fluent-systems-filled/96/000000/user.png" />} size={50} />
                </Button>
              </Dropdown>
            ) : (
              <>
                <Button type="primary" size="large">
                    <Link to="/login">TAKE A TEST</Link>
                </Button>
              </>

            )}
          </Col>
        </Row>
      </Header>
    </Layout>
  )
}
const TestHeader: React.FC = () => {
  const userContext = useContext(UserContext)
  return (
    <Layout>
      <Header style={{ backgroundColor: "white", padding: 0 }}>
        <Row style={{ height: "100%" }}>
          <Col lg={2}>
            <Link to='/'>
              <img alt="logo" src="https://i.imgur.com/Nki0mn9.jpg" style={{ width: "57%" }} />
            </Link>
          </Col>
          <Col lg={2} md={4} sm={4} xs={8} style={{ height: "100%" }}>
            <h1 style={{ color: 'black' }}>JEE Mains 2019</h1>
          </Col>
          <Col lg={16} xs={14} />
          <Col lg={4}>{userContext.user && <h2 style={{ color: 'black' }}>Student Name: {userContext.user.name}</h2>}</Col>
        </Row>
      </Header>
    </Layout>
  )
}
export const Navbar: React.FC = () => {
  const location = useLocation();
  const renderSwitch = () => {
    switch (location.pathname.split("/")[1]) {
      case 'dashboard':
        return <DashboardHeader />
      case 'test':
        return <TestHeader />
      case 'submitted':
        return null
      default:
        return <StaticHeader />
    }
  }
  return (
    <>
      {renderSwitch()}
    </>
  );
};
