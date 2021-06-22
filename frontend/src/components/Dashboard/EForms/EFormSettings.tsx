import { Button, Card, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
const { REACT_APP_NODEJS_URL } = process.env;

export const EFormSettings: React.FC = () => {


    const [template, setTemplate] = useState<string>("");
    useEffect(() => {
        fetchTemplate();
    }, [])
    const fetchTemplate = () => {
        axios.get(`http://${REACT_APP_NODEJS_URL}/admin/template`,
            {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((response) => {
                console.log(response.data)
                setTemplate(response.data.template.content)
            }).catch(() => message.error("Something went wrong!"))
    }
    const updateTemplate = () => {
        axios.post(`http://${REACT_APP_NODEJS_URL}/admin/template`,
            {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
                body:
                {
                    template: template
                }
            }).then(
                () => message.success("Edited Templated Successfully!")
            ).catch(() => message.error("Something went wrong!"))
    }
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTemplate(e.target.value);
    }
    return (
        <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '40px' }}>Enquiry Form Settings</h1>
            <Card style={{ textAlign: 'left', borderRadius: '10px' }}>
                <h1 style={{ fontSize: '30px' }}>Edit Template Mail</h1>
                <TextArea autoSize={{ minRows: 2, maxRows: 7 }} onChange={onChange} value={template} />
                <Button type='primary' onClick={updateTemplate} style={{ float: 'right', marginTop: '1%' }}>Save</Button>
            </Card>
        </div>

    );
}