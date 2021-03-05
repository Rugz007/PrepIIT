import { Card, Table, Button, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TestTypeModal } from "./TestTypeModal";

interface TestTypeInterface {
  Test?: {
      testTypeID: number,
      testname: string,
      subjectsallowed: string[],
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
  const [testDetails, setTestDetails] = useState<
    TestTypeInterface[] | undefined
  >([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "testname",
      key: "testname",
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
  useEffect(() => {
    fetchTestDetails();
  }, [])
  const fetchTestDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/testtype", {
        headers: {'Authorization':"Bearer " + localStorage.getItem("token")},
      });
      setTestDetails(response.data);
      console.log(testDetails);
    } catch (e) {
      console.log(e);
    }
  };
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
          dataSource={testDetails}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
};
