import { Menu } from "antd"
import React, { useState } from "react"
import { MailOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons"
import { signOut } from "next-auth/react"
import useUser from "./hooks/useUser"

// This component was transformed from React.Component to the more standardized Default Function

export default function NavbarAdmin (props) {
  const [state, setState] = useState({
    theme: "dark",
    current: "mail"
  })

  const user = useUser() // Redirects to login if not logged in
  if (!user) return null // Avoids flickering

  const handleClick = e => {
    console.log("click ", e)
    setState({ current: e.key })
  }

  return (
    <>
      <Menu theme={state.theme} onClick={handleClick} selectedKeys={[state.current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined /> }>
          <a href="/"/>
        </Menu.Item>
        <Menu.Item key="empty" icon={<MailOutlined />}>
          Empty
        </Menu.Item>
        <Menu.Item key="schools">Manage Schools
          <a href="/manage/School"/>
        </Menu.Item>
        <Menu.Item key="students">Manage Students
          <a href="/manage/Student"/>
        </Menu.Item>
        <Menu.Item key="classes">Manage Classes
          <a href="/manage/Class"/>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />} style={{ marginLeft: "auto" }}>
          Profile
        </Menu.Item>
        <Menu.Item key="signout" onClick={() => signOut()}>
          Sign Out
        </Menu.Item>
      </Menu>
    </>
  )
}
