import React, { useState, useEffect } from "react"
import { Button, Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"
import emailValidator from "../../functions/emailValidator"

const CollectionCreateForm = ({ visible, onCreate, onCancel, isPUT }) => {
  const [form] = Form.useForm()
  const [classes, setClasses] = useState([])
  const [schools, setSchools] = useState([])

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
      title="Add a new Student"
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
        name="school_add"
      >
        <Form.Item name={["student", "firstName"]} label="First Name" rules={[{ required: true, message: "Please input a first name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["student", "lastName"]} label="Last Name" rules={[{ required: true, message: "Please input a last name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["student", "email"]} label="Email" rules={[{ type: "email", message: "Please input a valid email!" }, { validator: emailValidator }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["student", "schoolId"]} label="School" rules={[{ type: "number", required: true, message: "Please input a school!" }]}>
          <Select placeholder="Select school" options={schools}></Select>
        </Form.Item>

        <Form.Item name={["student", "classId"]} label="Class" rules={[{ type: "number", required: true, message: "Please input a class!" }]}>
          <Select placeholder="Select class" options={classes}></Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CollectionsPage = ({ page }) => {
  const { mutate } = useSWRConfig()
  const [visible, setVisible] = useState(false)

  const onCreate = (values) => {
    console.log("Received values of form: ", values)
    setVisible(false)
    fetch("/api/v1/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Create student response: ", json)
        mutate(`/api/v1/students?page=${page}`)
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
        Add
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default function studentAdd (props) {
  return <CollectionsPage fields={props.fields} isPUT={props.isPUT} page={props.page} />
}
