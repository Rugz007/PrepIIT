import {  Card, Table, Button } from 'antd';
import React from 'react'

export const EForms: React.FC = () => {
    const viewModal = (e:any,record :any) =>
    {
        //TODO: View Enquiry Form Details
        console.log(record);
    };
    const data = [
        {
          key: 1,
          name: 'John Brown',
          class: 'New York No. 1 Lake Park',
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
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (text:any,record:any) => <><Button type='primary' style={{marginRight:'2%'}} onClick={e=>viewModal(e, record)}>View</Button><Button type='primary' danger>Delete</Button></>,
          },
    ];
    return (
        <Card style={{ textAlign: 'left', borderRadius: '10px' }}>
            <h1 style={{ fontSize: '40px' }}>Enquiry Forms</h1>
            <Table columns={columns} dataSource={data} style={{ width: "80%" }} />
        </Card>
    );
}