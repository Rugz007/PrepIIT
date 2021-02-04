import React from "react";
import { Col, Row, Divider } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";

export const About: React.FC = () => {
  return (
    <Layout>
      <Content style={{ backgroundColor: "#2a323c" }}>
        <Row style={{ height: "100vh" }}>
          <Col
            span={15}
            style={{
              fontSize: "7rem",
              margin: "1.8% auto",
            }}
          >
            The PrepiiT Story
            <Divider />
          </Col>
        </Row>
        <Row>
          <Col span={2} />
          <Col
            style={{
              fontSize: "1.5rem",
              textAlign: "left",
              marginTop: "25vh",
              lineHeight: 2,
            }}
            span={9}
          >
            <Row style={{ fontSize: "1.8rem" }}>
              <b>“PrepiiT Center for Excellence in STEM Education”</b>
            </Row>
            took its present form with the vision to inculcate the excitement
            for STEM subjects in young minds of India, so as to help them to
            make informed decisions in the field of their choice and aptitude.
            We not only help our students with the test preparation but also
            arrange various activities in order to introduce them to various
            STEM careers.
          </Col>
          <Col span={3} />
          <Col span={4} style={{ marginTop: "15vh" }}>
            <img
              style={{
                height: "50vh",
                zIndex: 5,
                boxShadow: "17px 10px 37px 0px rgba(0,0,0,0.75)",
              }}
              src="https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
              alt="insertimage"
            ></img>
          </Col>
        </Row>
        <Row>
          <Col span={2} />
          <Col
            style={{
              fontSize: "1.5rem",
              textAlign: "left",
              marginTop: "25vh",
              lineHeight: 2,
            }}
            span={9}
          >
            <Row style={{ fontSize: "1.8rem" }}>
              <b>Why PrepiiT? How is PrepiiT different?</b>
            </Row>
            Our Philosophy: As the name suggests at PrepiiT we believe in being
            prepared and that too well prepared! We prepare our students not
            only to crack the exams but also to brace the challenges of the
            competitive world.
          </Col>
          <Col span={3} />
          <Col span={4} style={{ marginTop: "15vh" }}>
            <img
              style={{
                height: "50vh",
                zIndex: 5,
                boxShadow: "17px 10px 37px 0px rgba(0,0,0,0.75)",
              }}
              src="https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
              alt="insertimage"
            ></img>
          </Col>
        </Row>
        Why PrepiiT? How is PrepiiT different? Our Philosophy: As the name
        suggests at PrepiiT we believe in being prepared and that too well
        prepared! We prepare our students not only to crack the exams but also
        to brace the challenges of the competative world. Core Values Perceive…
        Prepare… Progress... No dream is unachievable, to achieve it one
        requires constant motivation, perseverance, honesty, hard work, and
        dedication. These core values are part of our DNA. Methodology Our
        methodology is what sets us apart from the rest. We strongly believe in
        and implement the proven well researched mentoring techniques which not
        only help us inculcate the dedication, motivation and deliver subject
        knowledge but also help the students to gain confidence. We recommend,
        provide and use the study and reference material that has stood the test
        of time, this gives us the confidence that at every step our students
        are well prepared. Our Faculty Our faculty has varied experience in
        teaching and research under their belt, who strive hard may it be to,
        prepare the right study material and teaching plan or be it, to help
        student overcome the anxiety and apprehension, more than teachers they
        become their mentors in this most important time period of the journey
        of the student’s lifetime.
      </Content>
    </Layout>
  );
};
