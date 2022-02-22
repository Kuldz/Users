import { Form, Input, InputNumber, Button, Checkbox } from "antd"
import React from "react"

class ClassEditAdd extends React.Component {
  render () {
    return (
      <div>
        <Form name="nest-messages" layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item name={["class", "name"]} label="Name">
            <Input />
          </Form.Item>

          <Form.Item name={["class", "year"]} label="Year">
            <Input />
          </Form.Item>

          <Form.Item name={["class", "leader"]} label="Group Leader">
            <InputNumber />
          </Form.Item>

          <Form.Item name={["class", "school"]} label="School">
            <Input />
          </Form.Item>

          <Form.Item name={["class", "students"]} label="Student">
            <Input placeholder="Search Student"/>
            <Checkbox>John Brown</Checkbox>
            <Checkbox>Jim Green</Checkbox>
            <Checkbox>Joe Black</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default ClassEditAdd
