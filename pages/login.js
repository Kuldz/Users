import React, { useEffect, useState } from "react"
import Head from "next/head"
import { Form, Input, Button, Alert, Card } from "antd"
import { signIn } from "next-auth/react"

export default function Login () {
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const errorParam = urlParams.get("error")
    if (errorParam === "CredentialsSignin") { setLoginError("Invalid username or password") }
  }, [])

  const sendCredentials = async (credentials) => {
    console.log("credentials", credentials)
    const res = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      callbackUrl: "/",
      redirect: true
    })
    if (res?.error) setLoginError("Login failed: " + res.error)
  }

  return (
    <div className="center">
      <Head>
        <title>Login</title>
      </Head>
      <Card title="Login" bordered={true}>
        <Form name="basic"
        onFinish={sendCredentials}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical">

          <Form.Item label="Email" name="email" type="email"
            rules={[{ required: true, message: "Input email" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" type="password" style={{ marginBottom: 4 }}
            rules={[{ required: true, message: "Input password" }]}>
            <Input.Password />
          </Form.Item>
          {loginError && (
              <Alert
                style={{ marginBottom: 24, alignSelf: "stretch" }}
                message={loginError}
                type="error"
                showIcon
                closable
              />
          )}

          <a>Forgot your password?</a>

          <Form.Item style={{ marginBottom: 4 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>

          <div>
            <p style={{ display: "inline-block", color: "#72767D" }}>Need an account?<a href="/register"> Register</a></p>
          </div>

        </Form>
      </Card>
    </div>
  )
}
