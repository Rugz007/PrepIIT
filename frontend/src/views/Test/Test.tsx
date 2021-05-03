import { Button, Card, Col, Popconfirm, Result, Row, Tabs } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { MCQComponent } from "../../components/Test/QuestionComponents/MCQComponent";
import { TestDetails } from "../../components/Test/TestDetails";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { TestIntruction } from "../../components/Test/TestIntruction";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/User/UserContext";
import { InputComponent } from "../../components/Test/QuestionComponents/InputComponent";
const { REACT_APP_NODEJS_URL } = process.env;

interface QuestionInterface {
  qid: number;
  statement: string;
  img_path: string;
  type: string;
  archive: string;
  latex: string;
  options: string[];
}
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
  const [readInstructions, setReadInstructions] = useState(false);
  const [current, setCurrent] = useState<number>(1);
  const [tab, setTab] = useState("Physics");
  const [response, setResponse]: any = useState(undefined);
  const [answers, setAnswers]: any = useState(undefined);
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const history = useHistory();
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (
      localStorage.getItem("answers") !== undefined &&
      answers === undefined
    ) {
      //@ts-ignore
      setAnswers(JSON.parse(localStorage.getItem("answers")));
      //@ts-ignore
      console.log(JSON.parse(localStorage.getItem("answers")));
    }
    if (response !== undefined && answers !== undefined) {
      localStorage.setItem("answers", JSON.stringify(answers));
      console.log(localStorage.getItem("answers"));
    }
  }, [answers]);
  const getQuestions = () => {
    let testID = localStorage.getItem("testid");
    if (localStorage.getItem("usertestid")) {
      if (testID && userContext.user) {
        axios({
          method: "POST",
          url: `http://${REACT_APP_NODEJS_URL}/secure/cachequestions`,
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            testid: localStorage.getItem("usertestid"),
          },
        }).then((res) => {
          var date = Date.now() + res.data["timeLeft"] * 1000;
          setTimer(date);
          setResponse(res.data);
          if (localStorage.getItem("answers") === null) {
            let questionsMap: any = {};
            res.data["subjects"].map((subject: any) =>
              res.data[subject].map(
                (item: any, index: number) =>
                  (questionsMap[item["qid"]] = [
                    item["qid"],
                    [],
                    "",
                    "Not Visited",
                  ])
              )
            );
            setAnswers(questionsMap);
          } else {
            //@ts-ignore
            setAnswers(JSON.parse(localStorage.getItem("answers")));
            //@ts-ignore
            console.log(JSON.parse(localStorage.getItem("answers")));
          }
        });
      }
    } else {
      if (testID && userContext.user) {
        axios({
          method: "POST",
          url: `http://${REACT_APP_NODEJS_URL}/secure/test`,
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            typeid: testID,
            userid: userContext.user.userid,
          },
        })
          .then((res) => {
            localStorage.setItem("usertestid", res.data.userTestId);
            var date = Date.now() + res.data["timeLeft"] * 1000;
            setTimer(date);
            setResponse(res.data);
            if (
              localStorage.getItem("answers") === null ||
              localStorage.getItem("answers") === undefined
            ) {
              let questionsMap: any = {};
              res.data["subjects"].map((subject: any) =>
                res.data[subject].map(
                  (item: any, index: number) =>
                    (questionsMap[item["qid"]] = [
                      item["qid"],
                      [],
                      "",
                      "Not Visited",
                    ])
                )
              );
              setAnswers(questionsMap);
            } else {
              //@ts-ignore
              setAnswers(JSON.parse(localStorage.getItem("answers")));
              //@ts-ignore
              console.log(JSON.parse(localStorage.getItem("answers")));
            }
          })
          .catch((err) => console.log(err));
      } else {
        console.log("No TestID");
      }
    }
  };
  const onSelectAnswer = (e: any) => {
    var questionID = response[tab][current - 1]["qid"];
    setAnswers({
      ...answers,
      [questionID]: [
        response[tab][current - 1]["qid"],
        [e.target.value],
        "15",
        "Marked",
      ],
    });
    console.log("Select Answer");
  };
  const OnInputAnswer = (e: any) => {
    var questionID = response[tab][current - 1]["qid"];
    setAnswers({
      ...answers,
      [questionID]: [
        response[tab][current - 1]["qid"],
        [e.target.value],
        "15",
        "Marked",
      ],
    });
  };
  const onNext = () => {
    if (current !== response[tab].length) {
      var questionID = response[tab][current - 1]["qid"];
      var temp = { ...answers };
      if (
        temp[questionID][3] === "Not Visited" &&
        temp[questionID][3] !== "Marked"
      ) {
        temp[questionID][3] = "Visited";
        setAnswers(temp);
      }
      setCurrent(current + 1);
    }
    console.log("On Next");
  };
  const onPrevious = () => {
    if (current !== 1) {
      var questionID = response[tab][current - 1]["qid"];
      var temp = { ...answers };
      if (temp[questionID][3] === "Not Visited") {
        temp[questionID][3] = "Visited";
        setAnswers(temp);
      }
      setCurrent(current - 1);
    }
  };
  const onChangeTab = (e: any) => {
    setTab(e);
    setCurrent(1);
  };
  const readInstruct = () => {
    setReadInstructions(true);
    getQuestions();
  };
  const changeCurrent = (e: number) => {
    var questionID = response[tab][current - 1]["qid"];
    var temp = { ...answers };
    if (temp[questionID][3] !== "Marked") {
      temp[questionID][3] = "Visited";
    }
    setAnswers(temp);
    setCurrent(e);
  };
  const markForReview = () => {
    var questionID = response[tab][current - 1]["qid"];
    var temp = { ...answers };
    if (temp[questionID][3] === "MarkedForReview") {
      if (temp[questionID][1][0] === undefined) {
        temp[questionID][3] = "Visited";
      } else {
        temp[questionID][3] = "Marked";
      }
    } else {
      temp[questionID][3] = "MarkedForReview";
    }
    setAnswers(temp);
    onNext();
  };
  const clearAnswer = () => {
    var questionID = response[tab][current - 1]["qid"];
    setAnswers({
      ...answers,
      [questionID]: [response[tab][current - 1]["qid"], [""], "15", "Visited"],
    });
  };
  const onSubmit = () => {
    let temp: any = [];
    for (const [key, value] of Object.entries(answers)) {
      temp.push(value);
    }
    axios({
      method: "POST",
      url: `http://${REACT_APP_NODEJS_URL}/secure/verifyanswers`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        testid: 33,
        userid: 1,
        donetestid: response.userTestId,
        questions: temp,
      },
    })
      .then((res) => {
        localStorage.removeItem("testid");
        localStorage.removeItem("answers");
        localStorage.removeItem("usertestid");
        history.push("/submitted");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {localStorage.getItem("testid") ? (
        <div style={{ height: "100%" }}>
          {readInstructions ? (
            <Row style={{ height: "93.2vh" }}>
              <Col span={18}>
                <Row>
                  <Card style={{ width: "100%", height: "85vh" }}>
                    <Tabs onChange={onChangeTab}>
                      {response &&
                        response["subjects"].map((e: string, index: any) => (
                          <Tabs.TabPane tab={e} key={e}>
                            {(response[e][current - 1].type === "mcq" ||
                              response[e][current - 1].type === "anr" ||
                              response[e][current - 1].type === "tof") && (
                              <MCQComponent
                                onSelect={onSelectAnswer}
                                question={response[e][current - 1]}
                                answers={answers}
                              />
                            )}
                            {(response[e][current - 1].type === "fib" ||
                              response[e][current - 1].type === "num") && (
                              <InputComponent
                                onSelect={OnInputAnswer}
                                question={response[e][current - 1]}
                                answers={answers}
                              />
                            )}
                          </Tabs.TabPane>
                        ))}
                    </Tabs>
                  </Card>
                </Row>
                <Row style={{ height: "7vh" }}>
                  <Col
                    span={20}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button
                      style={{ margin: "0 2%" }}
                      type="primary"
                      onClick={clearAnswer}
                    >
                      Clear Answer
                    </Button>
                    <Button
                      style={{
                        marginRight: "2%",
                        backgroundColor: "#fce621",
                        borderColor: "#fce621",
                        color: "black",
                      }}
                      type="primary"
                      onClick={markForReview}
                    >
                      Mark For Review
                    </Button>
                    <Button style={{ marginRight: "2%" }} danger type="primary">
                      Report Question
                    </Button>
                  </Col>
                  <Col
                    span={4}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button onClick={onPrevious}>{"<"} Previous</Button>
                    <Button
                      onClick={onNext}
                      type="primary"
                      style={{ marginLeft: "10%" }}
                    >
                      Next {">"}
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Card style={{ width: "100%", height: "100%" }}>
                  {response !== undefined && answers && (
                    <TestDetails
                      timer={timer}
                      questions={response[tab]}
                      setCurrentFunction={changeCurrent}
                      current={current}
                      answers={answers}
                    />
                  )}
                  <Popconfirm
                    title="Are you sure you want to submit your test?"
                    onConfirm={onSubmit}
                    okText="Yes"
                    cancelText="No"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Button style={{ width: "100%" }} type="primary">
                      {" "}
                      Submit Test
                    </Button>
                  </Popconfirm>
                </Card>
              </Col>
            </Row>
          ) : (
            <TestIntruction readInstruct={readInstruct} />
          )}
        </div>
      ) : (
        <>
          <Result
            status="403"
            title="You are not authorized to access this test"
            subTitle="Go to your dashboard to start a new test"
          />
          <Link to="/dashboard">
            <Button type="primary" size="large">
              Go to Dashboard
            </Button>
          </Link>
        </>
      )}
    </>
  );
};
