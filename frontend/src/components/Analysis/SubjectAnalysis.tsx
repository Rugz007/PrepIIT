import { Card, Progress, Row } from 'antd'
import React from 'react'

interface SubjectAnalysisProps {
    name: string;
    subject: any;
    maxMarks: number;
}

export const SubjectAnalysis: React.FC<SubjectAnalysisProps> = ({ name, subject, maxMarks }) => {
    const images = () => {
        switch(name){
            case 'physics':
                return <img alt='physics' src="https://img.icons8.com/dusk/50/000000/physics.png" />
            case 'chemistry':
                return <img alt='chemistry' src="https://img.icons8.com/dusk/64/000000/benzene-ring.png" />
            case 'maths':
                return <img alt='maths' src="https://img.icons8.com/dusk/64/000000/plus.png" />
            case 'biology':
                return <img alt='biology' src="https://img.icons8.com/dusk/64/000000/microscope.png"/>
        }
    }
    const getPercentage = (value: string) => {
        let total = subject.correct + subject.wrong + subject.notattempted;
        return Math.round(subject[value] * 1000 / total) / 10;
    }
    return (
        <Card
            title={
                <Row style={{ width: '50%' }}>
                    {images()}
                    <h2 style={{ marginBottom: '0', marginTop: '2%' }}> &nbsp; {name[0].toUpperCase().concat(name.substring(1))}</h2>
                </Row>
            }
            style={{ marginBottom: '5%' }}
            extra={<h1 style={{ marginBottom: '0' }}>
                {subject.marks}/{maxMarks}
            </h1>}>
            <Row>
                <h4>Correct Answer %</h4>
                <Progress percent={getPercentage('correct')} strokeColor="#01922b" />
                <h4>Wrong Answer %</h4>
                <Progress percent={getPercentage('wrong')} strokeColor="#ed5f5f" />
                <h4>Not Attempted %</h4>
                <Progress percent={getPercentage('notattempted')} strokeColor="#ddcb34" />
            </Row>
        </Card>
    );
}