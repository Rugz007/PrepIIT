import { Row, Col, List, Tabs, Table, Button } from 'antd';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { TestCard } from '../../Test/TestCard';
import UserContext from '../../../context/User/UserContext';
const { REACT_APP_NODEJS_URL } = process.env;

interface Test {
  testid: number,
  testname: string,
  subjectsallowed: string[],
}
interface TestCardProps {
  availableTest: Array<Array<Test>>,
  givenTest: any
  // givenTest: [[
  //   {
  //     testid: number,
  //     testname: string,
  //     subjectsallowed: string[],
  //   }
  // ]]`

}
export const TestsPage: React.FC = () => {
  const userContext = useContext(UserContext)
  useEffect(() => {
    getTests();
  }, [userContext.user])
  const columns = [
    {
      title: 'Test Name',
      dataIndex: 'name',
      key: 'donetestid',
    },
    {
      title: 'Test Subjects',
      dataIndex: 'subjects',
      key: 'subjects',
    },
    {
      title: 'Marks',
      dataIndex: 'marks',
      key: 'marks',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (<Button type="primary">View</Button>),

    },
  ];
  const getTests = async () => {
    if (userContext.user) {
      try {
        const res = await axios.get(`http://${REACT_APP_NODEJS_URL}/secure/test`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            userid: userContext.user.userid
          },
        });
        console.log(res.data);
        //TODO: Change is back to availableTest
        setTests(res.data);
      } catch (e) {
        console.log("Tests not Loaded");
      }
    }
  }
  const [tests, setTests] = useState<TestCardProps | undefined | null>(null)
  return (
    <Row >
      <Col span={24}><h1 style={{ fontSize: "40px", textAlign: "left" ,width:'100%'}}>Tests</h1></Col>
      <Col span={24}>
      {tests?.availableTest && <Tabs style={{ textAlign: 'center' }}>
          <Tabs.TabPane tab="Available Tests" key="1">
            <Row>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={tests.availableTest[0]}
                renderItem={item => (
                  <List.Item  >
                    <TestCard test={item} />
                  </List.Item>
                )}
              />
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Attempted Tests" key="2">
            <Table columns={columns} dataSource={tests?.givenTest[0].rows} />
          </Tabs.TabPane>
        </Tabs>}
      </Col>
      <Col span={1} />
      <Col span={22}>

      </Col>
      <Col span={1} />
    </Row>
  );
}