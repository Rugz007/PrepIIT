import { Card, Table, Button, Space, message } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { TestTypeModal } from "./TestTypeModal";

interface TestTypeInterface {
  Test?: {
      testTypeID: number,
      name: string,
      subjects: string[],
      types: Array<{
          type:string,
          correct:number,
          wrong:number,
          nullanswer:number,
          number:number,
      }>,
  }
}

export const TestTypes: React.FC = () => {
  const [testTypes, setTestTypes] = useState([])
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class",
      dataIndex: "standard",
      key: "standard",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (text: any, record :any) => (
        <>
          <TestTypeModal Test={record} />
          <Button
            type="primary"
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
    return (
        <div style={{ textAlign: "left" }}>
                  <h1 style={{ fontSize: "40px" }}>Static Tests</h1>

      <Card
        style={{ textAlign: "left", borderRadius: "10px" }}
        title={<h1 style={{ fontSize: "30px" }}>Test Types</h1>}
        extra={
          <Space>
            <TestTypeModal />
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={testTypes}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
    );
}