import { Card, Table, Button, Popconfirm } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { QuestionModal } from "./QuestionModal";
const { REACT_APP_NODEJS_URL } = process.env;

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
  is_reported: boolean;
  answers: Array<string>;
  options: Array<string>;
  range1?:string;
  range2?:string;
}

export const QuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionInterface[] | undefined>(
    []
  );
  useEffect(() => {
    fetchBankDetails();
  }, []);
  const submitEdit = async (Question: QuestionInterface) => {
    try {
      const response = await axios.post(
        `http://${REACT_APP_NODEJS_URL}/admin/editquestion`,
        {
          qid: Question.qid,
          statement: Question.statement,
          img_path: Question.img_path,
          type: Question.type,
          subject: Question.subject,
          topic: Question.topic,
          subtopic: Question.subtopic,
          level: Question.level,
          archive: Question.archive,
          is_reported: Question.is_reported,
          answers:Question.answers,
          options:Question.options
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
  };
  const fetchBankDetails = async () => {
    try {
      const res = await axios.get(`http://${REACT_APP_NODEJS_URL}/admin/question`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(res.data);
      setQuestions(res.data);
    } catch (e) {
      console.log("Questions not Loaded");
    }
  };
  const deleteQuestion = async (
    qid: Number,
    questions: any[] | undefined,
    setQuestions: {
      (value: React.SetStateAction<QuestionInterface[] | undefined>): void;
      (arg0: any): void;
    }
  ) => {
    try {
      const response = await axios.delete(
        `http://${REACT_APP_NODEJS_URL}/admin/question`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            qid: qid,
          },
        }
      );
      console.log(response);
      if (questions) {
        const newState = questions.filter(
          (item: { qid: Number }) => item.qid !== qid
        );
        setQuestions(newState);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const columns = [
    {
      title: "Question ID",
      dataIndex: "qid",
      key: "qid",
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
            submitNew={undefined}
            submitEdit={submitEdit}
            Question={record}
            buttonText="Edit Question"
          />
          <Popconfirm
            title="Are you sure you want to delete this question?"
            onConfirm={() =>
              deleteQuestion(record.qid, questions, setQuestions)
            }
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <div style={{ textAlign: "left" }}>
      <h1 style={{ fontSize: "40px" }}>Question Bank</h1>
      <Card style={{ textAlign: "left", borderRadius: "10px" }}>
        <h1 style={{ fontSize: "30px" }}>View Latest Added Questions</h1>
        <Table
          columns={columns}
          dataSource={questions}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
};
