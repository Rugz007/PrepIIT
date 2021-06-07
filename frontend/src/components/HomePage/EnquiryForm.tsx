import React, { useState } from "react";
import { Button, Card, Divider, Form, Input, Select } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
const { Option } = Select;

interface EnquiryFormInterface {
  name: string;
  email: string;
  number: string;
  standard: string;
  type: string;
}

export const EnquiryForm: React.FC = () => {
  const [captchaBool, setCaptchaBool] = useState(false);
  const onFinish = async (values: EnquiryFormInterface) => {
    try {
      const res = await axios.post("https://localhost:3000/sendmail", values);
      console.log(res);
    } catch (e) {
      console.log(e);
      console.log("Could not send mail");
    }
  };
  const onCaptchaChange = (value: string | null) => {
    setCaptchaBool(Boolean(value));
  };
  return (
    <Card
      bordered={false}
      style={{ height: "100%", borderRadius: "17px", margin: '0 2%' }}
    >
      <h1 style={{ fontSize: "25px", marginBottom: "0" }}>
        <b>Call admission hotline: <span style={{fontSize:'30px'}}>9890401239</span></b>
      </h1>
      <h1 style={{ fontSize: "25px", marginBottom: "0" }}>
        <b> or Reach out to us!</b>
      </h1>
      <Divider />
      <Form
        name="enquiry"
        onFinish={onFinish}
        scrollToFirstError
        style={{ textAlign: "left" }}
      >
        <h2>
          <b>Name:</b>
        </h2>
        <Form.Item name="name">
          <Input placeholder={"Enter your Name."} />
        </Form.Item>
        <h2>
          <b>Phone Number</b>
        </h2>
        <Form.Item name="number">
          <Input placeholder={"Enter your Phone Number."} />
        </Form.Item>

        <ReCAPTCHA
          sitekey="6LfhIz0aAAAAAORE5vd7fw2XQjYKfVsFjHyB5EGQ"
          theme="dark"
          onChange={onCaptchaChange}
        />
        <Form.Item name="button">
          <Button
            type="primary"
            disabled={!captchaBool}
            htmlType="submit"
            size="large"
            style={{ width: "100%", margin: "auto" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
