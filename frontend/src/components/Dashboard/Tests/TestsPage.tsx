import { Row, Col, List, Tabs, Button } from 'antd';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { TestCard } from '../../Test/TestCard';
import UserContext from '../../../context/User/UserContext';
import AdvTable from '../../Util/AdvTable';
import { Link } from 'react-router-dom';
const { REACT_APP_NODEJS_URL } = process.env;
interface Test {
  testid: number,
  testname: string,
  subjectsallowed: string[],
}
interface GivenTest {
  testid: number,
  testname: string,
  donetestid: string,
  dateofsubmission: string,
  phymarks: number,
  phymax: number,
  chemmarks: number,
  chemmax: number,
  mathmarks: number,
  mathmax: number,
  biomarks: number,
  biomax: number,
}
interface TestCardProps {
  availableStaticTest: Array<Test>,
  availableLiveTest: Array<Test>,
}
interface GivenTestCardProps {
  statictest: Array<GivenTest>,
  livetest: Array<GivenTest>,

}
export const TestsPage: React.FC = () => {
  const userContext = useContext(UserContext)
  const [testType, setTestType] = useState('statictest')
  useEffect(() => {
    getAvailableTests();
    getGivenTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user])
  const columns = [
    {
      title: 'Test Name',
      dataIndex: 'testname',
      key: 'donetestid',
    },
    {
      title: 'Attempted On',
      dataIndex: 'dateofsubmission',
      key: 'dateofsubmission',
    },
    {
      title: 'Test Subjects',
      dataIndex: 'subjectsallowed',
      key: 'subjects',
      render: (item: any) =>
      (
        item.map((sub_item: any) =>
        (<>
          {sub_item[0].toUpperCase().concat(sub_item.substring(1))} <span> </span>
        </>
        ))
      )
    },
    {
      title: 'Marks',
      dataIndex: 'marks',
      key: 'marks',
      render: (item: any, record: any) =>
      (
        <>
          {record.totalmarks} / {record.totalmaxmarks}
        </>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (item: any, record: any) => (<Link to={{
        pathname: `/testanalysis/${testType}/${record.donetestid}`,
        state: {
          test:record,
        },
      }} ><Button type="primary">View</Button></Link>),

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
        console.log(res.data)
        setGivenTests(res.data);
      } catch (e) {
        console.log("Tests not Loaded");
      }
    }
  }
  const [availableTests, setAvailableTests] = useState<TestCardProps | undefined>(undefined)
  const [givenTests, setGivenTests] = useState<GivenTestCardProps | undefined>(undefined)
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
            <Tabs onChange={(e: any) => setTestType(e)} activeKey={testType}>
              <Tabs.TabPane tab='Static Tests' key='statictest'>
                {givenTests?.statictest ? <Row>
                  <AdvTable style={{ width: '100%' }} columns={columns} dataSource={givenTests.statictest} />
                </Row> : <h3>No Tests Available.</h3>}
              </Tabs.TabPane>
              <Tabs.TabPane tab='Live Tests' key='livetest'>
                {givenTests?.statictest ? <Row>
                  <AdvTable style={{ width: '100%' }} columns={columns} dataSource={givenTests.livetest} />
                </Row> : <h3>No Tests Available.</h3>}
              </Tabs.TabPane>
            </Tabs>

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