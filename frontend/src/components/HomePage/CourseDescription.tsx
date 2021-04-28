import { Row, Col, List, Card, Divider, Button } from 'antd';
import React, { useEffect ,useState} from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import CourseData from '../../views/HomePage/CourseData';
import { Error404 } from '../Errors/Error404';

interface CourseDescriptionProps {
    showBatches?: boolean,
    course?: CourseInterface,
}
interface CourseInterface {
    name: string,
    description: string | React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
    icon: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    tag:string,
    batches?:JSX.Element[],
}

export const CourseDescription: React.FC<CourseDescriptionProps> = ({ showBatches, course }) => {
    let courseData: Array<CourseInterface> = CourseData;
    const [courseState, setCourseState] = useState(course)
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0);
        switch (location.pathname.split("/")[2]) {
            case 'jee':
                setCourseState(courseData[0])
                break;
            case 'kvpy':
                setCourseState(courseData[1])
                break;
            case 'nda':
                setCourseState(courseData[2])
                break;
            case 'genius':
                setCourseState(courseData[3])
                break;
            case 'tests':
                setCourseState(courseData[4])
                break;
            case 'jam':
                setCourseState(courseData[5])
                break;
            default:
                <Error404 />
                break;
        }

    }, [location.pathname.split("/")[2]])
    return (
        <div>
            {showBatches !== false ?
                <div style={{ minHeight: '90vh' }}>
                    <Row style={{ marginTop: '5%' }}>
                        <Col lg={2} />
                        <Col lg={12}>
                            <p style={{textAlign:'left'}}>
                                <h1><b>Integrated Program:</b> {courseState?.name}</h1>
                                <Divider />
                                {courseState?.description}.
                            </p>
                        </Col>
                        <Col lg={8}>
                            <img
                                style={{
                                    height: "30vh",
                                    zIndex: 5,
                                    boxShadow: "17px 10px 37px 0px rgba(0,0,0,0.75)",
                                }}
                                src="https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                                alt="insertimage"
                            />
                        </Col>
                        <Col lg={2} />
                    </Row>
                    {courseState?.batches && <Row style={{ marginTop: '3%' }}>
                        <Col lg={2} />
                        <Col lg={20}>
                            <h1 style={{ textAlign: 'center', fontSize: '48px', marginBottom: '0' }}>Batches for this course:</h1>
                            <Divider />
                            <List grid={{
                                gutter: 24,
                                xs: 1,
                                sm: 2,
                                md: 4,
                                lg: 4,
                                xl: 4,
                                xxl: 4,
                            }}
                                style={{ width: "100%", margin: 'auto' }}
                                dataSource={courseState?.batches}
                                renderItem={(item) => (
                                    <List.Item id="course-list">
                                        <Card className="course-card" style={{ width: '100%', minHeight: '206px' }}>
                                            {item}
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col lg={2} />
                        <Col lg={2} />
                    </Row>}
                    
                </div> :
                <div style={{ minHeight: '45vh' }}>
                    <Row style={{ marginTop: '5%' }}>
                        <Col lg={1} />
                        <Col lg={10}>
                            <img
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '80%',
                                    margin: 'auto',
                                    zIndex: 5,
                                    boxShadow: "17px 10px 37px 0px rgba(0,0,0,0.75)",
                                }}
                                src="https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                                alt="insertimage"
                            />
                        </Col>
                        <Col lg={12}>
                            <h1><b>Integrated Program:</b> {courseState?.name}</h1>
                            <Divider />
                            {courseState?.description}
                            <Link to={`/courses/${courseState?.tag}`}><Button>Click to view more</Button></Link>
                        </Col>
                        <Col lg={1} />
                    </Row>
                </div>
            }
        </div >


    );
}