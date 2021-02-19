import { Card, Table, Button, Space, message } from "antd";
import React, { useState } from "react";
import { QuestionModal } from "./QuestionModal";
import axios from "axios";

interface QuestionInterface {
  qid: number;
  statement: string;
  latex?: any;
  img_path?: string;
  type: string;
  subject: string;
  topic: string;
  subtopic?: string;
  level: string;
  archive?: string;
  is_reported: string | undefined;
}
export const AddQuestion: React.FC = () => {
  const [questions, setQuestions] = useState<
    Array<QuestionInterface> | undefined
  >(undefined);
  const uploadQuestions = async (values: {
    statement?: string | undefined;
    latex?: any;
    img_path?: string | undefined;
    type?: string | undefined;
    subject?: string | undefined;
    topic?: string | undefined;
    subtopic?: string | undefined;
    level?: string | undefined;
    archive?: string | undefined;
    is_reported?: string | undefined;
  }) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/editquestion",
        {
          statement: values.statement,
          latex: values.latex,
          img_path: values.img_path,
          type: values.type,
          subject: values.subject,
          topic: values.topic,
          subtopic: values.subtopic,
          level: values.level,
          archive: values.archive,
          is_reported: values.is_reported,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log("Couldn't Update");
    }
    setQuestions([]);
    message.success("Uploaded Questions");
  };
  const addQuestion = (e: QuestionInterface) => {
    if (questions === undefined) {
      setQuestions([e]);
    } else {
      setQuestions([...questions, e]);
    }
  };
  const columns = [
    {
      title: "Question Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (text: any, record: QuestionInterface) => (
        <>
          <QuestionModal
            submitEdit={undefined}
            submitNew={uploadQuestions}
            Question={record}
            Resolve={undefined}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ textAlign: "left" }}>
      <Card
        style={{ textAlign: "left", borderRadius: "10px" }}
        title={<h1 style={{ fontSize: "30px" }}>Questions to be added</h1>}
        extra={
          <Space>
            {questions === undefined ? (
              <Button disabled onClick={uploadQuestions}>
                Upload Questions
              </Button>
            ) : (
              <Button onClick={uploadQuestions}>Upload Questions</Button>
            )}
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={questions}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
};
