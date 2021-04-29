import { Avatar, Col, List, Row } from 'antd';
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Route, Switch } from 'react-router-dom';
import { BlogListItem } from '../../components/Blog/BlogListItem';
import { BlogPage } from './BlogPage';
const { REACT_APP_NODEJS_URL } = process.env;


interface BlogsInterface 
{
    postid:string,
    title:string,
    image_path:string,
    content:string,
    author:string,
    userid:number,
    date:string,
}

export const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Array<BlogsInterface> | undefined>(undefined)
    const getBlogs  = async () =>
    {
        const response = await axios.get(`https://${REACT_APP_NODEJS_URL}/blogs/allblogs`)
        setBlogs(response.data)
    }
    useEffect(() => {
        getBlogs()
    }, [])
    return (
        <Row style={{ height: '90vh', marginTop: '3%' }}>
            <Col span={3} />
            <Col span={18}>
                <Row>
                    <h1 style={{ fontSize: "2.3rem", margin: 'auto' }}>Blog List</h1>
                </Row>
                <Row>
                    <List
                        dataSource={blogs}
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
                            <BlogListItem id={item.postid} title={item.title} description={item.content} />
                        )}>
                    </List>
                    
                </Row>
            </Col>
            <Col span={3} />
        </Row>
    );
}