import { Button, Card, Col, Divider, List, Modal, Row } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React,{useState} from 'react'
import { EnquiryForm } from '../../components/HomePage/EnquiryForm';
import { EyeOutlined } from '@ant-design/icons';
import { Blob } from 'react-blob'
import './HomePage.css';
import CourseData from './CourseData';
import { CourseDescription } from '../../components/HomePage/CourseDescription';
interface CourseInterface {
  name: string,
  description: string | React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
  icon: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
}

export const HomePage: React.FC = () => {
  const [modalView, setModalView] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<CourseInterface | undefined>(undefined)
  const onClickView = (e :React.MouseEvent<HTMLElement, MouseEvent>,tag?:string,course? :CourseInterface) =>
  {
    if(modalView === false)
    {
      setCurrentCourse(course)
    }
    setModalView(!modalView)
  }
  let courseData: Array<CourseInterface> = CourseData;
  return (
    <Layout>
      <Content style={{ backgroundColor: '#1c2229' }}>
        <Row style={{ marginBottom: '1%', minHeight: '63vh' }}>
          <Col xxl={4} xs={0} />
          <Col xxl={0} xs={24} style={{ paddingTop: '2%' }}>
            <h1 style={{ fontSize: '20px' }}><b>Want to perform exceptionally in the upcoming competitive exams?</b></h1>
            <h1 style={{ fontSize: '30px' }} ><b><b>Join us today!</b></b></h1>
          </Col>
          <Col xxl={9} xs={0} style={{ paddingTop: '5%' }}>
            <Blob size="77%"
              style={{
                backgroundColor: '#323c48',
                color: 'white',
                padding: '10%'
              }}
            >
              <h1 style={{ fontSize: '30px' }} ><b><b>Excel in your exams! Join us today!</b></b></h1>
              <img src='terms.svg' alt='study' style={{ width: '100%' }} />
            </Blob>
          </Col>
          <Col xxl={7} xs={24} style={{ padding: '.4%', paddingTop: '2%', paddingBottom: '3%' }}>
            <EnquiryForm />
          </Col>
          <Col xxl={4} xs={0} />
        </Row>
        <Row style={{ minHeight: '48vh' }}>
          <Col span={24} style={{ height: '20%' }}><h1 style={{ textAlign: 'center', fontSize: '60px', marginBottom: '0' }}>Courses Offered</h1></Col>
          <Col span={2} style={{ height: '80%' }} />

          <Col span={20} style={{ height: '80%' }}>
            <List grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 6,
              xxl: 6,
            }}
              style={{ width: "100%", margin: 'auto' }}
              dataSource={courseData}
              renderItem={(item) => (
                <List.Item id="course-list">
                  <Card className="course-card" hoverable style={{ width: '100%', minHeight: '206px' }}>
                    <Row>
                      <div style={{ margin: 'auto' }}>{item.icon}</div>
                    </Row>
                    <h1>{item.name}</h1>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          <Col style={{ height: '80%' }} />
        </Row>
        <Row style={{ height: '280px', textAlign: 'center' }} className='parallex'>
          <h1 style={{ width: '100%', margin: 'auto', fontSize: '30px' }}><b>Located in Pune, We are here to nurture bright minds for their bright future.</b></h1>
        </Row>
        <Row style={{ marginTop: '3%', marginBottom: '2%' }}>
          <Col xxl={2} />
          <Col xxl={20}>
            <h1 style={{ fontSize: '60px' }}>Know more about our courses</h1>
            <Divider />
            <List grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
              style={{ width: "100%", margin: 'auto' }}
              dataSource={courseData}
              renderItem={(item) => (
                <List.Item>
                  <Card style={{ minHeight: '200px',margin:"0 2%" }}>
                    <Row>
                      <div style={{ width: '100%', margin: 'auto' }}>{item.icon}</div>
                    </Row>
                    <h1>{item.name}</h1>
                    <Button type='primary' onClick={e => onClickView(e,undefined,item)}><EyeOutlined />View</Button>
                  </Card>
                </List.Item>
              )}
            />
            <Modal width={"200vw"} footer={null} visible={modalView} onCancel={onClickView}>
              <CourseDescription course={currentCourse} showBatches={false}/>
            </Modal>
          </Col>
          <Col xxl={2} />
        </Row>
      </Content>
    </Layout>
  );
}