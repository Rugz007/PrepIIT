import { Radio, Row, Col } from 'antd'
import React from 'react'

interface QuestionInterface {
    question: {
        qid: number,
        statement: string,
        img_path: string,
        type: string,
        archive: string,
        latex: string,
        options: string[],
    } | undefined

}

export const QuestionComponent: React.FC<QuestionInterface> = ({ question }) => {
    var Latex = require('react-latex');
    const radioStyle = {
        borderRadius: '0px',
        width: '100%',
        fontSize: '20px',
        verticalAlign: 'text-bottom'
    };
    const radioContainerStyle = {
        marginTop: "15px", fontSize: '20px'
    }
    var temp = `Solve the following equation:  $$\\big (3\\times 4) \\div (5-3)$$`;
    return (
        <div style={{ padding: '1%' }}>
            <Row style={{ fontSize: '30px' }}>
                {question &&
                    <h3>
                        {question.statement}
                    </h3>
                }
                {/* <Latex displayMode={true}>
                    {temp}
                </Latex> */}

            </Row>
            <Row>
                <Radio.Group style={{ textAlign: 'left', width: '100%' }}>
                    <Row style={radioContainerStyle}>
                        <Col span={1}>
                            <Radio.Button style={{ padding: "0 0.7rem", fontSize: '20px' }} name="A" value="A">A</Radio.Button>
                        </Col>
                        <Col span={23} style={radioStyle}>
                            to rotate my fan
                        </Col>
                    </Row>
                    <Row style={radioContainerStyle}>
                        <Col span={1}>
                            <Radio.Button style={{ padding: "0 0.7rem", fontSize: '20px' }} name="B" value="B">B</Radio.Button>
                        </Col>
                        <Col span={23} style={radioStyle}>
                            to rotate my fan
                        </Col>
                    </Row>
                    <Row style={radioContainerStyle}>
                        <Col span={1}>
                            <Radio.Button style={{ padding: "0 0.7rem", fontSize: '20px' }} name="C" value="C">C</Radio.Button>
                        </Col>
                        <Col span={23} style={radioStyle}>
                            to rotate my fan
                        </Col>
                    </Row>
                    <Row style={radioContainerStyle}>
                        <Col span={1}>
                            <Radio.Button style={{ padding: "0 0.7rem", fontSize: '20px' }} name="D" value="D">D</Radio.Button>
                        </Col>
                        <Col span={23} style={radioStyle}>
                            to rotate my fan
                        </Col>
                    </Row>
                </Radio.Group>
            </Row>
        </div>
    );
}