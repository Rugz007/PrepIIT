import { Collapse, Row, Col, Divider } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import React from "react";
const { Panel } = Collapse;

export const Courses: React.FC = () => {
  //Make the courses pages
  return (
    <Layout>
      <Content style={{ backgroundColor: "#1c2229" }}>
        <Row>
          <Col
            lg={24}
            style={{
              fontSize: "3rem",
              margin: "1.8% auto",
            }}
          >
            Courses We Offer
            <Divider />
          </Col>
        </Row>
        <Row style={{ paddingBottom: "3%" }}>
          <Col lg={4} />
          <Col lg={16}>
            <Collapse>
              <Panel
                header={
                  <Row>
                    <Col lg={4}>
                      <img
                        alt="jee"
                        src="https://img.icons8.com/office/70/000000/engineering.png"
                      />
                    </Col>
                    <Col lg={20} style={{ textAlign: "left" }}>
                      <h1 style={{ fontSize: "2em", marginBottom: "0" }}>
                        JEE Mains and Advanced
                      </h1>
                    </Col>
                  </Row>
                }
                key={1}
              >
               
              </Panel>
            </Collapse>
            <Collapse style={{ marginTop: "3%" }}>
              <Panel
                header={
                  <Row>
                    <Col lg={4}>
                      <img
                        alt="kvpy"
                        src="https://img.icons8.com/officel/70/000000/microscope.png"
                      />
                    </Col>
                    <Col lg={20} style={{ textAlign: "left" }}>
                      <h1 style={{ fontSize: "2em", marginBottom: "0" }}>
                        KVPY and Olympiad Program
                      </h1>
                    </Col>
                  </Row>
                }
                key={2}
              >
                
              </Panel>
            </Collapse>
            <Collapse style={{ marginTop: "3%" }}>
              <Panel
                header={
                  <Row>
                    <Col lg={4}>
                      <img
                        alt="NDA"
                        src="https://img.icons8.com/officel/70/000000/staff-sergeant-ssg.png"
                      />
                    </Col>
                    <Col lg={20} style={{ textAlign: "left" }}>
                      <h1 style={{ fontSize: "3em", marginBottom: "0" }}>
                        NDA and NA
                      </h1>
                    </Col>
                  </Row>
                }
                key={3}
              >
                
              </Panel>
            </Collapse>
            <Collapse style={{ marginTop: "3%" }}>
              <Panel
                header={
                  <Row>
                    <Col lg={4}>
                      <img
                        alt="stem"
                        src="https://img.icons8.com/officel/70/000000/knowledge-sharing.png"
                      />
                    </Col>
                    <Col lg={20} style={{ textAlign: "left" }}>
                      <h1 style={{ fontSize: "2em", marginBottom: "0" }}>
                        Summer Foundation Program (STEM)
                      </h1>
                    </Col>
                  </Row>
                }
                key={4}
              >
                
              </Panel>
            </Collapse>
            <Collapse style={{ marginTop: "3%" }}>
              <Panel
                header={
                  <Row>
                    <Col lg={4}>
                      <img
                        alt="test"
                        src="https://img.icons8.com/officel/70/000000/math.png"
                      />
                    </Col>
                    <Col lg={20} style={{ textAlign: "left" }}>
                      <h1 style={{ fontSize: "2em", marginBottom: "0" }}>
                        PrepiiT Test series
                      </h1>
                    </Col>
                  </Row>
                }
                key={5}
              >
               
              </Panel>
            </Collapse>
            <Divider style={{ marginTop: "0" }} />
          </Col>
          <Col lg={4} />
        </Row>
      </Content>
    </Layout>
  );
};
