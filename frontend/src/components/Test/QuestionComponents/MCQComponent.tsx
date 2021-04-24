import { Radio, Row, Col, RadioChangeEvent } from "antd";
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
  onSelect: (e: RadioChangeEvent) => void;
  answers:any,
}

export const MCQComponent: React.FC<QuestionInterface> = ({
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
        {question && answers && answers[question.qid] !== undefined && <Radio.Group
          style={{ textAlign: "left", width: "100%" }}
          onChange={(e) => onSelect(e)}
          value={answers[question?.qid][1][0]}
        >
          
          {question?.options.map((option, index) => (
            <Row style={radioContainerStyle}>
              <Col span={1}>
                <Radio.Button
                  style={{ padding: "0 0.7rem", fontSize: "20px" }}
                  name={option}
                  value={option}
                >
                  {(index + 10).toString(36).toUpperCase()}
                </Radio.Button>
              </Col>
              <Col span={23} style={radioStyle}>
                {option}
              </Col>
            </Row>
          ))}
        </Radio.Group>}
        
      </Row>
    </div>
  );
};
