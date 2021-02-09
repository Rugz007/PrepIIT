import { Col, Row } from 'antd';
import React from 'react'

interface BlogListProps {
}

export const BlogList: React.FC<BlogListProps> = ({ }) => {
    return (
        <Row>
            <Col span={4} />
            <Col span={16}>
                <Row>
                    <h1>Blog List</h1>
                </Row>
            </Col>
            <Col span={4} />
        </Row>
    );
}