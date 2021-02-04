import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React ,{useState} from 'react'
import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { EForms } from '../../components/Dashboard/EForms/EForms';
import { EFormSettings } from '../../components/Dashboard/EForms/EFormSettings';
import { EFormsAnalysis } from '../../components/Dashboard/EForms/EFormsAnalysis';


const { SubMenu } = Menu;
export const Dashboard: React.FC = () => {
    const [tab, setTab] = useState("1")
    const onChange = (e : any)  =>{
        setTab(e.key);
    }
    return (
        <Layout>
            <Sider style={{ height: '93vh' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['enquiry']}
                    style={{ height: '100%', borderRight: 0 }}
                    onSelect={onChange}
                >
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
                </Content>
            </Layout>   
        </Layout>
    );
}