import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useContext, useState } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  PaperClipOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { EForms } from "../../components/Dashboard/EForms/EForms";
import { EFormSettings } from "../../components/Dashboard/EForms/EFormSettings";
import { EFormsAnalysis } from "../../components/Dashboard/EForms/EFormsAnalysis";
import { Profile } from "../../components/Dashboard/Profile/Profile";
import { BlogsTable } from "../../components/Dashboard/Blogs/BlogsTable";
import { CreateBlog } from "../../components/Dashboard/Blogs/CreateBlog";
import UserContext from "../../context/User/UserContext";
import { Error400 } from "../../components/Errors/Error400";
import { QuestionBank } from "../../components/Dashboard/Questions/QuestionBank";
import { ReportedQuestions } from "../../components/Dashboard/Questions/ReportedQuestions";
import { AddQuestionPage } from "../../components/Dashboard/Questions/AddQuestionPage";

const { SubMenu } = Menu;
export const Dashboard: React.FC = () => {
  const userContext = useContext(UserContext);
  const [tab, setTab] = useState("4");
  const onChange = (e: any) => {
    setTab(e.key);
  };
  return (
    <Layout>
      {userContext.user != null ? (
        <>
          <Sider style={{ height: "93vh" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["4"]}
              defaultOpenKeys={["profile"]}
              style={{ height: "100%", borderRight: 0 }}
              onSelect={onChange}
            >
              <SubMenu key="profile" icon={<UserOutlined />} title="My Profile">
                <Menu.Item key="4">View Profile</Menu.Item>
                <Menu.Item key="5">View Past Tests</Menu.Item>
                <Menu.Item key="6">Settings</Menu.Item>
              </SubMenu>
              {userContext.user.admin != null ? (
                <>
                  <SubMenu
                    key="enquiry"
                    icon={<FormOutlined />}
                    title="Enquiry Forms"
                  >
                    <Menu.Item key="1">View Latest Forms</Menu.Item>
                    <Menu.Item key="2">Analysis</Menu.Item>
                    <Menu.Item key="3">Settings</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="questions"
                    icon={<QuestionCircleOutlined />}
                    title="Question Bank"
                  >
                    <Menu.Item key="9">Question Bank</Menu.Item>
                    <Menu.Item key="10">Add Questions</Menu.Item>
                    <Menu.Item key="11">Reported Questions</Menu.Item>
                    <Menu.Item key="12">Question Analysis</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="blogs"
                    icon={<PaperClipOutlined />}
                    title="Blogs"
                  >
                    <Menu.Item key="7">Publish a new Blog</Menu.Item>
                    <Menu.Item key="8">View Latest Blogs</Menu.Item>
                  </SubMenu>
                </>
              ) : (
                  <></>
                )}
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ backgroundColor: "#2a323c", padding: "3%" }}>
              {tab === "1" && userContext.user.admin != null && <EForms />}
              {tab === "2" && userContext.user.admin != null && (
                <EFormsAnalysis />
              )}
              {tab === "3" && userContext.user.admin != null && (
                <EFormSettings />
              )}
              {tab === "4" && <Profile />}
              {tab === "7" && userContext.user.admin != null && <CreateBlog />}
              {tab === "8" && userContext.user.admin != null && <BlogsTable />}
              {tab === "9" && userContext.user.admin != null && (
                <QuestionBank />
              )}
              {tab === "10" && userContext.user.admin != null && <AddQuestionPage/>}
              {tab === "11" && userContext.user.admin != null && <ReportedQuestions/>}
              {tab === "12" && userContext.user.admin != null && <></>}
            </Content>
          </Layout>
        </>
      ) : (
          <Error400/>
        )}
    </Layout>
  );
};
