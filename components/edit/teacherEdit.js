import React, { useState } from "react"
import { Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"
import teacherEmailValidator from "../../functions/teacherEmailValidator"

const CollectionCreateForm = ({ visible, onEdit, onCancel, fields, schools }) => {
  const [form] = Form.useForm()

  const parsedFields = [fields].map(field => (([{
    name: ["teacher", "firstName"],
    value: field.firstName
  },
  {
    name: ["teacher", "lastName"],
    value: field.lastName
  },
  {
    name: ["teacher", "email"],
    value: field.email
  },
  {
    name: ["teacher", "schoolId"],
    value: field.schoolId
  }])))

  return (
    <Modal
      visible={visible}
      title="Edit Teacher"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onEdit(values, fields.id)
          })
          .catch((info) => {
            console.log("Validate Failed:", info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="teacher_edit"
        fields={parsedFields[0]}
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

const CollectionsPage = ({ fields, page, schools }) => {
  const { mutate } = useSWRConfig()
  const [visible, setVisible] = useState(false)

  const onEdit = (values, id) => {
    console.log("Received values of form: ", values)
    setVisible(false)
    fetch("/api/v1/teachers/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values.teacher)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Edit teacher response: ", json)
        mutate(`/api/v1/teachers?page=${page}`)
      })
  }

  return (
    <div>
      <a onClick={() => {
        setVisible(true)
      }}>Edit</a>
      <CollectionCreateForm
        fields={fields}
        visible={visible}
        onEdit={onEdit}
        onCancel={() => {
          setVisible(false)
        }}
        schools={schools}
      />
    </div>
  )
}

export default function teacherEdit (props) {
  return <CollectionsPage fields={props.fields} page={props.page} schools={props.schools} />
}
