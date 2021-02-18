import { List, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react'

interface TestDetailsProps {
    current:number,
}

export const TestDetails: React.FC<TestDetailsProps> = ({current}) => {
    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 5',
        },
        {
            title: 'Title 6',
        },
    ];

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
                    style={{width:'100%',padding:'1%'}}
                    dataSource={data}
                    renderItem={(item,index) => (
                        <List.Item>
                            {current === index + 1 ? <Avatar size='large' style={{backgroundColor:'green'}}>{index + 1}</Avatar>: <Avatar size='large' style={{backgroundColor:'red'}}>{index + 1}</Avatar>}
                            
                        </List.Item>
                    )}
                />
            </Row>

        </>

    );
}