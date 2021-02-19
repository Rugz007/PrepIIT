import { Button, Card, Col, Popconfirm, Row } from 'antd';
import React, { useState } from 'react'
import { QuestionComponent } from '../../components/Test/QuestionComponent';
import { TestDetails } from '../../components/Test/TestDetails';
import { QuestionCircleOutlined } from '@ant-design/icons';
interface QuestionInterface {
    questionID: number;
    statement: string | null;
    latex: any;
    img_path?: string | null;
    type: string;
    archive?: string | null;
};
interface AnswersInterface {
    questionID: number;
    answer: string | number | null;
};

export const Test: React.FC = () => {
    const [current, setCurrent] = useState<number>(1);
    const [questions, setQuestions] = useState<QuestionInterface[]>([]);
    const [answers, setAnswers] = useState<AnswersInterface[]>([]);
    const [options, setOptions] = useState([]);
    const getQuestions = () => {
        //TODO: Get Questions
    };
    const getOptions = () => {
        //TODO: Get Options
    };
    const onSelectAnswer = () => {
        //TODO: Update Answers
    };
    const onNext = () => {
        
        setCurrent(current+1)
    };
    const onPrevious = () => {
        if(current !== 1)
        {
            setCurrent(current-1)

        }
    };
    const onSubmit = () => {
        ///TODO: onSubmitTest
    };
    return (
        <div>
            <Row style={{ height: '2vh' }}>
                TestBar
            </Row>
            <Row style={{ padding: '2%' }}>
                <Col span={18}>
                    <Row>
                        <Col span={2}><Button onClick={onPrevious} type='primary' danger style={{ float: 'left' }}>Previous</Button></Col>
                        <Col span={20}><Card style={{ width: '100%' }}> Time Remaining</Card></Col>
                        <Col span={2}> <Button onClick={onNext} type='primary' style={{ float: 'right' }}>Next</Button></Col>
                    </Row>
                    <Row>
                        <Card style={{ width: '100%', height: '74vh' }}>
                            <QuestionComponent question={questions[current]} option={options[current]} />
                        </Card>
                    </Row>
                </Col>
                <Col span={6}>
                    <Card style={{ margin: '0 6%' }}>
                        <TestDetails current={current} />
                        <Popconfirm
                            title="Are you sure you want to submit your test?"
                            onConfirm={onSubmit}
                            okText="Yes"
                            cancelText="No"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        >
                            <Button style={{ width: '100%' }} type='primary'> Submit Test</Button>
                        </Popconfirm>
                    </Card>
                </Col>
            </Row>
        </div>

    );
}