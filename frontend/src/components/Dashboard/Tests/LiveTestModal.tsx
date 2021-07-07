import { Button, Modal, Form, Select, Space, Input, TimePicker, DatePicker, Divider, message } from "antd";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { REACT_APP_NODEJS_URL } = process.env;

const { Option } = Select;
interface TestTypeInterface {
  Test?: {
    liveid: number;
    livename: string;
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
  fetchTestDetails: Function;
}
export const LiveTestModal: React.FC<TestTypeInterface> = ({
  Test,
  buttonText,
  fetchTestDetails
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [date, setDate] = useState("")
  const [time, setTime] = useState(['', ''])
  const SubmitTest = async (values: any) => {
    // console.log(values);
    // delete values.time;
    // delete values.date;
    // console.log(values)
    try {
      const response = await axios.post(
        `http://${REACT_APP_NODEJS_URL}/admin/livetest`,
        {
          values,
          date,
          time,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      message.success("Live Test Created!");
      fetchTestDetails();
      form.resetFields();
      setVisible(false);

    } catch (e) {
      message.error("Error while making a live test!")
    }
  };
  const processTestProp = (response: any) => {
    let temp = { ...response };
    temp['date'] = moment(temp['startyear'] + "-" + temp['startmonth'] + '-' + temp['startday'], "YYYY-MM-DD");
    temp['time'] = [moment(temp['starthour'] + ":" + temp['startminute'], "hh:mm"), moment(temp['endhour'] + ":" + temp['endminute'], "hh:mm")];
    return temp
  }
  const onChangeDate = (value: any, dateString: string) => {
    if (date !== dateString) {
      setDate(dateString)
    }
  }
  const onChangeTime = (value: any, timeString: [string, string]) => {
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
          if (Test !== undefined) {
            values.liveid = Test.liveid;
            SubmitTest(values);
          } else {
            SubmitTest(values);
          }
        }}
      >
        <h1>Create Live Test</h1>
        <Divider />
        <Form
          name="TestType"
          layout="vertical"
          form={form}
          initialValues={Test ? processTestProp(Test) : undefined}
        >
          <Form.Item label="Test Name" name="livename">
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
              <Option value="biology" label="Biology">
                Biology
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
                          <Select>
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
          <Space direction="horizontal" size={12}>
            <Form.Item name='date' label="Select Date of test">
              <DatePicker onChange={onChangeDate} />
            </Form.Item>
            <Form.Item name='time' label="Select Time of test">
              <TimePicker.RangePicker onChange={onChangeTime} format={"HH:mm"} />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
