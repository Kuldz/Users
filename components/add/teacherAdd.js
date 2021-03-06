import React, { useState } from "react"
import { Button, Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"
import teacherEmailValidator from "../../functions/teacherEmailValidator"

const CollectionCreateForm = ({ visible, onCreate, onCancel, schools }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      title="Add a new Teacher"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log("Validate Failed:", info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="teacher_add"
      >
        <Form.Item name={["teacher", "firstName"]} label="First Name" rules={[{ required: true, message: "Please input a first name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["teacher", "lastName"]} label="Last Name" rules={[{ required: true, message: "Please input a last name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["teacher", "email"]} label="Email" rules={[{ type: "email", message: "Please input a valid email!" }, { validator: teacherEmailValidator }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["teacher", "schoolId"]} label="School" rules={[{ type: "number", required: true, message: "Please input a school!" }]}>
          <Select placeholder="Select school" options={schools}></Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CollectionsPage = ({ page, schools }) => {
  const { mutate } = useSWRConfig()
  const [visible, setVisible] = useState(false)

  const onCreate = (values) => {
    console.log("Received values of form: ", values)
    setVisible(false)
    fetch("/api/v1/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Create teacher response: ", json)
        mutate(`/api/v1/teachers?page=${page}`)
      })
  }

  return (
    <div className="table-add">
      <Button
        type="primary"
        onClick={() => {
          setVisible(true)
        }}
      >
        Add Teacher
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
        schools={schools}
      />
    </div>
  )
}

export default function teacherAdd (props) {
  return <CollectionsPage page={props.page} schools={props.schools} />
}
