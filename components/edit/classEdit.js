import React, { useState, useEffect } from "react"
import { Modal, Form, Input, Select } from "antd"
import { useSWRConfig } from "swr"

const { Option } = Select

const CollectionCreateForm = ({ visible, onEdit, onCancel, fields, isPUT }) => {
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
    name: ["class", "groupLeader"],
    value: field.groupLeader
  },
  {
    name: ["class", "schoolId"],
    value: field.schoolId
  }])))

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
        name="class_add"
        // Uses 0 index because it is an array containing an array
        fields={parsedFields[0]}
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

        <Form.Item name={["class", "groupLeader"]} label="Group Leader" rules={[{ message: "Please input a group leader!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name={["class", "schoolId"]} label="School" rules={[{ message: "Please input a school!", type: "number" }]}>
          <Select placeholder="Select school" options={schools}></Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CollectionsPage = ({ fields, isPUT, page }) => {
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
        isPUT={isPUT}
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

export default function classEdit (props) {
  return <CollectionsPage fields={props.fields} isPUT={props.isPUT} page={props.page} />
}
