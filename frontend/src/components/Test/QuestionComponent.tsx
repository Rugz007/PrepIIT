import { Radio, Row } from 'antd'
import React from 'react'

interface QuestionInterface {

};
interface QuestionComponentProps {
    question: QuestionInterface;
    option: any;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, option }) => {
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    return (
        <div style={{ padding: '1%' }}>
            <Row>
                <h1>
                    14) A direct current is sent through a helical spring. The spring tends
                </h1>
            </Row>
            <Row>
                <Radio.Group style={{textAlign:'left'}}>
                    <Radio style={radioStyle} value={1}>
                        to get shorter
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                        to rotate about the axis
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                        to get longer
                     </Radio>
                    <Radio style={radioStyle} value={3}>
                        to move eastward
                    </Radio>
                </Radio.Group>
            </Row>
        </div>
    );
}