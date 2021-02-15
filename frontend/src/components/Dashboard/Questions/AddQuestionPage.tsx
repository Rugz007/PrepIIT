import { Tabs } from 'antd'
import React from 'react'
import { UploadQuestions } from './UploadQuestions'


export const AddQuestionPage: React.FC = () => {
    return (
        <div style={{ textAlign: "left" }}>
            <h1 style={{ fontSize: "40px" }}>Add Questions</h1>
            <Tabs>
                <Tabs.TabPane tab='Add new Questions' key='1'>Add Questions</Tabs.TabPane>
                <Tabs.TabPane tab='Upload Questions' key='2'><UploadQuestions/></Tabs.TabPane>
            </Tabs>
        </div>
    );
}