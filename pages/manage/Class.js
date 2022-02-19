import React from "react"
import NavbarAdmin from "../../components/navbar"
import Pag from "../../components/pagination"
import styles from "../../styles/Manage.module.css"
import { Input, Table, Space, Button, Select } from "antd"

function handleChange (value) {
  console.log(`selected ${value}`)
}

const { Search } = Input
const { Option } = Select

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "School",
    dataIndex: "school",
    key: "school"
  },
  {
    title: "Action",
    key: "action",
    render: (text) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    )
  }
]

const data = [
  {
    name: "John Brown",
    school: "Tallinna Polütehnikum"
  },
  {
    name: "Jim Green",
    school: "Tallinna Polütehnikum"
  },
  {
    name: "Joe Black",
    school: "Tallinna Polütehnikum"
  }
]

export default function Class () {
  return (
    <body className={styles.body}>
      <NavbarAdmin></NavbarAdmin>
      <Space split>
        <Select defaultValue="Year" size="large" onChange={handleChange}>
          <Option value="Year">Filter by</Option>
          <Option value="School Name">Filter by</Option>
          <Option value="Yiminghe">Filter by</Option>
        </Select>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          style={{ width: 500 }}
        />
      </Space>

      <div className={styles.container}>

        <Table columns={columns} pagination={false} dataSource={data}/>

        <Button type="primary" shape="round" size="large" style={{ float: "right" }}>
          Add
        </Button>
        <div className={styles.pagination}>
          <Pag></Pag>
        </div>
      </div>
    </body>
  )
}
