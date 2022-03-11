import { Menu } from "antd"
import React from "react"
import { MailOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons"

class NavbarAdmin extends React.Component {
  state = {
    theme: "dark",
    current: "mail"
  };

  handleClick = e => {
    console.log("click ", e)
    this.setState({ current: e.key })
  };

  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light"
    })
  };

  render () {
    return (
      <>
        <Menu theme={this.state.theme} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="icon" icon={<HomeOutlined /> }>
            <a href="/"/>
          </Menu.Item>
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Empty
          </Menu.Item>
          <Menu.Item>Manage Schools
            <a href="/manage/School"/>
          </Menu.Item>
          <Menu.Item>Manage Students
            <a href="/manage/Student"/>
          </Menu.Item>
          <Menu.Item>Manage Classes
            <a href="/manage/Class"/>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />} style={{ marginLeft: "auto" }}>
            Profile
          </Menu.Item>
        </Menu>
      </>
    )
  }
}

export default NavbarAdmin
