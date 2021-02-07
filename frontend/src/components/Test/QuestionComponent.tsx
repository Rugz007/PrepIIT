import { Row } from 'antd'
import React from 'react'

interface QuestionInterface
{

};
interface QuestionComponentProps {
    question: QuestionInterface;
    option: any;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({ question,option}) => {
    return (
        <>
            <Row>
                Question Text
            </Row>
            <Row>
                Options
            </Row>
        </>
    );
}