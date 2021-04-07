import { Button, Card, Col, Popconfirm, Row, Tabs } from 'antd';
import React, { useState, useEffect } from 'react'
import { QuestionComponent } from '../../components/Test/QuestionComponent';
import { TestDetails } from '../../components/Test/TestDetails';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { TestIntruction } from '../../components/Test/TestIntruction';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const { REACT_APP_NODEJS_URL } = process.env;

interface QuestionInterface {
  qid: number,
  statement: string,
  img_path: string,
  type: string,
  archive: string,
  latex: string,
  options: string[],
};
// interface ResponseInterface {
//     userTestId: string,
//     subjects: string[],
//     Physics: Array<QuestionInterface[]>,
//     Chemistry: Array<QuestionInterface[]>,
//     Maths: Array<QuestionInterface[]>,
// }
// interface AnswersInterface {
//     questionID: number;
//     answer: string | number | null;
// };

export const Test: React.FC = () => {
  const [readInstructions, setReadInstructions] = useState(false)
  const [current, setCurrent] = useState<number>(1);
  const [tab, setTab] = useState("Physics")
  const [response, setResponse]: any = useState(undefined)
  const [answers, setAnswers]: any = useState(undefined);
  const history = useHistory();
  useEffect(() => {
    console.log("Hello world")
    localStorage.setItem("answers", JSON.stringify(answers))
  }, [answers])
  const getQuestions = () => {
    let testID = localStorage.getItem("testid")
    if (testID) {
      axios({
        method: "POST",
        url: `https://${REACT_APP_NODEJS_URL}/secure/test`,
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          "typeid": testID
        },
      }).then(res => {
        setResponse(res.data)
        let questionsMap: any = {}
        res.data['subjects'].map((subject: any) =>
        (
          res.data[subject].map((item: any, index: number) => (
            questionsMap[item['qid']] = [item['qid'], ["a"], "", "Not Visited"]
          ))
        ))
        setAnswers(questionsMap)
      }).catch(err => console.log(err))
    }
    else{
      console.log("No TestID")
    }

  };
  const onSelectAnswer = (e: any) => {
    var questionID = response[tab][current - 1]['qid']
    setAnswers({ ...answers, [questionID]: [response[tab][current - 1]['qid'], [e.target.value], "15", "Marked"] });
  };
  const onNext = () => {
    if (current !== response[tab].length) {
      var questionID = response[tab][current - 1]['qid']
      var temp = { ...answers }
      if (temp[questionID][3] === "Not Visited") {
        temp[questionID][3] = "Visited"
        setAnswers(temp)
      }
      setCurrent(current + 1)
    }
  };
  const onPrevious = () => {
    if (current !== 1) {
      var questionID = response[tab][current - 1]['qid']
      var temp = { ...answers }
      if (temp[questionID][3] === "Not Visited") {
        temp[questionID][3] = "Visited"
        setAnswers(temp)
      }
      setCurrent(current - 1)
    }
  };
  const onChangeTab = (e: any) => {
    setTab(e)
    setCurrent(1)
  }
  const readInstruct = () => {
    setReadInstructions(true);
    getQuestions();
  }
  const changeCurrent = (e: number) => {
    var questionID = response[tab][current - 1]['qid']
    var temp = { ...answers }
    temp[questionID][3] = "Visited"
    setAnswers(temp)
    setCurrent(e)

  }
  const markForReview = () => {
    var questionID = response[tab][current - 1]['qid']
    var temp = { ...answers }
    if (temp[questionID][3] === "MarkedForReview") {
      if (temp[questionID][1][0] === undefined) {
        temp[questionID][3] = "Visited"
      }
      else {
        temp[questionID][3] = "Marked"
      }
    }
    else {
      temp[questionID][3] = "MarkedForReview"
    }
    setAnswers(temp)
    onNext()
  }
  const onSubmit = () => {
    let temp: any = [];
    for (const [key, value] of Object.entries(answers)) {
      temp.push(value);
    }
    axios({
      method: "POST",
      url: `https://${REACT_APP_NODEJS_URL}/secure/verifyanswers`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        testid: 17,
        userid: 1,
        donetestid: response.userTestId,
        questions: temp
      },
    }).then(res => {
      localStorage.removeItem("testid");
      history.push("/");
      console.log(res);
    }).catch(err => console.log(err))

  };
  return (
    <div>
      <Row style={{ height: '2vh' }}>
        TestBar
            </Row>
      {readInstructions ?
        <Row style={{ padding: '2%' }}>
          <Col span={18}>
            <Row>
              <Col span={2}><Button onClick={onPrevious} type='primary' danger style={{ float: 'left' }}>Previous</Button></Col>
              <Col span={20}><Card style={{ width: '100%' }}> Time Remaining</Card></Col>
              <Col span={2}> <Button onClick={onNext} type='primary' style={{ float: 'right' }}>Next</Button></Col>
            </Row>
            <Row>
              <Card style={{ width: '100%', height: '74vh' }}>
                <Tabs onChange={onChangeTab}>
                  {response && response["subjects"].map((e: string, index: any) => (
                    <Tabs.TabPane tab={e} key={e} >
                      <QuestionComponent onSelect={onSelectAnswer} question={response[e][current - 1]} />
                    </Tabs.TabPane>
                  ))}
                </Tabs>
              </Card>
            </Row>
          </Col>
          <Col span={6}>
            <Card style={{ margin: '0 6%' }}>
              {response !== undefined && answers && <TestDetails questions={response[tab]} setCurrentFunction={changeCurrent} current={current} answers={answers} />}
              <Button onClick={markForReview}>Mark For Review</Button>
              <Popconfirm
                title="Are you sure you want to submit your test?"
                onConfirm={onSubmit}
                okText="Yes"
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Button style={{ width: '100%' }} type='primary'> Submit Test</Button>
              </Popconfirm>
            </Card>
          </Col>
        </Row> : <TestIntruction readInstruct={readInstruct} />}
    </div>
  );
}