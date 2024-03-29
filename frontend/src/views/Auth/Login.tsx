import Layout, { Content } from "antd/lib/layout/layout";
import React, { useContext } from "react";
import { Row, Col, Form, Input, Card, Divider, Button, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

interface LoginInterface {
  email: string;
  password: string;
}
export const Login: React.FC = () => {
  let history = useHistory()
  const userContext = useContext(UserContext);

  const onFinish = (values: LoginInterface) => {

    userContext.login(values).then(()=>
    {
      history.push('/dashboard')
    }).catch(() =>
    {
      message.error("Error logging in");

    });
  };

  return (
    <Layout>
      <Content style={{ backgroundColor: "#1c2229", paddingBottom: "13.2%" }}>
        <Row>
          <Col span={4} />
          <Col span={16} style={{ padding: ".4%", paddingTop: "4%" }}>
            <Card
              bordered={false}
              style={{ height: "100%", borderRadius: "17px", margin: "0% 30%" }}
            >
              <img
                src="logo-nobg.png"
                alt="logo"
                style={{ width: "50%", margin: "auto" }}
              />
              <h1 style={{ fontSize: "25px", marginBottom: "0" }}>Login</h1>
              <Divider />
              <Form
                name="enquiry"
                onFinish={onFinish}
                scrollToFirstError
                style={{ textAlign: "left" }}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder={"Enter your Email ID."}
                  />
                </Form.Item>
                <Form.Item name="password">
                  <Input.Password
                    size="large"
                    prefix={<KeyOutlined />}
                    placeholder={"Enter your Password."}
                  />
                </Form.Item>
                {userContext.isError && <h3 style={{textAlign:"center",color:'red'}}>Password or email is wrong</h3>}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{ width: "100%", margin: "auto" }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <Link to="/forget-password">Forgot Password?</Link>
              <Divider />
              <p>
                Don't have an account? <Link to="/register">Register!</Link>
              </p>
            </Card>
          </Col>

          <Col span={4} />
        </Row>
      </Content>
    </Layout>
  );
};
