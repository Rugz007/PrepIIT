import { Avatar, Card, Col, Divider, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
const { REACT_APP_NODEJS_URL } = process.env;

interface BlogInterface {
    postid: string,
    title: string,
    image_path: string,
    content: string,
    author: string,
    userid: number,
    date: string,
}
export const BlogPage: React.FC = () => {
    const location = useLocation();
    const [blog, setBlog] = useState<BlogInterface | undefined>(undefined)
    useEffect(() => {
        getBlog(location.pathname.split("/")[2])
    }, [])
    const getBlog = async (path: string) => {
        const response = await axios.get(`https://${REACT_APP_NODEJS_URL}/blogs/blog`,
            {
                headers: {
                    postid: path,
                },
            });
        setBlog(response.data)
    }
    return (
        <div>
            <Row style={{ minHeight: '40vh', marginTop: '3%' }}>
                <Col span={2} />
                <Col span={12} style={{ textAlign: 'left' }}>
                    <h1 style={{ fontSize: "2.3rem", margin: 'auto' }}>{blog?.title}</h1>
                    <img
                        style={{
                            width: "80%",
                            zIndex: 5,
                        }}
                        src={blog?.image_path}
                        alt="insertimage"
                    />
                </Col>
                <Col span={8} style={{ textAlign: 'left' }}>
                    <Card style={{ minHeight: '40vh', marginTop: '11%' }}>
                        <Row>
                            <h1><b>About the Author:</b></h1>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Avatar size={100} style={{ display: 'block', margin: 'auto' }} />
                                <h1 style={{ marginTop: '1%' }}>{blog?.author}</h1>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={2} />
            </Row>
            <Row style={{ marginTop: '1%', textAlign: 'left' ,minHeight:'30vh'}}>
                <Col span={2} />
                <Col span={20}>
                    <Card>
                        {blog?.content}
                    </Card>
                </Col>
                <Col span={2} />
            </Row>
        </div>

    );
}