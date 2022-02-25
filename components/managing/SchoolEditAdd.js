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
            form.resetFields()
              .onCreate(values)
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
            <Option value="vocational">Vocational School</Option>
            <Option value="basic">Basic School</Option>
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
