import { Card, Table, Button } from "antd";
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

export const ReportedQuestions: React.FC = () => {
  const [reported, setReported] = useState<QuestionInterface[] | undefined>([]);
  useEffect(() => {
    fetchReportedDetails();
  }, []);

  const fetchReportedDetails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/reported", {
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
          <Button type="primary">Resolve</Button>
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
