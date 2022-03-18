import React, { useState, useEffect } from "react"
import { Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"

const CollectionCreateForm = ({ visible, onEdit, onCancel, fields, isPUT }) => {
  const [form] = Form.useForm()
  const [classes, setClasses] = useState([])
  const [schools, setSchools] = useState([])

  const parsedFields = [fields].map(field => (([{
    name: ["student", "firstName"],
    value: field.firstName
  },
  {
    name: ["student", "lastName"],
    value: field.lastName
  },
  {
    name: ["student", "email"],
    value: field.email
  },
  {
    name: ["student", "schoolId"],
    value: field.schoolId
  },
  {
    name: ["student", "classId"],
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
      title="Edit Student"
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
        name="student_edit"
        fields={parsedFields[0]}
      >
        <Form.Item name={["student", "firstName"]} label="First Name" rules={[{ required: true, message: "Please input a first name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["student", "lastName"]} label="Last Name" rules={[{ required: true, message: "Please input a last name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["student", "email"]} label="Email">
          <Input />
        </Form.Item>

        <Form.Item name={["student", "schoolId"]} label="School" rules={[{ required: true, message: "Please input a school!", type: "number" }]}>
          <Select placeholder="Select school" options={schools}></Select>
        </Form.Item>

        <Form.Item name={["student", "classId"]} label="Class" rules={[{ required: true, message: "Please input a class!", type: "number" }]}>
          <Select placeholder="Select class" options={classes}></Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CollectionsPage = ({ fields }) => {
  const { mutate } = useSWRConfig()
  const [visible, setVisible] = useState(false)

  const onEdit = (values, id) => {
    console.log("Received values of form: ", values)
    setVisible(false)
    fetch("/api/v1/students/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values.student)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Edit student response: ", json)
        mutate("/api/v1/students")
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

export default function studentEdit (props) {
  return <CollectionsPage fields={props.fields} isPUT={props.isPUT} />
}
