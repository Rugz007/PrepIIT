import { Button, Card, Col, Row } from 'antd';
import React, { useState } from 'react'
import { QuestionComponent } from '../../components/Test/QuestionComponent';

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
        //TODO: onNext
    };
    const onPrevious = () => {
        //TODO: onPrevious
    };
    const onSubmit = () => {
        ///TODO: onSubmitTest
    };
    return (
        <>
            <Row style={{ height: '40px' }}>
                TestBar
            </Row>
            <Row>
                <Col span={18}>
                    <Row>
                        <Card> Time Remaining</Card>
                        <Button type='primary' danger>Previous</Button>
                        <Button type='primary'>Next</Button>
                    </Row>
                    <Row>
                        <Card style={{ width: '100%' }}>
                            <QuestionComponent question={questions[current]} option={options[current]} />
                        </Card>
                    </Row>
                </Col>
                <Col span={6}>
                    <Card>
                        <Row>
                            Remaining Questions
                        </Row>
                        <Row>
                            Matrix of Questions
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>

    );
}