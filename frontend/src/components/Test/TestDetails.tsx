import { List, Row, Button,Col } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import React from 'react'

interface TestDetailsProps {
    current: number,
    questions: any,
    setCurrentFunction: Function,
    answers: any,
    timer: number | undefined,
}

export const TestDetails: React.FC<TestDetailsProps> = ({ current, questions, setCurrentFunction, answers, timer }) => {
    const goToIndex = (index: number) => {
        setCurrentFunction(index + 1);
    };
    var ListButton = (index: number, qID: number) => {
        if (answers[qID] !== undefined) {
            if (current - 1 === index) {
                return <Button shape='circle' type='primary' size='large'>{index + 1}</Button>
            }
            else {
                if (answers[qID][3] !== "Not Visited") {
                    switch (answers[qID][3]) {
                        case 'Marked': return <Button shape='circle' type="primary" style={{ borderColor: 'green', backgroundColor: 'green' }} onClick={() => goToIndex(index)} size='large' >{index + 1}</Button>
                        case 'Visited': return <Button shape='circle' style={{ color: '#ff8000', borderColor: '#ff8000' }} onClick={() => goToIndex(index)} size='large' >{index + 1}</Button>
                        case 'MarkedForReview': return <Button shape='circle' type="primary" style={{ backgroundColor: '#fce621', borderColor: '#fce621', color: 'black' }} onClick={() => goToIndex(index)} size='large' >{index + 1}</Button>
                    }
                }
                else {
                    // return <Button shape='circle' style={{ borderColor: 'green' ,backgroundColor:'green'}} onClick={() => goToIndex(index)} size='large' >{index + 1}</Button>
                    return <Button onClick={() => goToIndex(index)} shape='circle' size='large' >{index + 1}</Button>
                }
            }
        }
    }
    return (
        <>
            <Row>
                <h1>Remaining Questions : 5</h1>
            </Row>
            <Row>
                <Col span={12}> <h2 style={{width:'100%'}}>Time left: </h2></Col>
                <Col span={12}>{timer && <Countdown value={timer} />}</Col>
               
            </Row>
            {answers && <Row>
                <List
                    grid={{
                        gutter: 16,
                        xs: 4,
                        sm: 4,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 4,
                    }}
                    style={{ width: '100%', padding: '1%' }}
                    dataSource={questions}
                    renderItem={(item: any, index) => (
                        <List.Item>
                            {ListButton(index, item['qid'])}
                        </List.Item>
                    )}
                />
            </Row>}
        </>

    );
}