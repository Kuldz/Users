import React, { useState } from "react"
import Head from "next/head"
import { Form, Input, Button } from "antd"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

export default function Login () {
  const [loginError, setLoginError] = useState("")
  const router = useRouter()

  const sendCredentials = async (credentials) => {
    console.log("credentials", credentials)
    const res = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      callbackUrl: "/logintest",
      redirect: false
    })
    if (res?.error) setLoginError("Login failed: " + res.error)
    if (res.url) router.push(res.url)
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

        <span>{loginError}</span>
        <Form.Item label="Password" name="password" type="password"
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
