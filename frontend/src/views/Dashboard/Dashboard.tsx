import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React ,{useState} from 'react'
import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { EForms } from '../../components/Dashboard/EForms/EForms';
import { EFormSettings } from '../../components/Dashboard/EForms/EFormSettings';
import { EFormsAnalysis } from '../../components/Dashboard/EForms/EFormsAnalysis';
import { Profile } from '../../components/Dashboard/Profile/Profile';


const { SubMenu } = Menu;
export const Dashboard: React.FC = () => {
    const [tab, setTab] = useState("4")
    const onChange = (e : any)  =>{
        setTab(e.key);
    }
    return (
        <Layout>
            <Sider style={{ height: '93vh' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    defaultOpenKeys={['enquiry']}
                    style={{ height: '100%', borderRight: 0 }}
                    onSelect={onChange}
                >
                    <SubMenu key='profile' title='My Profile'>
                        <Menu.Item key='4'>View Profile</Menu.Item>
                        <Menu.Item key='5'>View Past Tests</Menu.Item>
                        <Menu.Item key='6'>Settings</Menu.Item>
                    </SubMenu>
                    <SubMenu key="enquiry" icon={<UserOutlined />} title="Enquiry Forms" >
                        <Menu.Item key="1">View Latest Forms</Menu.Item>
                        <Menu.Item key="2">Analysis</Menu.Item>
                        <Menu.Item key="3">Settings</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{backgroundColor:'#2a323c',padding:'3%'}}>
                    {tab==='1' && <EForms />}
                    {tab==='2' && <EFormsAnalysis/>}
                    {tab==='3' && <EFormSettings/>}
                    {tab==='4' && <Profile/>}
                </Content>
            </Layout>   
        </Layout>
    );
}