import { Menu } from "antd"
import React from "react"
import { MailOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons"
import { signOut } from "next-auth/react"
import useUser from "./hooks/useUser"

export default function Nav (props) {
  const user = useUser() // Redirects to login if not logged in
  if (!user) return null // Avoids flickering

  return (
    <>
      <Menu theme='dark' selectedKeys={window.location.pathname} mode="horizontal">
        <Menu.Item key="/" icon={<HomeOutlined /> }>
          <a href="/"/>
        </Menu.Item>
        <Menu.Item key="news" icon={<MailOutlined />}>
          News
          <a href="https://ta-19-e-news-three.vercel.app/" target="_blank" rel="noreferrer" />
        </Menu.Item>
        <Menu.Item key="/manage/school">
          Manage Schools
          <a href="/manage/school"/>
        </Menu.Item>
        <Menu.Item key="/manage/class">
          Manage Classes
          <a href="/manage/class"/>
        </Menu.Item>
        <Menu.Item key="/manage/student">
          Manage Students
          <a href="/manage/student"/>
        </Menu.Item>
        <Menu.Item key="/manage/teacher">
          Manage Teachers
          <a href="/manage/teacher"/>
        </Menu.Item>
        <Menu.Item key="/profile" icon={<UserOutlined />} style={{ marginLeft: "auto" }}>
          Profile
          <a href="/profile"/>
        </Menu.Item>
        <Menu.Item key="signout" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
        </Menu.Item>
      </Menu>
    </>
  )
}
