import React, { useState } from "react"
import { Button, Modal, Form, Input, InputNumber, Select } from "antd"

const { Option } = Select

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      title="Add a new School"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values)
            form.resetFields()
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
        <Form.Item name={["school", "regcode"]} label="Registry Code">
          <InputNumber style={{ width: 472 }}/>
        </Form.Item>

        <Form.Item name={["school", "name"]} label="School Name">
          <Input />
        </Form.Item>

        <Form.Item name={["school", "school"]} label="Type">
          <Select placeholder="Select school type">
            <Option value="primary">Primary School</Option>
            <Option value="high">High School</Option>
            <Option value="vocational">Vocational School</Option>
            <Option value="uni">University</Option>
          </Select>
        </Form.Item>

        <Form.Item name={["school", "county"]} label="County">
          <Input />
        </Form.Item>

        <Form.Item name={["school", "city"]} label="City">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false)

  const onCreate = (values) => {
    console.log("Received values of form: ", values)
    setVisible(false)
    fetch("http://localhost:3000/api/v1/schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then((json) => {
        console.log("login response", json)
        if (json.success) {
          // redirect("/users")
        }
      })
  }

  return (
    <div>
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

class SchoolEditAdd extends React.Component {
  render () {
    return <CollectionsPage />
  }
}

export default SchoolEditAdd
