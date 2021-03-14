import Layout, { Content } from "antd/lib/layout/layout";
import React, { useContext } from "react";
import { Row, Col, Form, Input, Card, Divider, Button, Select } from "antd";
import {
  UserOutlined,
  KeyOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/User/UserContext";
const { Option } = Select;
interface RegisterInterface {
  name: string;
  email: string;
  phone_no: string;
  address: string;
  standard: string;
  password: string;
  confirmPassword?: string;
}

export const Register: React.FC = () => {
  let history = useHistory();

  const userContext = useContext(UserContext);
  const onFinish = (values: RegisterInterface) => {
    delete values.confirmPassword;
    userContext.register(values);
    history.push("/login");
  };
  return (
    <Layout>
      <Content style={{ backgroundColor: "#1c2229", paddingBottom: "4%" }}>
        <Row>
          <Col span={4} />
          <Col span={16} style={{ padding: ".4%", paddingTop: "1%" }}>
            <Card
              style={{ height: "100%", borderRadius: "17px", margin: "0% 30%" }}
            >
              <img
                src="logo-nobg.png"
                alt="logo"
                style={{ width: "46%", margin: "auto" }}
              />
              <h1 style={{ fontSize: "25px", marginBottom: "0" }}>
                Create new account
              </h1>
              <Divider />
              <Form
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                style={{ textAlign: "left" }}
              >
                <Form.Item name="name">
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder={"Enter your name."}
                  />
                </Form.Item>
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
                    prefix={<MailOutlined />}
                    placeholder={"Enter your Email ID."}
                  />
                </Form.Item>
                <Form.Item name="phone_no">
                  <Input
                    size="large"
                    prefix={<PhoneOutlined />}
                    placeholder={"Enter your phone number."}
                  />
                </Form.Item>
                <Form.Item name="address">
                  <Input
                    size="large"
                    prefix={<HomeOutlined />}
                    placeholder={"Enter your Address."}
                  />
                </Form.Item>
                <Form.Item name="class">
                  <Select placeholder={"Select your class."}>
                    <Option value="VII">VII</Option>
                    <Option value="VIII">VIII</Option>
                    <Option value="IX">IX</Option>
                    <Option value="X">X</Option>
                    <Option value="XI">XI</Option>
                    <Option value="XII">XII</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size="large"
                    prefix={<KeyOutlined />}
                    placeholder={"Enter your Password."}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<KeyOutlined />}
                    placeholder={"Re-enter your Password."}
                  />
                </Form.Item>
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
              <Divider />
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Card>
          </Col>

          <Col span={4} />
        </Row>
      </Content>
    </Layout>
  );
};
