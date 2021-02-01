import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React ,{useState} from 'react'
import { Menu, Row } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { EForms } from '../../components/Dashboard/EForms';


const { SubMenu } = Menu;
export const Dashboard: React.FC = () => {
    const [tab, setTab] = useState("1")
    const onChange = (e : any)  =>{
        console.log(e);
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
                    {tab==='2' && <>Hello 2</>}
                    {tab==='3' && <>Hello 3</>}
                </Content>
            </Layout>

        </Layout>
    );
}