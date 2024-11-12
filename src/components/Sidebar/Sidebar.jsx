import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuList } from '../MenuList';
import Logo from '../Logo';
import "./Sidebar.css"
import ToggleThemeButton from '../ToggleThemeButton';
import { Outlet, Link } from 'react-router-dom';

const { Sider } = Layout;

function Sidebar() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='layout'>
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
      <Layout className='layout_page'>
        <main>
          <div className='header'>
            <Button className='out_btn'><Link to="/login">Chiqish</Link></Button>
          </div>
          <Outlet/>
        </main>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
