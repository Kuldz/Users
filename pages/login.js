import React, { useEffect, useState } from "react"
import Head from "next/head"
import { Form, Input, Button, Alert } from "antd"
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
    <div className="site-layout-background" style={{ padding: 24, textAlign: "center" }}>
      <Head>
        <title>Login</title>
      </Head>
      <Form name="basic" onFinish={sendCredentials} labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} initialValues={{ remember: true }} autoComplete="off">
        <Form.Item label="Email" name="email" type="email"
          rules={[{ required: true, message: "Input email" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" type="password"
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
        <Form.Item wrapperCol={{ offset: 8, span: 1 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
