import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  message,
  Space,
  Row,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import React, { useState, useEffect } from "react";
import Levels from "./DifficultyLevel";
import { MathComponent } from 'mathjax-react';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import "./QuestionModal.css";
const { Option } = Select;

interface initialValuesInterface {
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
  answers: Array<string>;
  options: Array<string>;
  range1?: string;
  range2?: string;
}

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
    answers: Array<string>;
    options: Array<string>;
    range1?: string;
    range2?: string;
  };
  submitEdit: Function | undefined;
  submitNew: Function | undefined;
  buttonText: string;
}
interface Level {
  name: string;
}

export const OptionComponent: React.FC = () => {
  return (
    <>
      <Input />
    </>
  )
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
  const [latex, setLatex] = useState(Question?.latex);
  const [latexError, setLatexError] = useState<string>("")
  const [answerType, setAnswerType] = useState(Question?.type)
  useEffect(() => {
    if (Question) {
      setAnswerType(Question.type)
      if (Question.latex) {
        setLatex(Question.latex)
      }
    }
    else {
      setLatex("")
    }
  }, [Question?.qid])
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
  const processQuestionProp = (Question: initialValuesInterface) => {
    let temp: Array<string> = []
    let temp1: any = { ...Question };
    switch (Question.type) {
      case 'mcq':
        temp.push((Question.options.indexOf(Question.answers[0]) + 1).toString())
        temp1.answers = temp;
        return temp1;
      case 'anr':
        temp.push((Question.options.indexOf(Question.answers[0]) + 1).toString())
        temp1.answers = temp;
        return temp1;
      case 'tof':
        return Question;
      case 'fib':
        return Question;
      case 'num':
        temp1.range1 = temp1.options[0]
        temp1.range2 = temp1.options[1]
        return temp1;
      case 'mac':
        temp = []
        Question.answers.forEach((answer) => {
          temp.push((Question.options.indexOf(answer) + 1).toString())
        })
        temp1 = { ...Question }
        temp1.answers = temp;
        return temp1;
      default:
        return Question;
    }
  }
  const handleSelect = (e: any) => {
    setAnswerType(e)
  }
  const onOk = (e: any) => {
    var values = form.getFieldsValue();
    var proccessed = values;
    if (Question !== undefined) {
      values.qid = Question.qid;
      proccessed = processAnswers(values)
    }
    else {
      proccessed = processAnswers(values)
    }
    try {
      if (submitEdit) {
        submitEdit(proccessed)

      } else if (submitNew) {
        submitNew(proccessed)
        form.resetFields()
      }
    }
    catch {

    }
    setVisible(false);
  }

  const processAnswers = (values: any) => {
    switch (answerType) {
      case 'mcq':
        values.answers = [values.options[values.answers - 1]]
        break;
      case 'anr':
        values.answers = [values.options[values.answers - 1]]
        break;
      case 'fib':
        values.answers = [values.answers];
        break;
      case 'tof':
        values.options = ['true', 'false'];
        values.answers = [values.answers];
        break;
      case 'num':
        values.options = [values.range1, values.range2];
        break;
      case 'mac':
        let temp: any = []
        values.answers.split(',').forEach((element: any) => {
          temp.push(values.options[element - 1])
        });
        values.answers = temp
        break;
    }
    return values;
  }
  const onLatexChange = (e: any) =>
    [
      setLatex(e.target.value)
    ]
  return (
    <>
      <Button
        style={{ marginRight: "2%" }}
        type="primary"
        onClick={() => { if (Question) { form.setFieldsValue(processQuestionProp(Question)); } setVisible(true) }}
      >
        {buttonText}
      </Button>
      <Modal
        width="60%"
        visible={visible}
        onOk={onOk}
        onCancel={() => setVisible(false)}
      >
        <br />
        {Question !== undefined && <h1>Question ID: {Question.qid}</h1>}
        <Form form={form} initialValues={Question ? processQuestionProp(Question) : undefined} layout="vertical">
          <Form.Item name="statement" label="Question Statement">
            <TextArea
              autoSize={{ minRows: 2, maxRows: 5 }}
              placeholder="Enter Question Here"
            />
          </Form.Item>
          <Row style={{ width: '100%' }}>
            <Form.Item name="latex" label="Latex for the question" style={{ width: '50%' }}>
              <TextArea
                autoSize={{ minRows: 2, maxRows: 5 }}
                placeholder="Enter Latex Here"
                onChange={onLatexChange}
                value={latex}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <div style={{ marginLeft: '10%', marginTop: "2%" }}>
              <p>{latexError}</p>
              <MathComponent tex={latex} onError={(error: string) => setLatexError(error)} />
            </div>
          </Row>
          <Space align="baseline" style={{ display: "flex" }}>
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
              <Select placeholder="Select Subject">
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
            <Form.Item name="topic" label="Topic">
              <Input placeholder="Enter Topic Here" />
            </Form.Item>
            <Form.Item name="subtopic" label="Sub Topic">
              <Input placeholder="Enter Subtopic Here" />
            </Form.Item>
            <Form.Item name="level" label="Difficulty Level">
              <Select placeholder="Select Difficulty Level">
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
          <Form.Item name="is_reported" valuePropName="checked">
            <Checkbox defaultChecked={Question?.is_reported}>Is the question reported?</Checkbox>
          </Form.Item>
          <Form.Item name='type'>
            <Select style={{ width: '30%', marginBottom: '2%' }} onSelect={handleSelect} disabled={!submitNew} placeholder="Please Select Answer Type">
              <Option value="mcq">Multiple Choice</Option>
              <Option value="fib">Fill in the blank</Option>
              <Option value="num">Numerical Question</Option>
              <Option value="tof">True or False</Option>
              <Option value="anr">Assertion and Reason</Option>
              <Option value="mac">Multiple Answer Correct</Option>
            </Select>
          </Form.Item>

          {answerType === "num" &&
            <>
              <Form.Item name='range1'>
                <Input placeholder="Enter the start range" />
              </Form.Item>
              <Form.Item name='range2'>
                <Input placeholder="Enter the end range" />
              </Form.Item>
            </>
          }
          {answerType === "fib" &&
            <Form.Item name="answers">
              <Input placeholder="Enter the correct answer" />
            </Form.Item>}
          {(answerType === "mcq" || answerType === "anr" || answerType === 'mac') &&
            <>
              <Form.List name="options">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        label={index === 0 ? 'Option' : ''}
                        required={false}
                        key={field.key}>
                        <Form.Item  {...field}
                          validateTrigger={['onChange', 'onBlur']} style={{ width: '90%' }}>
                          <Input placeholder={"Option " + (index + 1).toString()} style={{ width: '90%' }} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Form.Item>
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
              <Form.Item name='answers'>
                <Input placeholder='Enter the number of correct option [1,2,3...]' />
              </Form.Item>
            </>}
          {answerType === "tof" &&
            <Form.Item name="answers">
              <Select placeholder="Select True or False">
                <Option value="true">True</Option>
                <Option value="false">False</Option>
              </Select>
            </Form.Item>}
        </Form>
      </Modal>
    </>
  );
};
