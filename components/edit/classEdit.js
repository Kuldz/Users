import React, { useState } from "react"
import { Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"

const { Option } = Select

const CollectionCreateForm = ({ visible, onEdit, onCancel, fields, schools }) => {
  const [form] = Form.useForm()

  // Parses the fields into a form that antd can use
  const parsedFields = [fields].map(field => (([{
    name: ["class", "name"],
    value: field.name
  },
  {
    name: ["class", "year"],
    value: field.year
  },
  {
    name: ["class", "teacher"],
    value: field.teacher
  },
  {
    name: ["class", "schoolId"],
    value: field.schoolId
  }])))

  return (
    <Modal
      visible={visible}
      title="Edit Class"
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
        name="class_edit"
        // Uses 0 index because it is an array containing an array
        fields={parsedFields[0]}
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

        <Form.Item name={["class", "teacher"]} label="Teacher">
          <Input />
        </Form.Item>

        <Form.Item name={["class", "schoolId"]} label="School" rules={[{ required: true, message: "Please input a school!", type: "number" }]}>
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
    fetch("/api/v1/classes/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values.class)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Edit class response: ", json)
        console.log("page", json.page)
        mutate(`/api/v1/classes?page=${page}`)
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

export default function classEdit (props) {
  return <CollectionsPage fields={props.fields} page={props.page} schools={props.schools} />
}
