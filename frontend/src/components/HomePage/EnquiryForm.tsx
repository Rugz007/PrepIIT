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
      style={{ height: "100%", borderRadius: "17px", marginLeft: "3%" }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "0" }}>
        <b>Enquiry Form</b>
      </h1>
      <h3>Put in your details and we will be in touch with you soon.</h3>
      <Divider />
      <Form
        name="enquiry"
        onFinish={onFinish}
        scrollToFirstError
        style={{ textAlign: "left" }}
      >
        <h2>
          <b>Full Name:</b>
        </h2>
        <Form.Item name="name">
          <Input placeholder={"Enter your Full Name."} />
        </Form.Item>
        <h2>
          <b>Email ID:</b>
        </h2>
        <Form.Item name="email">
          <Input placeholder={"Enter your Email ID"} />
        </Form.Item>
        <h2>
          <b>Phone Number</b>
        </h2>
        <Form.Item name="number">
          <Input placeholder={"Enter your Phone Number."} />
        </Form.Item>
        <h2>
          <b>What class are you enquiring for?</b>
        </h2>
        <Form.Item name="standard">
          <Select placeholder={"Select your class."}>
            <Option value="VII">VII</Option>
            <Option value="VIII">VIII</Option>
            <Option value="IX">IX</Option>
            <Option value="X">X</Option>
            <Option value="XI">XI</Option>
            <Option value="XII">XII</Option>
          </Select>
        </Form.Item>
        <h2>
          <b>What are you looking for?</b>
        </h2>
        <Form.Item name="type">
          <Select placeholder={"Select one option."}>
            <Option value="JEE">
              Integrated Program: JEE Mains and Advanced + XI and XII ( CBSE |
              ICSE | HSC )
            </Option>
            <Option value="KVPY">KVPY and Olympiad Program</Option>
            <Option value="NDA">NDA and NA</Option>
            <Option value="STEM">Summer Foundation Program (STEM)</Option>
            <Option value="Test">PrepiiT Test series</Option>
          </Select>
        </Form.Item>
        <ReCAPTCHA
          sitekey="6LfhIz0aAAAAAORE5vd7fw2XQjYKfVsFjHyB5EGQ"
          theme="dark"
          onChange={onCaptchaChange}
        ></ReCAPTCHA>
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
