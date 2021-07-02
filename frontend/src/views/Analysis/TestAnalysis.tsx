import { Col, Row, Statistic, Tabs, Card, Progress, Divider } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SubjectAnalysis } from '../../components/Analysis/SubjectAnalysis';
import { useLocation } from 'react-router-dom';
import { QuestionAnalysis } from '../../components/Analysis/QuestionAnalysis';
const { REACT_APP_NODEJS_URL } = process.env;

interface QuestionsInterface {
  answers: Array<string>;
  donetestid: string;
  img_path?: string;
  is_reported: boolean;
  latex?: string;
  level: string;
  options: Array<string>;
  qid: number;
  statement: string;
  subject: string;
  subtopic: string;
  topic: string;
  timetaken: string;
  type: string;
  useranswer: Array<string>;
  visited: string;
}
interface TestAnalysisResponse {
  donetestid: string,
  questions: Array<QuestionsInterface>;
}

export const TestAnalysis: React.FC = () => {
  const location = useLocation();
  const { test }: any = location.state
  const [state, setState] = useState<TestAnalysisResponse | undefined>()
  useEffect(() => {
    console.log(test)
    let donetestid = location.pathname.split("/")[3]
    let isStatic = (location.pathname.split("/")[2] === 'statictest')
    axios.post(`http://${REACT_APP_NODEJS_URL}/secure/specifictestdetails`, {
      donetestid: donetestid,
      statictest: isStatic,
    }, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response.data)
      setState(response.data)
    }).catch((error) => console.log(error))

  }, [])
  const getTotalPercentage = (value: string) => {
    if (test.physics && test.chemistry && test.maths) {
      if (value === 'correct') {
        return Math.round((test.physics.correct + test.math.correct + test.chemistry.correct) * 1000 / (test.physics.correct + test.math.correct + test.chemistry.correct + test.physics.na + test.math.na + test.chemistry.na + test.chemistry.wrong + test.physics.wrong + test.math.wrong)) / 10
      }
      else if (value === 'wrong') {
        return Math.round((test.physics.wrong + test.math.wrong + test.chemistry.wrong) * 1000 / (test.physics.correct + test.math.correct + test.chemistry.correct + test.physics.na + test.math.na + test.chemistry.na + test.chemistry.wrong + test.physics.wrong + test.math.wrong)) / 10
      }
      else if (value === 'na') {
        return Math.round((test.physics.na + test.math.na + test.chemistry.na) * 1000 / (test.physics.correct + test.math.correct + test.chemistry.correct + test.physics.na + test.math.na + test.chemistry.na + test.chemistry.wrong + test.physics.wrong + test.math.wrong)) / 10
      }
    }
  }
  const getPercentage = (subject: string, value: string) => {
    if (subject === 'physics') {

    }
  }
  return (
    <Row style={{ minHeight: '96vh', marginTop: '3%', marginBottom: '5rem' }}>
      <Col span={2} />
      <Col span={20} style={{ textAlign: 'left' }}>
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
                        <img alt='smile' src="https://img.icons8.com/cotton/100/000000/grinning-face-with-smiling-eyes-icon--v2.png" />
                      </Col>
                      <Col span={6}>
                        <Statistic title="Score" value={test.totalmarks} valueStyle={{ color: '#01922b', fontSize: '3rem' }} suffix={`/ ${test.totalmaxmarks}`} />
                      </Col>
                      <Col span={6}>
                        <Statistic title="Percentage" value={(test.totalmarks / test.totalmaxmarks) * 100} valueStyle={{ color: '#01922b', fontSize: '3rem' }} suffix="%" />
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
                          <Progress type='dashboard' percent={getTotalPercentage("correct")} strokeColor="#01922b" />
                          <h1>Correct</h1>
                          <Divider />
                          {test.subjectsallowed.map((subject: string) => (
                            <div style={{ margin: '0 8% 5% 8%' }}>
                              <h4>Correct Answer % for {subject[0].toUpperCase().concat(subject.substring(1))} </h4>
                              <Progress percent={42} strokeColor="#01922b" />
                            </div>
                          ))}
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
                          <Progress type='dashboard' percent={getTotalPercentage("wrong")} strokeColor="#ed5f5f" />
                          <h1>Wrong</h1>
                          <Divider />
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
                          <Progress type='dashboard' percent={getTotalPercentage("na")} strokeColor="#ddcb34" />
                          <h1>Not Attempted</h1>
                          <Divider />
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
                  <QuestionAnalysis questions={state?.questions} subjectsallowed={test.subjectsallowed} />
                </Card>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Col>
      <Col span={2} />
    </Row>
  );
}