import { Card, Table, Button } from 'antd';
import React from 'react'
import { EFormModal } from './EFormModal';

interface EFormInterface {
    name: string,
    classBatch: string,
    email?: string,
    phoneNumber?: string,
    city: string,
}

export const EForms: React.FC = () => {

    const data: EFormInterface[] = [
        {
            name: 'John Brown',
            classBatch: 'XII',
            city: 'New York',
        },]
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (text: any, record: EFormInterface) => <><EFormModal EForm={record} /><Button type='primary' danger>Delete</Button></>,
        },
    ];
    return (
        <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '40px' }}>Enquiry Forms</h1>
            <Card style={{ textAlign: 'left', borderRadius: '10px' }}>
            <h1 style={{ fontSize: '30px' }}>View Latest Enquiry Forms</h1>
                <Table columns={columns} dataSource={data} style={{ width: "100%" }} />
            </Card>
        </div>

    );
}