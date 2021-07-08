import { Card, Button, Popconfirm, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdvTable from "../../Util/AdvTable";
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
  latex?:string;
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
          options:Question.options,
          latex:Question.latex,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      message.success('Question Edited Successfully!')
      fetchBankDetails()
    } catch (e) {
      console.log("Couldn't Update");
      message.error('Error while uploading question!')
    }
  };
  const fetchBankDetails = async () => {
    try {
      const res = await axios.get(`http://${REACT_APP_NODEJS_URL}/admin/question`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setQuestions(res.data);
    } catch (e) {
      message.error("Error loading questions!");
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
      sortOrder:'ascend',
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      filters: [
        {
          text: 'Chemistry',
          value: 'chemistry',
        },
        {
          text: 'Physics',
          value: 'physics',
        },
        {
          text: 'Biology',
          value: 'biology',
        },
        {
          text: 'Mathematics',
          value: 'maths',
        },
      ],
      onFilter: (value:any, record:any) => record.subject.indexOf(value) === 0,
      render: (text:string) => 
      {
        switch(text)
        {
          case 'chemistry':
            return 'Chemistry';
          case 'physics':
            return 'Physics';
          case 'biology':
            return 'Biology';
          case 'maths':
            return 'Mathematics';
          default:
            return text;
        }
      }
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
      filters: [
        {
          text: 'Multiple Choice Question',
          value: 'mcq',
        },
        {
          text: 'Assertion and Reason',
          value: 'anr',
        },
        {
          text: 'True or False',
          value: 'tof',
        },
        {
          text: 'Fill in the Blanks',
          value: 'fib',
        },
        {
          text: 'Numerical Type Question',
          value: 'num',
        },
        {
          text: 'Multiple Answer Correct',
          value: 'mac',
        },
      ],
      onFilter: (value:any, record:any) => record.type.indexOf(value) === 0,
      render:(text:string) =>
      {
        switch(text)
        {
          case 'mcq':
            return 'Multiple Choice Question';
          case 'anr':
            return 'Assertion and Reason';
          case 'tof':
            return 'True or False';
          case 'fib':
            return 'Fill in the Blanks';
          case 'num':
            return 'Numerical Type Question';
          case 'mac':
            return 'Multiple Answer Correct';
          default:
            return text;
        }
      }
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
        <AdvTable
          columns={columns}
          dataSource={questions}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
};
