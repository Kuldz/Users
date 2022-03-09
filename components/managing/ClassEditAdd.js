import React, { useState } from "react"
import { Button, Modal, Form, Input, Select } from "antd"

const { Option } = Select

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      title="Add a new Class"
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
        <Form.Item name={["class", "name"]} label="Class Name" rules={[{ message: "Please input a name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["class", "year"]} label="Year" rules={[{ message: "Please input a starting year!" }]}>
          <Select placeholder="Select starting year">
            <Option value="2021">2021</Option>
            <Option value="2020">2020</Option>
            <Option value="2019">2019</Option>
            <Option value="2018">2018</Option>
            <Option value="2017">2017</Option>
          </Select>
        </Form.Item>

        <Form.Item name={["class", "grouplead"]} label="Group Leader" rules={[{ message: "Please input a group leader!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["class", "school"]} label="School" rules={[{ message: "Please input a school!" }]}>
          <Select placeholder="Select school">
            <Option value="Tallinn Polytechnic School">Tallinn Polytechnic School</Option>
            <Option value="Tartu Art School">Tartu Art School</Option>
            <Option value="Kuressaare Vocational School">Kuressaare Vocational School</Option>
          </Select>
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

class ClassEditAdd extends React.Component {
  render () {
    return <CollectionsPage />
  }
}

export default ClassEditAdd
