import { List, Row, Button } from 'antd';
import React from 'react'

interface TestDetailsProps {
    current: number,
    questions: any,
    setCurrentFunction: React.Dispatch<React.SetStateAction<number>>,
}

export const TestDetails: React.FC<TestDetailsProps> = ({ current, questions, setCurrentFunction }) => {
    const goToIndex = (index: number) => {
        setCurrentFunction(index + 1);
    };
    var ListButton = (index: number) => {
        if (current - 1 === index) {
            return <Button shape='circle' type='primary' size='large'>{index + 1}</Button>
        }
        else {
            if (questions[index].marked_status !== undefined) {
                switch (questions[index].marked_status) {
                    case 'notMarked': return <Button shape='circle' type="primary" danger onClick={() => goToIndex(index)} size='large' >{index + 1}</Button>
                    case 'Visited': return <Button shape='circle' type="primary" style={{ color: '#ff8000', borderColor: '#ff8000' }} onClick={() => goToIndex(index)} danger size='large' >{index + 1}</Button>
                    case 'MarkedForReview': return <Button shape='circle' type="primary" style={{ backgroundColor: '#fce621', borderColor: '#fce621', color: 'black' }} onClick={() => goToIndex(index)} size='large' >{index + 1}</Button>
                }
            }
            else {
                // return <Button shape='circle' style={{ borderColor: 'green' ,backgroundColor:'green'}} onClick={() => goToIndex(index)} size='large' >{index + 1}</Button>
                return <Button onClick={() => goToIndex(index)} shape='circle' size='large' >{index + 1}</Button>
            }
        }
    }
    return (
        <>
            <Row>
                <h1>Remaining Questions : 5</h1>
            </Row>
            <Row>
                Matrix
            </Row>
            <Row>
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
                    style={{ width: '100%', padding: '1%' }}
                    dataSource={questions}
                    renderItem={(item, index) => (
                        <List.Item>
                            {ListButton(index)}
                        </List.Item>
                    )}
                />
            </Row>

        </>

    );
}