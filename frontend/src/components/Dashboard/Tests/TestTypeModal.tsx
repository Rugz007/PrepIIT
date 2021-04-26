import { Button, Modal, Form, Select, Space, Input } from "antd";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
const { REACT_APP_NODEJS_URL } = process.env;

const { Option } = Select;
interface TestTypeInterface {
  Test?: {
    testTypeID: number;
    testname: string;
    subjectsallowed: string[];
    questions: Array<{
      type: string;
      correct: number;
      wrong: number;
      nullanswer: number;
      number: number;
    }>;
  };
  buttonText: string;
}
export const TestTypeModal: React.FC<TestTypeInterface> = ({
  Test,
  buttonText,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const toSubmit = (e: any) => {
    console.log(e);
  };

  const SubmitTest = async (values: TestTypeInterface) => {
    console.log(values);
    try {
      const response = await axios.post(
        `https://${REACT_APP_NODEJS_URL}/admin/testtype`,
        {
          values,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Button onClick={() => setVisible(true)}>{buttonText}</Button>
      <Modal
        width="60%"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          var values = form.getFieldsValue();
          console.log(values);
          form.resetFields();
          if (Test !== undefined) {
            values.qid = Test.testTypeID;
          } else {
            SubmitTest(values);
          }
          setVisible(false);
        }}
      >
        <br />
        <Form
          name="TestType"
          layout="vertical"
          form={form}
          onFinish={toSubmit}
          initialValues={Test}
        >
          <Form.Item label="Test Name" name="testname">
            <Input />
          </Form.Item>
          <Form.Item label="Subjects" name="subjectsallowed">
            <Select mode="multiple">
              <Option value="physics" label="Physics">
                Physics
              </Option>
              <Option value="chemistry" label="Chemistry">
                Chemistry
              </Option>
              <Option value="maths" label="Maths">
                Maths
              </Option>
            </Select>
          </Form.Item>
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8, width: "100%" }}
                    align="baseline"
                  >
                    <Form.Item
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.area !== curValues.area ||
                        prevValues.sights !== curValues.sights
                      }
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          name={[field.name, "type"]}
                          label="Question Type"
                        >
                          <Select defaultValue="mcq">
                            <Option value="mcq">MCQ</Option>
                            <Option value="fib">Fill in the blanks</Option>
                            <Option value="anr">Assertion and Reason</Option>
                            <Option value="tof">True or False</Option>
                            <Option value="num">Numerical Question</Option>
                            <Option value="mtf">
                              Match the Following Questions
                            </Option>
                          </Select>
                        </Form.Item>
                      )}
                    </Form.Item>

                    <Form.Item
                      {...field}
                      fieldKey={[field.fieldKey, "number"]}
                      name={[field.name, "number"]}
                      label="Number of Questions"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      fieldKey={[field.fieldKey, "correct"]}
                      name={[field.name, "correct"]}
                      label="Correct Answer Marks"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "wrong"]}
                      label="Wrong Answer Marks"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "nullanswer"]}
                      label="No Answer Marks"
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};
