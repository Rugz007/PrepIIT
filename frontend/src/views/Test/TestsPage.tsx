import { Row, Col ,List, Divider} from 'antd';
import React from 'react'
import { TestCard } from '../../components/Test/TestCard';

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
                <Row>
                    <h1 style={{ margin: '4% 4% 0 4%' ,fontSize:'35px'}}><b>Available Tests</b></h1>
                </Row>
                <Divider/> 
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
            </Col>
            <Col span={2} />
        </Row>
    );
}