import React from "react"
import Head from "next/head"
import { Form, Input, Button, Card } from "antd"
import userEmailValidator from "../functions/userEmailValidator"

export default function Register () {
  const onCreate = (values) => {
    console.log("Received values of form: ", values)
    fetch("api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Create user response: ", json)
      })
  }

  return (
    <div className="center">
      <Head>
        <title>Register</title>
      </Head>
      <Card title="Create an account" bordered={true}>
        <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onCreate}
        layout="vertical">

          <Form.Item label="Email" name="email" type="email"
            rules={[
              { type: "email", message: "Please input a valid email!" },
              { required: true, message: "Please input an email!" },
              { validator: userEmailValidator }
            ]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" type="password"
            rules={[{ required: true, message: "Please input a password!" }]} hasFeedback>
            <Input.Password />
          </Form.Item>

          <Form.Item label="Confirm Password" name="confirmPassword" dependencies={["password"]} type="password" hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }

                  return Promise.reject(new Error("Passwords do not match!"))
                }
              })
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item style={{ marginBottom: 4 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <a href="/login">Already have an account?</a>
        </Form>
      </Card>
    </div>
  )
}
