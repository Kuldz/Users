import emailValidator from "../../functions/emailValidator"
import React, { useState, useEffect } from "react"
import { Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"

const CollectionCreateForm = ({ visible, onEdit, onCancel, fields, isPUT }) => {
  const [form] = Form.useForm()
  const [classes, setClasses] = useState([])
  const [schools, setSchools] = useState([])

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
  },
  {
    name: ["teacher", "classId"],
    value: field.classId
  }])))

  if (!isPUT) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      fetch("/api/v1/classes").then(res => res.json()).then(data =>
        setClasses(data.classes.map(c => ({
          label: `${c.name}`,
          value: c.id
        })))
      )
      fetch("/api/v1/schools").then(res => res.json()).then(data =>
        setSchools(data.schools.map(school => ({
          label: `${school.name}`,
          value: school.id
        })))
      )
    }, [])
  }

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

        <Form.Item name={["teacher", "email"]} label="Email" rules={[{ type: "email", message: "Please input a valid email!" }, { validator: emailValidator }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["teacher", "schoolId"]} label="School" rules={[{ type: "number", required: true, message: "Please input a school!" }]}>
          <Select placeholder="Select school" options={schools}></Select>
        </Form.Item>

        <Form.Item name={["teacher", "classId"]} label="Class" rules={[{ type: "number", message: "Please input a class!" }]}>
          <Select placeholder="Select class" options={classes}></Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CollectionsPage = ({ fields, page }) => {
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
      />
    </div>
  )
}

export default function teacherEdit (props) {
  return <CollectionsPage fields={props.fields} isPUT={props.isPUT} page={props.page} />
}
