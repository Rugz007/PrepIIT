import Layout, { Content } from "antd/lib/layout/layout";
import React, { useContext, useState } from "react";
import { Row, Col, Form, Input, Card, Divider, Button, message, Result } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

interface ForgetPasswordInterface {
    email: string;
}
export const ForgetPassword: React.FC = () => {
    const userContext = useContext(UserContext);
    const [sentMail, setSentMail] = useState(false)
    const onFinish = (values: ForgetPasswordInterface) => {

        userContext.forgetPassword(values).then(() => {
            setSentMail(true)
        }).catch(() => {
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
                            {sentMail ?
                                <>
                                <Result status='success' title='Email has been sent with a new password.'/>
                                </> : <>
                                    <h1 style={{ fontSize: "25px", marginBottom: "0" }}>Reset your password</h1>
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
                                        Don't have an account? <Link to="/register">Register!</Link>
                                    </p>
                                </>}

                        </Card>
                    </Col>

                    <Col span={4} />
                </Row>
            </Content>
        </Layout>
    );
};
