import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
export const Error400: React.FC = () => {
    return (
        <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary"><Link to='/'>Back Home</Link></Button>}
      />
    );
}