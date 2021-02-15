import { Button, Card } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react'

export const EFormSettings: React.FC = () => {


    const [template, setTemplate] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTemplate(e.target.value);
    }
    return (
        <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '40px' }}>Enquiry Form Settings</h1>
            <Card style={{ textAlign: 'left', borderRadius: '10px' }}>
                <h1 style={{ fontSize: '30px' }}>Edit Template Mail</h1>
                <TextArea autoSize={{ minRows: 2, maxRows: 7 }} onChange={onChange} value={template} />
                
                <Button type='primary' onClick={()=>console.log(template)} style={{float:'right',marginTop:'1%'}}>Save</Button>
            </Card>
        </div>

    );
}