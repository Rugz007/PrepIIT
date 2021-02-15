import React from "react";
import { Collapse, Row, Col, Divider } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
const { Panel } = Collapse;
export const FAQ: React.FC = () => {
  return (
    <Layout>
      <Content style={{ backgroundColor: "#2a323c" }}>
        <Row style={{ height: "30vh" }}>
          <Col
            span={14}
            style={{
              fontSize: "5rem",
              margin: "1.8% auto",
            }}
          >
            Frequently Asked Questions
            <Divider />
          </Col>
        </Row>
        <Row style={{ paddingBottom: "3%" }}>
          <Col span={4} />
          <Col span={16}>
            <h1 style={{ fontSize: "3rem" }}>
              Common Questions asked by Students
            </h1>
            <Collapse style={{ textAlign: "left" }}>
              <Panel
                header="What method of study will guarantee my success?"
                key={1}
              >
                Hard work is the key to success, attend classes regularly and
                complete your homework and assignments as soon as you get it.
                You must read the theory but never read the solution of the
                problems.
              </Panel>
              <Panel
                header="Which books should I refer to so as to qualify such exams?"
                key={2}
              >
                The study and reference material that is provided to you by
                PrepiiT are usually enough. Although faculty may recommend some
                additional references that will be made available to you.
              </Panel>
              <Panel
                header="How many hours a day I ought to study to get successful?"
                key={3}
              >
                One can not quantify the studies only by the number of hours put
                in, it needs to assessed periodically and will depend on your
                performance in the regular assessment. The thumb rule is to
                study at least the topics that are covered in the class the same
                day and not to pile up the backlog of studies wich eventually
                may get unmanageable.
              </Panel>
              <Panel
                header="Can we find some smart way instead of all this hard work?  I find some topic difficult than others can I just skip it?"
                key={4}
              >
                There are no shortcuts to success! But you can always find
                smarter ways of studies like use mnemonics and non-linear memory
                maps. You will greatly benefit from the special sessions
                conducted on these methods by PrepiiT.
              </Panel>
              <Panel
                header="I want to increase my score but I don't understand where I lose marks?"
                key={5}
              >
                This is where our evaluation report comes in handy, you will be
                trained to assess it to find out where you are losing marks?
              </Panel>
              <Panel
                header="Will my score be better if I study with friends and participate in group discussions? Will that create more competition for me?"
                key={6}
              >
                Group study definitely helps. Though, when should you choose to
                study in the group is very important. One must discuss and
                participate in group study at initial stages, but we believe one
                must concentrate on the self study as the exam approaches.
              </Panel>
            </Collapse>
            <Divider style={{ marginTop: "0" }} />
          </Col>
          <Col span={4} />
        </Row>
        <Row style={{ paddingBottom: "3%" }}>
          <Col span={4} />
          <Col span={16}>
            <h1 style={{ fontSize: "3rem" }}>
              Common Questions asked by Parents
            </h1>
            <Collapse style={{ textAlign: "left" }}>
              <Panel
                header="What career options are good for my daughter/son?"
                key={1}
              >
                It depends on the aptitude and inclination of your ward. Our
                personalized counseling will help you explore these options. If
                your ward is still confused we can recommend a specific aptitude
                test that can help us to get the clear picture.
              </Panel>
              <Panel
                header="How can we get information about different kinds of entrance tests and their admission schedules?"
                key={2}
              >
                We will periodically send the details to parents as well as
                students, also the tentative dates will be provided in the
                academic calendar.
              </Panel>
              <Panel
                header="Is my daughter /son prepared to sustain such cut throat competition?"
                key={3}
              >
                Competition has always been there, and it is the indicator of
                success, a positive atmosphere at home goes a long way to get
                them prepared.
              </Panel>
              <Panel
                header="My son /daughter does not study enough, his /her efforts are not enough for his/her potential.  How can we, as parents, help him/her to use his/her full potential?"
                key={4}
              >
                This has been one of the most asked questions, taking interest
                in your ward's every day’s academic activities can help a great
                deal, if you just follow up on the homework assignment and keep
                the check that they are completed in time and also review the
                assessment report periodically, this way you can be sure if they
                are doing all they can to achieve their goal!
              </Panel>
              <Panel
                header="Should my daughter/son stop all her/his extracurricular activities and only be focused on the career?"
                key={5}
              >
                No. They should not. The balance is must in academics and
                extracurricular activities. In fact, this balance has been
                proven to enhance the end results.
              </Panel>
              <Panel
                header="Will he/she be able to complete the syllabus in time?"
                key={6}
              >
                PrepiiT academic plan ensures that it is completed quiet before
                time.
              </Panel>
              <Panel header="How many revision sessions are advised?" key={7}>
                The PrepiiT academic plan has specific provisions for the
                revision sessions.
              </Panel>
              <Panel header="How will we get his progress report/s?" key={8}>
                One can simply log in with PrepiiT account ID to review this
                anytime. Also, we will email/SMS the regular updates at periodic
                intervals.
              </Panel>
              <Panel
                header="All this stress is affecting his/her health, he/she doesn't eat/sleep on time?"
                key={9}
              >
                Occasionally visiting relatives or a movie or any such activity
                is known to reduce stress level, we always recommend parents to
                keep the positive atmosphere at home, you know your ward better
                than anyone else, find the solution that best suits your ward,
                there is no standard solution to this issue.
              </Panel>
              <Panel
                header="She/He is worried about his score and is not confident, how can this situation be tackled?"
                key={10}
              >
                Our continuous evaluation program will generate the confidence
                that your ward needs.
              </Panel>
            </Collapse>
            <Divider style={{ marginTop: "0" }} />
          </Col>
          <Col span={4} />
        </Row>
      </Content>
    </Layout>
  );
};
