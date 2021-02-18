import { Card, Table, Button, Space, message } from "antd";
import React, { useState } from 'react'
import { QuestionModal } from "./QuestionModal";

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
export const AddQuestion: React.FC = () => {
    const [questions, setQuestions] = useState<Array<QuestionInterface> | undefined>(undefined)
    const uploadQuestions = () => {
        //TODO: Add Questions Route (use the questions Array)
        //After uploading, reset the questions 
        setQuestions([])
        message.success("Uploaded Questions")
    }
    const addQuestion = (e: QuestionInterface) => {
        if(questions === undefined)
        {
            setQuestions([e])
        }
        else{
            setQuestions([...questions,e]);
        }
        
    }
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
                    <QuestionModal ButtonName="View Question" Question={record}/>
                </>
            ),
        },
    ];

    return (
        <div style={{ textAlign: "left" }}>
            <Card
                style={{ textAlign: "left", borderRadius: "10px" }}
                title={<h1 style={{ fontSize: "30px" }}>Questions to be added</h1>}
                extra={<Space><QuestionModal ButtonName="Add Question" AddQuestionFunction={addQuestion} />{questions === undefined ? <Button disabled onClick={uploadQuestions}>Upload Questions</Button>:<Button  onClick={uploadQuestions}>Upload Questions</Button> }</Space>}>
                <Table
                    columns={columns}
                    dataSource={questions}
                    style={{ width: "100%" }}
                />
            </Card>
        </div>
    );
}