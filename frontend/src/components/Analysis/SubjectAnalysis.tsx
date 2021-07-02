import { Card, Progress, Row} from 'antd'
import React from 'react'

interface SubjectAnalysisProps {
 title: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
}

export const SubjectAnalysis: React.FC<SubjectAnalysisProps> = ({title}) => {
    return (
        <Card title={title} style={{marginBottom:'5%'}}extra={<h1 style={{marginBottom:'0'}}>64/100</h1>}>
            <Row>
                <h4>Correct Answer %</h4>
                <Progress percent={42} strokeColor="#01922b" />
                <h4>Wrong Answer %</h4>
                <Progress percent={32} strokeColor="#ed5f5f" />
                <h4>Not Attempted %</h4>
                <Progress percent={12} strokeColor="#ddcb34" />
            </Row>
        </Card>
    );
}