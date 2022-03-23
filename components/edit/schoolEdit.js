import React, { useState } from "react"
import { Modal, Form, Input, InputNumber, Select } from "antd"
import { useSWRConfig } from "swr"

const { Option } = Select

const CollectionCreateForm = ({ visible, onEdit, onCancel, fields }) => {
  const [form] = Form.useForm()

  const parsedFields = [fields].map(field => (([{
    name: ["school", "regCode"],
    value: field.regCode
  },
  {
    name: ["school", "name"],
    value: field.name
  },
  {
    name: ["school", "type"],
    value: field.type
  },
  {
    name: ["school", "county"],
    value: field.county
  },
  {
    name: ["school", "city"],
    value: field.city
  }])))

  return (
    <Modal
      visible={visible}
      title="Edit School"
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
        name="school_edit"
        fields={parsedFields[0]}
      >
        <Form.Item name={["school", "regCode"]} label="Registry Code" rules={[{ required: true, message: "Please input a registry code!" }]}>
          <InputNumber style={{ width: 472 }} min='0' maxLength='8'/>
        </Form.Item>

        <Form.Item name={["school", "name"]} label="Name" rules={[{ required: true, message: "Please input a name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["school", "type"]} label="Type" rules={[{ required: true, message: "Please input a type!" }]}>
          <Select placeholder="Select school type">
            <Option value="Primary School">Primary School</Option>
            <Option value="High School">High School</Option>
            <Option value="Vocational School">Vocational School</Option>
            <Option value="University">University</Option>
          </Select>
        </Form.Item>

        <Form.Item name={["school", "county"]} label="County" rules={[{ required: true, message: "Please input a county!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["school", "city"]} label="City" rules={[{ required: true, message: "Please input a city!" }]}>
          <Input />
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
    fetch("/api/v1/schools/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values.school)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Edit school response: ", json)
        mutate("/api/v1/schools")
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

export default function schoolEdit (props) {
  return <CollectionsPage fields={props.fields} isPUT={props.isPUT} />
}
