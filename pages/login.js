import React from "react"
import { Form, Input, Button } from "antd"

export default function login () {
  const sendData = (data) => {
    console.log("saadan data", data)

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("login vastus", json)
        if (json.success) {
          // redirect("/users")
        }
      })
  }

  return (
    <div className="site-layout-background" style={{ padding: 24, textAlign: "center" }}>
      <Form name="basic" onFinish={sendData} labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} initialValues={{ remember: true }} autoComplete="off">
        <Form.Item label="Username" name="username"
          rules={[{ required: true, message: "Input username" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password"
          rules={[{ required: true, message: "Input password" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 1 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
