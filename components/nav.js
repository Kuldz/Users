import { Menu } from "antd"
import React from "react"
import { MailOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons"
import { signOut } from "next-auth/react"
import useUser from "./hooks/useUser"

// This component was transformed from React.Component to the more standardized Default Function

function Nav (props) {
  const user = useUser() // Redirects to login if not logged in
  if (!user) return null // Avoids flickering

  return (
    <>
      <Menu theme='dark' selectedKeys={window.location.pathname} mode="horizontal">
        <Menu.Item key="/" icon={<HomeOutlined /> }>
          <a href="/"/>
        </Menu.Item>
        <Menu.Item key="newsstuff" icon={<MailOutlined />}>
          News
        </Menu.Item>
        <Menu.Item key="/manage/School">Manage Schools
          <a href="/manage/School"/>
        </Menu.Item>
        <Menu.Item key="/manage/Student">Manage Students
          <a href="/manage/student"/>
        </Menu.Item>
        <Menu.Item key="/manage/Class">Manage Classes
          <a href="/manage/Class"/>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />} style={{ marginLeft: "auto" }}>
          <a href="/profile"/>
        </Menu.Item>
        <Menu.Item key="signout" onClick={() => signOut()}>
          Sign Out
        </Menu.Item>
      </Menu>
    </>
  )
}

export default Nav
