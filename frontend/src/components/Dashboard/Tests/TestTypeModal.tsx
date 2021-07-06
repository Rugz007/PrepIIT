import { Button, Modal, Form, Select, Space, Input, TimePicker, Divider, message } from "antd";
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
  getFunction?: Function;
}
export const TestTypeModal: React.FC<TestTypeInterface> = ({
  Test,
  buttonText,
  getFunction
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [time, setTime] = useState('')
  const toSubmit = (e: any) => {
    console.log(e);
  };
  const SubmitTest = async (values: TestTypeInterface) => {
    console.log(values);
    try {
      const response = await axios.post(
        `http://${REACT_APP_NODEJS_URL}/admin/statictest`,
        {
          values,
          time,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      message.success("Created a test sucessfully!")
      if (getFunction) {
        getFunction();
      }
    } catch (e) {
      console.log(e)
      message.error("Something went wrong")
    }
  };
  const onChangeTime = (value: any, timeString: string) => {
    setTime(timeString)
  }
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
            //TODO : Write editing code after rajat writes query
          } else {
            SubmitTest(values);
          }
          setVisible(false);
        }}
      >
        <h1>Create Static Test</h1>
        <Divider />
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
                          <Select placeholder='Select Question Type'>
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
          <Form.Item name='startDate' label="Select time of test [HH:mm]">
            <Space direction="horizontal" size={12}>
              <TimePicker onChange={onChangeTime} format={"HH:mm"} />
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
