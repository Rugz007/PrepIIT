import { Card, Table, Button } from "antd";
import Item from "antd/lib/list/Item";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  is_reported: boolean;
}

export const QuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionInterface[] | undefined>(
    []
  );
  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/question", {
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
        "http://localhost:3000/admin/question",
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
          <Button
            type="primary"
            onClick={() => deleteQuestion(record.qid, questions, setQuestions)}
            danger
          >
            Delete
          </Button>
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
