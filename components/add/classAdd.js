import React, { useState, useEffect } from "react"
import { Button, Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"

const { Option } = Select

const CollectionCreateForm = ({ visible, onCreate, onEdit, onCancel, fields, isPUT }) => {
  const [form] = Form.useForm()
  const [schools, setSchools] = useState([])

  if (!isPUT) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
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
      title="Add a new Class"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            if (isPUT) {
              onEdit(values, fields.id)
            } else {
              onCreate(values)
            }
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

        <Form.Item name={["class", "groupLeader"]} label="Group Leader">
          <Input />
        </Form.Item>

        <Form.Item name={["class", "schoolId"]} label="School" rules={[{ required: true, message: "Please input a school!", type: "number" }]}>
          <Select placeholder="Select school" options={schools}></Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CollectionsPage = ({ fields, isPUT, page }) => {
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
        Add
      </Button>
      <CollectionCreateForm
        isPUT={isPUT}
        fields={fields}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default function classAdd (props) {
  return <CollectionsPage fields={props.fields} isPUT={props.isPUT} page={props.page} />
}
