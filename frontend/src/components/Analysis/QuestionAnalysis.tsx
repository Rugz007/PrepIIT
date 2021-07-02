import { Button, Col, List, Row, Tabs } from 'antd'
import React, { useState } from 'react'
import { QuestionComponent } from './QuestionComponent';

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
interface QuestionAnalysisProps {
    questions?: Array<QuestionsInterface>,
    subjectsallowed?: Array<string>
}

export const QuestionAnalysis: React.FC<QuestionAnalysisProps> = ({ questions, subjectsallowed }) => {
    const [current, setCurrent] = useState(0)
    return (
        <>
            <Tabs onChange={() => setCurrent(0)}>
                {subjectsallowed?.map((subject) =>
                (
                    <Tabs.TabPane tab={subject[0].toUpperCase().concat(subject.substring(1))} key={subject}>
                        <Row>
                            <Col span={18}>
                                <QuestionComponent question={questions?.filter((question) => { return question.subject === subject })[current]} />
                            </Col>
                            <Col span={6}>
                                <h2>Navigate through questions: </h2>
                                <List
                                    grid={{
                                        gutter: 16,
                                        xs: 1,
                                        sm: 2,
                                        md: 4,
                                        lg: 4,
                                        xl: 6,
                                        xxl: 4,
                                    }}
                                    dataSource={questions?.filter((question) => { return question.subject === subject })}
                                    renderItem={(item: any, index) => (
                                        <List.Item>
                                            {index === current ? <Button onClick={() => setCurrent(index)} shape='circle' type='primary'>{index + 1}</Button> : <Button onClick={() => setCurrent(index)} shape='circle'>{index + 1}</Button>}
                                            
                                        </List.Item>
                                    )}
                                /></Col>
                        </Row>
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </>
    );
}