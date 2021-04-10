import { Row, Col, List, Collapse, Tabs,Table, Button } from 'antd';
import axios from 'axios';
import React, { useState, useEffect,useContext } from 'react'
import { TestCard } from '../../components/Test/TestCard';
import UserContext from '../../context/User/UserContext';
const { REACT_APP_NODEJS_URL } = process.env;

const { Panel } = Collapse;

interface TestCardProps {
  testid: number,
  testname: string,
  subjectsallowed: string[],
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
      key: 'name',
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
    if(userContext.user)
    {
      try {
        const res = await axios.get(`https://${REACT_APP_NODEJS_URL}/secure/test`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            userid : userContext.user.userid
          },
        });
        console.log(res.data);
        setTests(res.data);
      } catch (e) {
        console.log("Tests not Loaded");
      }
    }
    
  }
  const [tests, setTests] = useState<TestCardProps[] | undefined | null>(null)
  return (
    <Row style={{ minHeight: '95vh' }}>
      <Col span={2} />
      <Col span={20} style={{ marginTop: '2%' }}>
        <Tabs>
          <Tabs.TabPane tab="Available Tests" key="1">
            {tests && <Row>
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
                dataSource={tests}
                renderItem={item => (
                  <List.Item  >
                    <TestCard test={item} />
                  </List.Item>
                )}
              />
            </Row>}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Attempted Tests" key="2">
            <Table columns={columns}/>
          </Tabs.TabPane>
        </Tabs>
      </Col>
      <Col span={2} />
    </Row>
  );
}