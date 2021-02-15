import { Card, Row, Col, Button } from 'antd';
import React from 'react'
import TextArea from 'antd/lib/input/TextArea';
// interface BlogsElementInterface {
//     name: string,
//     author: string,
//     date: string,
// }
export const CreateBlog: React.FC = () => {
    return (
        <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '40px' }}>Publish New Blog</h1>
            <Card style={{ textAlign: 'left', borderRadius: '10px' }}>
                <h1 style={{ fontSize: '30px' }}>Enter Details</h1>
                <Row>
                    <Col span={10}>
                        <h1 style={{ fontSize: '20px' }}>Title</h1>
                        <TextArea autoSize={{ minRows: 1, maxRows: 2 }} />
                    </Col>
                    <Col span={1} />

                    <Col span={10}>
                        <h1 style={{ fontSize: '20px' }}>Author</h1>
                        <TextArea autoSize={{ minRows: 1, maxRows: 2 }} />
                    </Col>
                    <Col span={3} />
                </Row>
                <Row style={{marginTop:"2%"}}>
                    <h1 style={{ fontSize: '20px' }}>Content</h1>
                    <TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
                </Row>
                <Button type='primary' danger style={{float:'right',marginTop:'3%'  }}>Clear</Button>
                <Button type='primary' style={{float:'right',marginRight:"1%",marginTop:'3%'}}>Save</Button>
            </Card>
        </div>
    );
}