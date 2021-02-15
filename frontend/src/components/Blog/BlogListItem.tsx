import React from 'react'
import { Card,Row } from 'antd';
import { Link } from 'react-router-dom';

interface BlogListItemProps {
    id: number;
    icon: React.ReactNode;
    title: string;
    description?: string;
}

export const BlogListItem: React.FC<BlogListItemProps> = ({ id, icon, description, title }) => {
    return (
        <Link to={'/blogs/' + id}>
            <Row>
                <Card hoverable style={{width:'90%',margin:'auto'}} title={<h1 style={{ fontSize: '2rem' }}>{title}</h1>}>
                    {description}
                </Card>
            </Row>
        </Link>
    );
}