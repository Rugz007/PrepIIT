import { Card, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { QuestionModal } from "./QuestionModal";
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

export const ReportedQuestions: React.FC = () => {
  const [reported, setReported] = useState<QuestionInterface[] | undefined>([]);
  const submitEdit = async (Question: QuestionInterface) => {
    console.log("Question")
    console.log(Question.is_reported);
    try {
      const response = await axios.post(
        `https://${env.NODEJS_URL}/admin/editquestion`,
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
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Response")

      console.log(response);
    } catch (e) {
      console.log("Couldn't Update");
    }
  };
  useEffect(() => {
    fetchReportedDetails();
  }, [reported]);

  const fetchReportedDetails = async () => {
    try {
      const res = await axios.get(`https://${env.NODEJS_URL}/admin/reported`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setReported(res.data);
    } catch (e) {
      console.log("Couldn't load Reported Questions");
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
            Question={record}
            submitNew={undefined}
            submitEdit={submitEdit}
            buttonText="Edit Question"
          />
        </>
      ),
    },
  ];
  return (
    <div style={{ textAlign: "left" }}>
      <h1 style={{ fontSize: "40px" }}>Reported Questions</h1>
      <Card style={{ textAlign: "left", borderRadius: "10px" }}>
        <h1 style={{ fontSize: "30px" }}>View Reported Questions</h1>
        <Table
          columns={columns}
          dataSource={reported}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
};
