import { Row, Input } from "antd";
import React from "react";
import { MathComponent } from 'mathjax-react';

interface QuestionInterface {
    question:
    | {
        qid: number;
        statement: string;
        img_path: string;
        type: string;
        archive: string;
        latex: string;
        options: string[];
    }
    | undefined;
    onSelect: React.ChangeEventHandler<HTMLInputElement> | undefined;
    answers: any,
}

export const InputComponent: React.FC<QuestionInterface> = ({
    question,
    onSelect,
    answers
}) => {
    return (
        <div style={{ padding: "1%" }}>
            <Row style={{ fontSize: "30px" }}>
                {question && (
                    <h3>
                        {question.statement}
                        {question.qid}

                    </h3>
                )}
                <MathComponent tex={question?.latex} />
            </Row>
            <Row>
                {question && answers && answers[question.qid] !== undefined &&
                    <Input
                        value={answers[question?.qid][1][0]}
                        placeholder="Type your answer here"
                        onChange={onSelect}
                        size='large'
                    />}

            </Row>
        </div>
    );
};
