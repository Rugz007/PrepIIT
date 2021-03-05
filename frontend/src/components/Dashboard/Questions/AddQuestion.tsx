import { Card, Table, Button, Space, message } from "antd";
import React, { useState } from "react";
import { QuestionModal } from "./QuestionModal";
import axios from "axios";
import env from "react-dotenv";
interface QuestionInterface {
  qid: number;
  statement: string;
  img_path?: string;
  type: string;
  subject: string;
  topic: string;
  subtopic?: string;
  level: string;
  archive?: string;
  is_reported: boolean | undefined;
}
export const AddQuestion: React.FC = () => {
  const [questions, setQuestions] = useState<
    Array<QuestionInterface> | undefined
  >(undefined);
  const uploadQuestions = async (values: QuestionInterface) => {
    console.log(values);
    try {
      if (questions === undefined) {
        setQuestions([values]);
      } else {
        setQuestions([...questions, values]);
      }
      const response = await axios.post(
        `http://${env.NODEJS_URL}/admin/question`,
        {
          statement: values.statement,
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
    message.success("Uploaded Questions");
  };
  const columns = [
    {
      title: "Statement",
      dataIndex: "statement",
      key: "statement",
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
            <QuestionModal
            submitNew={uploadQuestions}
            submitEdit={undefined}
          />
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
