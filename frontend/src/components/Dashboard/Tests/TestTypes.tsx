import { Card, Button, Space, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TestTypeModal } from "./TestTypeModal";
import AdvTable from '../../Util/AdvTable'
const { REACT_APP_NODEJS_URL } = process.env;
interface TestTypeInterface {
  Test?: {
    testTypeID: number,
    testname: string,
    subjectsallowed: string[],
    types: Array<{
      type: string,
      correct: number,
      wrong: number,
      nullanswer: number,
      number: number,
    }>,
  }
}

export const TestTypes: React.FC = () => {
  const [testDetails, setTestDetails] = useState<
    TestTypeInterface[] | undefined
  >([]);
  const onDelete = async (record: any) => {
    axios.delete(`http://${REACT_APP_NODEJS_URL}/admin/statictest`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        testid:record.testid
      },
    })
    fetchTestDetails()
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "testname",
      key: "testname",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (text: any, record: any) => (
        <>
          <TestTypeModal Test={record} buttonText="View Test Type" />
          <Popconfirm
            title="Are you sure you want to delete this test?"
            onConfirm={() =>
              onDelete(record)
            }
          >
            <Button
              type="primary"
              danger
              style={{ marginLeft: '1%' }}

            >
              Delete
            </Button>
          </Popconfirm>

        </>
      ),
    },
  ];
  useEffect(() => {
    fetchTestDetails();
  }, [])
  const fetchTestDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/statictest", {
        headers: { 'Authorization': "Bearer " + localStorage.getItem("token") },
      });
      setTestDetails(response.data);
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
            <TestTypeModal getFunction={fetchTestDetails} buttonText="Add Test Type" />
          </Space>
        }
      >
        <AdvTable
          columns={columns}
          dataSource={testDetails}
          style={{ width: "100%" }}
        />
      </Card>
    </div>
  );
};
