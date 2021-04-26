import { Radio, Row, Col, RadioChangeEvent, Input } from "antd";
import React from "react";

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
    var Latex = require("react-latex");
    const radioStyle = {
        borderRadius: "0px",
        width: "100%",
        fontSize: "20px",
        verticalAlign: "text-bottom",
    };
    const radioContainerStyle = {
        marginTop: "15px",
        fontSize: "20px",
    };
    var temp = `Solve the following equation:  $$\\big (3\\times 4) \\div (5-3)$$`;
    return (
        <div style={{ padding: "1%" }}>
            <Row style={{ fontSize: "30px" }}>
                {question && (
                    <h3>
                        {question.statement}
                        {question.qid}

                    </h3>
                )}
                {/* <Latex displayMode={true}>
                    {temp}
                </Latex> */}
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