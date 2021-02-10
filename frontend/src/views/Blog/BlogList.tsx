import { Avatar, Col, List, Row } from 'antd';
import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { BlogListItem } from '../../components/Blog/BlogListItem';
import { BlogPage } from './BlogPage';

export const BlogList: React.FC = () => {
    const data = [{
        'id':1,
        'title': 'How to Crack JEE',
        'icon': <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />,
        'content': 'How to Crack JEE in 2 Days!!!!!'
    },
    {
        'id':2,
        'title': 'How to Crack JEE',
        'icon': <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />,
        'content': 'How to Crack JEE in 2 Days!!!!!'
    }];
    return (
        <Row style={{ height: '90vh', marginTop: '3%' }}>
            <Col span={4} />
            <Col span={16}>
                <Row>
                    <h1 style={{ fontSize: "2.3rem", margin: 'auto' }}>Blog List</h1>
                </Row>
                <Row>
                    <List
                        dataSource={data}
                        itemLayout="vertical"
                        size="large"
                        style={{ width: '100%', textAlign: 'left' }}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                        renderItem={item => (
                            <BlogListItem id={item.id} icon={item.icon} title={item.title} description={item.content} />
                        )}>
                    </List>
                    
                </Row>
            </Col>
            <Col span={4} />
        </Row>
    );
}