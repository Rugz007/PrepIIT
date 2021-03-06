import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  message,
  Space,
  Upload,
  Tabs,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import Levels from "./DifficultyLevel";
import { UploadOutlined } from "@ant-design/icons";
import "./QuestionModal.css";

//TODO: Make use Select
interface QuestionInterface {
  Question?: {
    qid: number | undefined;
    statement: string | undefined;
    latex?: any | undefined;
    img_path?: string | undefined;
    type: string | undefined;
    subject: string | undefined;
    topic: string | undefined;
    subtopic?: string | undefined;
    level: string | undefined;
    archive?: string | undefined;
    is_reported: boolean | undefined;
  };
  submitEdit: Function | undefined;
  submitNew: Function | undefined;
  buttonText: string;
}
interface Level {
  name: string;
}
export const QuestionModal: React.FC<QuestionInterface> = ({
  Question,
  submitEdit,
  submitNew,
  buttonText,
}) => {
  const [form] = Form.useForm();
  const levels: Array<Level> | undefined = Levels;
  const [visible, setVisible] = useState(false);
  const props = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <Button
        style={{ marginRight: "2%" }}
        type="primary"
        onClick={() => setVisible(true)}
      >
        {buttonText}
      </Button>
      <Modal
        width="60%"
        visible={visible}
        onOk={() => {
          var values = form.getFieldsValue();
          form.resetFields();
          if (Question !== undefined) {
            values.qid = Question.qid;
          }
          if (submitEdit) submitEdit(values);
          else if (submitNew) submitNew(values);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        <br />
        {Question !== undefined && <h1>Question ID: {Question.qid}</h1>}
        <Form form={form} initialValues={Question} layout="vertical">
          <Tabs>
            <Tabs.TabPane tab="Question Information" key="1">
              {/* TODO: Implement React-Latex */}
              <Form.Item name="statement" label="Question Statement">
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 5 }}
                  placeholder="Enter Question Here"
                />
              </Form.Item>
              <Space align="baseline" style={{ display: "flex" }}>
                <Form.Item name="type" label="Question Type">
                  <Input placeholder="Enter Question Type Here" />
                </Form.Item>
                <Form.Item name="img_path" label="Question Image">
                  <Upload {...props}>
                    <Button type="primary" icon={<UploadOutlined />}>
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Space>
              <Space align="baseline">
                <Form.Item name="subject" label="Subject">
                  <Input placeholder="Enter Subject Here" />
                </Form.Item>
                <Form.Item name="topic" label="Topic">
                  <Input placeholder="Enter Topic Here" />
                </Form.Item>
                <Form.Item name="subtopic" label="Sub Topic">
                  <Input placeholder="Enter Subtopic Here" />
                </Form.Item>
                <Form.Item name="level" label="Difficulty Level">
                  <Select>
                    {levels.map((level) => (
                      <Select.Option value={level.name}>
                        {" "}
                        {level.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="archive" label="Archive Year">
                  <Input placeholder="What year was the question asked in?" />
                </Form.Item>
              </Space>
              <Form.Item name="is_reported">
                <Checkbox defaultChecked={Question?.is_reported}>Is the question reported?</Checkbox>
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Answer" key="2">
              Work in Progress
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Modal>
    </>
  );
};
