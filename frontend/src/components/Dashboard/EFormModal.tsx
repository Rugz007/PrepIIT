import React from 'react'

interface EFormModalProps {
    name: string,
    classBatch: string,
    email: string,
    phoneNumber: string,
}

export const EFormModal: React.FC<EFormModalProps> = ({ name, classBatch, phoneNumber, email }) => {
    return (
        <>
            {name}
        </>
    );
}