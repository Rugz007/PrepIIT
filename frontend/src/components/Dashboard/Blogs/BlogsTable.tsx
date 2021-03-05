import { Button ,Card,Table} from 'antd';
import React from 'react'

interface BlogsElementInterface {
    name: string,
    author: string,
    date: string,
}

export const BlogsTable: React.FC = () => {
    const data: BlogsElementInterface[] = [
        {
            name: 'Crack JEE',
            author: 'Rajesh',
            date: '10th Feb 2021',
        },]
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Action [Work in Progress]',
            dataIndex: '',
            key: 'action',
            render: (text: any, record: BlogsElementInterface) => <><Button type='primary'style={{marginRight:'2%'}}>View</Button><Button type='primary' danger>Delete</Button></>,
        },
    ];
    return (
        <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '40px' }}>Blogs</h1>
            <Card style={{ textAlign: 'left', borderRadius: '10px' }}>
            <h1 style={{ fontSize: '30px' }}>View Latest Enquiry Forms</h1>
                <Table columns={columns} dataSource={data} style={{ width: "100%" }} />
            </Card>
        </div>

    );
}