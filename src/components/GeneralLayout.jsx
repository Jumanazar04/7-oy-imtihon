import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import UseAuth from '../hooks/useAuth';

const {  Content, Footer, Sider } = Layout;
function getItem(label, key, icon, component, children) {
  return {
    key,
    icon,
    children,
    label,
    component
  };
}
const items = [
  getItem('Home', '1',   <Link to={'/'} />),
  getItem('Category', '2', <Link to={'/category'} />),
  getItem('Products', '3', <Link to={'/products'} />),
  getItem('Log in', '4', <Link to={'/login'} />),
  getItem('Sign up', '5', <Link to={'/register'} />),
  getItem('Create user', '6', <Link to={'/craete-user'} />),
  getItem('Upload files', '7', <Link to={'/users'} />),
];
const GeneralLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  UseAuth()

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 0,
              minHeight: 620,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
};
export default GeneralLayout;