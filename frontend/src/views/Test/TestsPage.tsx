import { Row, Col, List, Divider, Collapse } from 'antd';
import React from 'react'
import { TestCard } from '../../components/Test/TestCard';
const { Panel } = Collapse;

interface TestsPageProps {

}

export const TestsPage: React.FC<TestsPageProps> = () => {
  const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];
  return (
    <Row style={{ minHeight: '95vh' }}>
      <Col span={2} />
      <Col span={20}>
        <Collapse defaultActiveKey={['1']} ghost style={{ textAlign: 'left', marginTop: '3%' }}>
          <Panel header={<h1 style={{ fontSize: '25px' }}><b>Available Tests</b></h1>} key="1">
            <Row>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item  >
                    <TestCard />
                  </List.Item>
                )}
              />
            </Row>
          </Panel>
          <Panel header={<h1 style={{ fontSize: '20px' }}><b>Attempted Tests</b></h1>} key="2">
            <Row>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item  >
                    <TestCard />
                  </List.Item>
                )}
              />
            </Row>
          </Panel>
        </Collapse>

      </Col>
      <Col span={2} />
    </Row>
  );
}