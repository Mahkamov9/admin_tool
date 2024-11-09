import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
// import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { MenuList } from '../MenuList';
import Logo from '../Logo';
import ToggleThemeButton from '../ToggleThemeButton';


const { Header, Sider } = Layout;

function Sidebar({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Tema o'zgarishi uchun funksiya
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  // Ant Design ranglaridan foydalanish
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className='layout'>
      {/* Sider paneli */}
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? 'dark' : 'light'}
        className="sidebar"
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton
          darkTheme={darkTheme}
          toggleTheme={toggleTheme}
        />
      </Sider>

      {/* Asosiy Layout */}
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          />
        </Header> */}

        {children}

      </Layout>
    </Layout>
  );
}

export default Sidebar;
