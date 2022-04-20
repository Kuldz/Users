import React, { useState } from "react"
import { Button, Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"

const { Option } = Select

const CollectionCreateForm = ({ visible, onCreate, onCancel, teachers, schools }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      title="Add a new Class"
      okText="Save"
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
        name="class_add"
        // Uses 0 index because it is an array containing an array
      >
        <Form.Item name={["class", "name"]} label="Name" rules={[{ required: true, message: "Please input a name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["class", "year"]} label="Starting Year" rules={[{ required: true, message: "Please input a starting year!" }]}>
          <Select placeholder="Select starting year">
            <Option value="2021">2021</Option>
            <Option value="2020">2020</Option>
            <Option value="2019">2019</Option>
            <Option value="2018">2018</Option>
            <Option value="2017">2017</Option>
          </Select>
        </Form.Item>

        <Form.Item name={["class", "teacherId"]} label="Teacher" rules={[{ type: "number" }]}>
          <Select placeholder="Select teacher" options={teachers}></Select>
        </Form.Item>

        <Form.Item name={["class", "schoolId"]} label="School" rules={[{ required: true, message: "Please input a school!", type: "number" }]}>
          <Select placeholder="Select school" options={schools}></Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CollectionsPage = ({ page, teachers, schools }) => {
  const { mutate } = useSWRConfig()
  const [visible, setVisible] = useState(false)

  const onCreate = (values) => {
    console.log("Received values of form: ", values)
    setVisible(false)
    fetch("/api/v1/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Create class response: ", json)
        mutate(`/api/v1/classes?page=${page}`)
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
        Add Class
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
        teachers={teachers}
        schools={schools}
      />
    </div>
  )
}

export default function classAdd (props) {
  return <CollectionsPage page={props.page} teachers={props.teachers} schools={props.schools} />
}
