import { Button, Card, message, Table } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
const { REACT_APP_NODEJS_URL } = process.env;

interface BlogsElementInterface {
    postid: string,
    title: string,
    image_path: string,
    content: string,
    author: string,
    userid: number,
    date: string,
}
export const BlogsTable: React.FC = () => {
    const [blogs, setBlogs] = useState<Array<BlogsElementInterface> | undefined>(undefined)
    const getBlogs = async () => {
        const response = await axios.get(`http://${REACT_APP_NODEJS_URL}/blogs/allblogs`)
        setBlogs(response.data)
    }
    const onDelete = (id: string) => {
        axios.delete(`http://${REACT_APP_NODEJS_URL}/admin/blog/${id}`).then(() => {
            message.success("Deleted the blog");
            getBlogs();
        }).catch(error => console.log(error))
    }
    useEffect(() => {
        getBlogs()
    }, [])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'Author',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (text: any, record: BlogsElementInterface) =>
                <>
                    <Link to={"/blogs/" + record.postid}><Button type='primary' style={{ marginRight: '2%' }}>View</Button></Link>
                    <Button type='primary' danger onClick={() => onDelete(record.postid)}>Delete</Button>
                </>,
        },
    ];
    return (
        <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '40px' }}>Blogs</h1>
            <Card style={{ textAlign: 'left', borderRadius: '10px' }}>
                <h1 style={{ fontSize: '30px' }}>View all Blogs</h1>
                {blogs && <Table columns={columns} dataSource={blogs} style={{ width: "100%" }} />}
            </Card>
        </div>
    );
}