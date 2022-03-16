import React from "react"
import Head from "next/head"
import Nav from "../components/navigation"
import styles from "../styles/Profile.module.css"
import { Card, Avatar, Button, Col, Row } from "antd"
import { UserOutlined } from "@ant-design/icons"

const { Meta } = Card

export default function Profile () {
  return (
    <>
      <div>
        <Head>
          <title>Profile</title>
        </Head>
        <Nav></Nav>
        <div className={styles.profile}>
          <Card style={{ width: 600, margin: 14, borderColor: "#001529", borderWidth: "2px", borderRadius: "5px" }}>
            <Meta
              avatar={<Avatar size={100} style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />}/>}
              title="Upload your avatar"
              description={<>
                <p>Photo should be at least 300px x 300px</p>
                <Button type="primary" className={styles.button}>Upload a Photo</Button>
              </>}
            />
            <br></br>
            <h3>Information</h3>
            <Row>
              <Col span={12}><p id="firstName">Insert first name from backend here</p></Col>
              <Col span={12}><p id="lastName">Insert last name from backend here</p></Col>
            </Row>
            <Row>
              <Col span={12}><p id="school">Insert school from backend here</p></Col>
              <Col span={12}><p id="classGroup">Insert class from backend here</p></Col>
            </Row>
            <p id="email">Insert email from backend here</p>
            <h3>Account Settings</h3>
            <Button type="primary" className={styles.button}>Change Password</Button>
            <Button type="primary" className={styles.button}>Change E-mail</Button>
            <Button type="danger" className={styles.button}>Delete Account</Button>
          </Card>
        </div>
      </div>
    </>
  )
}
