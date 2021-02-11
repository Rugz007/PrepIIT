import { Button, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';

interface EFormModalProps {
    EForm: {
        name: string,
        email: string,
        number: string,
        standard: string,
        type: string,
    }
}

export const EFormModal: React.FC<EFormModalProps> = ({ EForm }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button type='primary' style={{ marginRight: '2%' }} onClick={() => setVisible(true)}>View</Button>
            <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
                <Row>
                    <br />
                    Name: {EForm.name}
                    <br />
                    Class: {EForm.standard}
                    <br />
                    Email: {EForm.email}
                    <br />

                </Row>
                <Row>
                    <Button type='primary' danger>Delete</Button>
                </Row>
            </Modal>
        </>
    );
}