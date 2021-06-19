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
  availableStaticTest: Array<Test>,
  availableLiveTest: Array<Test>,
}
interface GivenTestCardProps {
  statictest: Array<Test>,
  giventest: Array<Test>,

}
export const TestsPage: React.FC = () => {
  const userContext = useContext(UserContext)
  useEffect(() => {
    getAvailableTests();
    getGivenTests();
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
  const getAvailableTests = async () => {
    if (userContext.user) {
      try {
        const res = await axios.get(`http://${REACT_APP_NODEJS_URL}/secure/test`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            userid: userContext.user.userid
          },
        });
        console.log(res.data);
        setAvailableTests(res.data);
      } catch (e) {
        console.log("Tests not Loaded");
      }
    }
  }
  const getGivenTests = async () => {
    if (userContext.user) {
      try {
        const res = await axios.get(`http://${REACT_APP_NODEJS_URL}/secure/giventests`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            userid: userContext.user.userid
          },
        });
        console.log(res.data);
        setGivenTests(res.data);
      } catch (e) {
        console.log("Tests not Loaded");
      }
    }
  }
  const [availableTests, setAvailableTests] = useState<TestCardProps | undefined | null>(null)
  const [givenTests, setGivenTests] = useState<GivenTestCardProps | undefined | null>(null)
  return (
    <Row >
      <Col span={24}><h1 style={{ fontSize: "40px", textAlign: "left", width: '100%' }}>Tests</h1></Col>
      <Col span={24}>
        <Tabs style={{ textAlign: 'center' }}>
          <Tabs.TabPane tab="Available Tests" key="1">
            {availableTests?.availableStaticTest ? <Row>
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
                dataSource={availableTests.availableStaticTest}
                renderItem={item => (
                  <List.Item>
                    <TestCard test={item} />
                  </List.Item>
                )}
              />
            </Row> : <h3>No Tests Available.</h3>}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Given Tests" key="2">
            {givenTests?.statictest ? <Row>
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
                dataSource={givenTests.statictest}
                renderItem={item => (
                  <List.Item>
                    <TestCard test={item} />
                  </List.Item>
                )}
              />
            </Row> : <h3>No Tests Available.</h3>}
          </Tabs.TabPane>
        </Tabs>
      </Col>
      <Col span={1} />
      <Col span={22}>

      </Col>
      <Col span={1} />
    </Row>
  );
}