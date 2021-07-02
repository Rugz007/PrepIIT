import { Col, Row } from 'antd';
import React from 'react'

interface QuestionComponentProps {
    question?: QuestionsInterface

}
interface QuestionsInterface {
    answers: Array<string>;
    donetestid: string;
    img_path?: string;
    is_reported: boolean;
    latex?: string;
    level: string;
    options: Array<string>;
    qid: number;
    statement: string;
    subject: string;
    subtopic: string;
    topic: string;
    timetaken: string;
    type: string;
    useranswer: Array<string>;
    visited: string;
}
const Components = (question: QuestionsInterface) => {
    if (question.type === 'mcq' || question.type === 'mac' || question.type === 'anr') {
        return (
            <Row>
                <h1>{question.statement}</h1>
                <Col span={24}>
                    {question.options.map((option, index) => (
                        <Row>
                            <h3>{index + 1}. {option}</h3>
                        </Row>
                    ))}
                </Col>
                <Col span={24}>
                    <h3>Your answer: {question.useranswer}</h3>
                </Col>
                <Col span={24}>
                    <h3>Correct answer: {question.answers}</h3>
                </Col>
            </Row>
        )
    }
    else if (question.type === 'fib' || question.type === 'tof') {
        return (
            <Row>
                <h1>{question.statement}</h1>
                <Col span={24}>
                    <h3>Your answer: {question.useranswer}</h3>
                </Col>
                <Col span={24}>
                    <h3>Correct answer: {question.answers}</h3>
                </Col>
            </Row>
        )
    }
    else if (question.type === 'num') {
        return (
            <Row>
                <h1>{question.statement}</h1>
                <Col span={24}>
                    <h3>Your answer: {question.useranswer}</h3>
                </Col>
                <Col span={24}>
                    <h3>Correct answer: {question.options[0]}</h3>
                </Col>
            </Row>
        )
    }
}



export const QuestionComponent: React.FC<QuestionComponentProps> = ({ question }) => {

    return (
        <Row>
            {question && Components(question)}
        </Row>
    );
}