import React, { useState } from "react"
import { Button, Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"

const { Option } = Select

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
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
        <Form.Item name={["student", "name"]} label="Student Name">
          <Input />
        </Form.Item>

        <Form.Item name={["student", "class"]} label="Class">
          <Select placeholder="Select class">
            <Option value="class1">Class 1</Option>
            <Option value="class2">Class 2</Option>
            <Option value="class3">Class 3</Option>
          </Select>
        </Form.Item>

        <Form.Item name={["student", "school"]} label="Type">
          <Select placeholder="Select school">
            <Option value="tps">Tallinn Polytechnic School</Option>
            <Option value="tas">Tallinn Art School</Option>
            <Option value="kvs">Kuressaare Vocational School</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false)
  const { mutate } = useSWRConfig()

  const onCreate = (values) => {
    console.log("Received values of form: ", values)
    setVisible(false)
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

class StudentEditAdd extends React.Component {
  render () {
    return <CollectionsPage />
  }
}

export default StudentEditAdd
