import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { QuestionAnalysis } from '../../Analysis/QuestionAnalysis';

interface LiveTestPreviewModalProps {
    id: string;
    subjectsallowed: Array<string>;
}

export const LiveTestPreviewModal: React.FC<LiveTestPreviewModalProps> = ({ id, subjectsallowed }) => {
    const [state, setState] = useState(undefined)
    const [visible, setVisible] = useState(false);

    const fetchQuestions = (id: string) => {
        //Write Questions Fetching
    }
    useEffect(() => {
        fetchQuestions(id)
    }, [id])
    return (
        <>
            <Button onClick={() => { setVisible(true) }}>Preview Test</Button>
            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                {state && <QuestionAnalysis questions={state} subjectsallowed={subjectsallowed} />}
            </Modal>
        </>
    );
}