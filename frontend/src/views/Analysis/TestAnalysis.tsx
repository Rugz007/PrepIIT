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
  const getPercentage = (subject: string, value: string) => {
    let totalP = 0;
    test.subjectsallowed.forEach((subject: string) => {
      totalP += test[subject].correct + test[subject].wrong + test[subject].notattempted;
    });
    let tempP = test[subject][value]
    return Math.round(tempP * 1000 / totalP) / 10
  }
  const getTotalPercentage = (value: string) => {
    let total = 0;
    test.subjectsallowed.forEach((subject: string) => {
      total += test[subject].correct + test[subject].wrong + test[subject].notattempted;
    });
    let temp = 0;
    test.subjectsallowed.forEach((subject: string) => {
      temp += test[subject][value]
    });
    return Math.round(temp * 1000 / total) / 10
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
                              <h4>Correct Answer % from {subject[0].toUpperCase().concat(subject.substring(1))} </h4>
                              <Progress percent={getPercentage(subject, "correct")} strokeColor="#01922b" />
                            </div>
                          ))}
                        </Col>
                        <Col span={8}>
                          <Progress type='dashboard' percent={getTotalPercentage("wrong")} strokeColor="#ed5f5f" />
                          <h1>Wrong</h1>
                          <Divider />
                          {test.subjectsallowed.map((subject: string) => (
                            <div style={{ margin: '0 8% 5% 8%' }}>
                              <h4>Wrong Answer % from {subject[0].toUpperCase().concat(subject.substring(1))} </h4>
                              <Progress percent={getPercentage(subject, "wrong")} strokeColor="#ed5f5f" />
                            </div>
                          ))}
                        </Col>
                        <Col span={8}>
                          <Progress type='dashboard' percent={getTotalPercentage("notattempted")} strokeColor="#ddcb34" />
                          <h1>Not Attempted</h1>
                          <Divider />
                          {test.subjectsallowed.map((subject: string) => (
                            <div style={{ margin: '0 8% 5% 8%' }}>
                              <h4>Not Attempted Answer % from {subject[0].toUpperCase().concat(subject.substring(1))} </h4>
                              <Progress percent={getPercentage(subject, "notattempted")} strokeColor="#ddcb34" />
                            </div>
                          ))}

                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Subject Wise  Analysis" key="2">
                {test.subjectsallowed.map((subject: string) => (
                  <SubjectAnalysis name={subject} subject={test[subject]} maxMarks={test['maxmarks']} />
                ))}
                {/* <SubjectAnalysis title={<Row style={{ width: '50%' }}><h2 style={{ marginBottom: '0', marginTop: '2%' }}> &nbsp; Physics</h2></Row>} /> */}
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