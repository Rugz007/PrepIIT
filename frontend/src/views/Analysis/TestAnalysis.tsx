import { Col, Row, Statistic, Tabs, Card, Progress, Divider } from 'antd';
import React from 'react'
import { SubjectAnalysis } from '../../components/Analysis/SubjectAnalysis';

interface TestAnalysisProps {

}

export const TestAnalysis: React.FC<TestAnalysisProps> = () => {
  return (
    <Row style={{ minHeight: '96vh', marginTop: '3%', marginBottom: '5rem' }}>
      <Col span={4} />
      <Col span={16} style={{ textAlign: 'left' }}>
        <Row>
          <Col span={24}>
            <h1 style={{ fontSize: '35px', marginBottom: '0' }}>Test Feeback</h1>
          </Col>
          <Col span={24}>
            <Tabs>
              <Tabs.TabPane tab="Overall Analysis" key="1">
                <Row style={{ textAlign: "center" }}>
                  <Card style={{ width: '100%' }}>
                    <Row>
                      <Col span={6}>
                      <img alt='smile' src="https://img.icons8.com/cotton/100/000000/grinning-face-with-smiling-eyes-icon--v2.png"/>
                      </Col>
                      <Col span={6}>
                        <Statistic title="Score" value={83} valueStyle={{ color: '#01922b', fontSize: '3rem' }} suffix="/ 100" />
                      </Col>
                      <Col span={6}>
                        <Statistic title="Percentage" value={83} valueStyle={{ color: '#01922b', fontSize: '3rem' }} suffix="%" />
                      </Col>
                      <Col span={6}>
                        <Statistic title="Time Taken" value={"2hrs 45 mins"} valueStyle={{ fontSize: '2.8rem' }} />
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <h3>Remark: You have scored 83 which is above the average of 42 and the cut off of 59</h3>
                    </Row>
                  </Card>
                </Row>
                <Divider />
                <Row>
                  <Col span={24}>
                    <h1 style={{ fontSize: '35px', marginBottom: '0' }}>Question Analysis</h1>
                  </Col>
                  <Col span={24}>
                    <Card>
                      <Row style={{ textAlign: 'center' }}>
                        <Col span={8}>
                          <Progress type='dashboard' percent={30} strokeColor="#01922b" />
                          <h1>Correct</h1>
                          <Divider />
                          <h2>Each correct answer gives you a +4.</h2>
                          <div style={{ margin: '0 8% 5% 8%' }}>
                            <h4>Correct Answer % for Physics </h4>
                            <Progress percent={42} strokeColor="#01922b" />
                          </div>
                          <div style={{ margin: '0 8% 5% 8%' }}>
                            <h4>Correct Answer % for Chemistry </h4>
                            <Progress percent={70} strokeColor="#01922b" />
                          </div>
                          <div style={{ margin: '0 8% 5% 8%' }}>
                            <h4>Correct Answer % for Maths </h4>
                            <Progress percent={23} strokeColor="#01922b" />
                          </div>
                        </Col>
                        <Col span={8}>
                          <Progress type='dashboard' percent={48} strokeColor="#ed5f5f" />
                          <h1>Wrong</h1>
                          <Divider />
                          <h2>Each wrong answer gives you a -1.</h2>
                          <div style={{ margin: '0 8% 5% 8%' }}>
                            <h4>Wrong Answer % for Physics </h4>
                            <Progress percent={32} strokeColor="#ed5f5f" />
                          </div>
                          <div style={{ margin: '0 8% 5% 8%' }}>
                            <h4>Wrong Answer % for Chemistry </h4>
                            <Progress percent={43} strokeColor="#ed5f5f" />
                          </div>
                          <div style={{ margin: '0 8% 5% 8%' }}>
                            <h4>Wrong Answer % for Maths </h4>
                            <Progress percent={64} strokeColor="#ed5f5f" />
                          </div>
                        </Col>
                        <Col span={8}>
                          <Progress type='dashboard' percent={12} strokeColor="#ddcb34" />
                          <h1>Not Attempted</h1>
                          <Divider />
                          <h2>Each unattempted answer gives you a 0.</h2>
                          <div style={{ margin: '0 8% 5% 8%' }}>
                            <h4>Not Attempted % for Physics </h4>
                            <Progress percent={12} strokeColor="#ddcb34" />
                          </div>
                          <div style={{ margin: '0 8% 5% 8%' }}>
                            <h4>Not Attempted % for Chemistry </h4>
                            <Progress percent={32} strokeColor="#ddcb34" />
                          </div>
                          <div style={{ margin: '0 8% 5% 8%' }}>
                            <h4>Not Attempted % for Maths </h4>
                            <Progress percent={8} strokeColor="#ddcb34" />
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Subject Wise  Analysis" key="2">
                <SubjectAnalysis title={<Row style={{ width: '50%' }}><img alt='physics' src="https://img.icons8.com/dusk/50/000000/physics.png" /><h2 style={{ marginBottom: '0', marginTop: '2%' }}> &nbsp; Physics</h2></Row>} />
                <SubjectAnalysis title={<Row style={{ width: '50%' }}><img alt='chemistry' src="https://img.icons8.com/dusk/64/000000/benzene-ring.png" /><h2 style={{ marginBottom: '0', marginTop: '2%' }}> &nbsp; Chemistry</h2></Row>} />
                <SubjectAnalysis title={<Row style={{ width: '50%' }}><img alt='maths' src="https://img.icons8.com/dusk/64/000000/plus.png" /><h2 style={{ marginBottom: '0', marginTop: '2%' }}> &nbsp; Maths</h2></Row>} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Question Wise  Analysis" key="3">
                <Card>
                </Card>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Col>
      <Col span={4} />
    </Row>
  );
}