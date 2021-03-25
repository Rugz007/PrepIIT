import { Button, Card, Col, Popconfirm, Row, Tabs } from 'antd';
import React, { useState } from 'react'
import { QuestionComponent } from '../../components/Test/QuestionComponent';
import { TestDetails } from '../../components/Test/TestDetails';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { TestIntruction } from '../../components/Test/TestIntruction';
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
    const [response,setReponse]: any = useState({
        "userTestId": "BsbbHMgbPeDnewW",
        "subjects": ['Physics', 'Chemistry', 'Maths'],
        "Physics": [
            {
                "qid": 41825,
                "statement": "Vanessa",
                "img_path": "Trixi",
                "type": "Maud",
                "archive": "Jenilee",
                "latex": "abc",
                "marked_status":"Visited",
                "options": [
                    "Hello is this working",
                    "b",
                    "c"
                ]
            },
            {
                "qid": 40969,
                "statement": "Lulita",
                "img_path": "Joeann",
                "type": "Renie",
                "archive": "Raina",
                "latex": "abc",
                "options": [
                    "a"
                ]
            },
            {
                "qid": 41332,
                "statement": "Valeda",
                "img_path": "Ardenia",
                "type": "Collen",
                "archive": "Liana",
                "latex": "abc",
                "options": [
                    "Hello is this working",
                    "b",
                    "c"
                ]
            },
            {
                "qid": 42023,
                "statement": "Rani",
                "img_path": "Christy",
                "type": "Christy",
                "archive": "Alisha",
                "latex": "abc",
                "options": [
                    "Hello is this working",
                    "b",
                    "c"
                ]
            },
        ],
        "Chemistry": [
            {
                "qid": 42059,
                "statement": "Madelle",
                "img_path": "Cassondra",
                "type": "Letizia",
                "archive": "Hannis",
                "latex": "abc",
                "options": [
                    "Hello is this working",
                    "b",
                    "c"
                ]
            },
            {
                "qid": 41088,
                "statement": "Peri",
                "img_path": "Livvyy",
                "type": "Addia",
                "archive": "Annaliese",
                "latex": "abc",
                "options": [
                    "a"
                ]
            },
            {
                "qid": 42123,
                "statement": "Andeee",
                "img_path": "Justinn",
                "type": "Kimmy",
                "archive": "Barbara",
                "latex": "abc",
                "options": [
                    "Hello is this working",
                    "b",
                    "c"
                ]
            },
        ],
        "Maths": [
            {
                "qid": 42073,
                "statement": "Damaris",
                "img_path": "Jordan",
                "type": "Gwyneth",
                "archive": "Tani",
                "latex": "abc",
                "options": [
                    "Hello is this working",
                    "b",
                    "c"
                ]
            },
            {
                "qid": 40920,
                "statement": "Sibella",
                "img_path": "Ida",
                "type": "Vere",
                "archive": "Kylynn",
                "latex": "abc",
                "options": [
                    "a"
                ]
            },
            {
                "qid": 41998,
                "statement": "Konstance",
                "img_path": "Kenna",
                "type": "Grier",
                "archive": "Judy",
                "latex": "abc",
                "options": [
                    "Hello is this working",
                    "b",
                    "c"
                ]
            },
            {
                "qid": 41998,
                "statement": "Konstance",
                "img_path": "Kenna",
                "type": "Grier",
                "archive": "Judy",
                "latex": "abc",
                "options": [
                    "Hello is this working",
                    "b",
                    "c"
                ]
            },
        ]
    })
    const [questions, setQuestions] = useState<QuestionInterface[]>([]);
    const getQuestions = () => {

        //TODO: Get Questions
    };
    const getOptions = () => {
        //TODO: Get Options
    };
    const onSelectAnswer = () => {
        //TODO: Update Answers
    };
    const onNext = () => {
        if (current !== response[tab].length)
        {
                var temp = {...response}
            temp[tab][current-1]['marked_status'] = "Visited"
            setReponse(temp)
            setCurrent(current + 1)
        }
    };
    const onPrevious = () => {
        if (current !== 1) {
            if(response[tab][current-1]['marked_status'] === undefined)
            {
                var temp = {...response}
                temp[tab][current-1]['marked_status'] = "Visited"
                setReponse(temp)
            }
            setCurrent(current - 1)
        }
    };
    const onChangeTab = (e: any) => {
        setTab(e)
        setCurrent(1)
    }
    const readInstruct = () => {
        setReadInstructions(true)
    }
    const onSubmit = () => {
        ///TODO: onSubmitTest
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
                                    {response["subjects"].map((e: string, index: any) => (
                                        <Tabs.TabPane tab={e} key={e} >
                                            <QuestionComponent question={response[e][current - 1]} />
                                        </Tabs.TabPane>
                                    ))}
                                </Tabs>
                            </Card>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Card style={{ margin: '0 6%' }}>
                            <TestDetails questions={response[tab]} setCurrentFunction={setCurrent}current={current} />
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