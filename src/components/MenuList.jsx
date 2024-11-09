import React from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, BarsOutlined, HomeOutlined } from "@ant-design/icons"
import Title from 'antd/es/typography/Title';
import { TbBrandSupabase } from "react-icons/tb";
import { MdOutlinePlace } from "react-icons/md";
import { BiCategory, BiSolidLayer, BiSolidCity   } from "react-icons/bi";
import { IoCarSport } from "react-icons/io5";
import { Link } from 'react-router-dom';


export const MenuList = ({darkTheme}) => {
  return (
    <>
      <Menu
          theme={darkTheme? 'dark' : 'light'}
          mode='inline'
          className='menu-bar'>
        <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/" >Dashboard</Link></Menu.Item>
        <Menu.Item icon={<BiCategory />}><Link to="/category">Categories</Link></Menu.Item>
        <Menu.Item icon={<TbBrandSupabase />}>Brands</Menu.Item>
        <Menu.Item icon={<BiSolidLayer />}>Models</Menu.Item>
        <Menu.Item icon={<MdOutlinePlace />}>Places</Menu.Item>
        <Menu.Item icon={<BiSolidCity />}>Cities</Menu.Item>
        <Menu.Item icon={<IoCarSport />}>Cars</Menu.Item>
      </Menu>
    </>
  )
}