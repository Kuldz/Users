import React from "react"
import NavbarAdmin from "../../components/navbar"
import StudentEditAdd from "../../components/managing/StudentEditAdd"
import Pag from "../../components/pagination"
import styles from "../../styles/Manage.module.css"
import { Input, Table, Space, Select } from "antd"

function handleChange (value) {
  console.log(`selected ${value}`)
}

const { Search } = Input
const { Option } = Select

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Class",
    dataIndex: "class",
    key: "class"
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
    class: "Class 1",
    school: "Tallinna Polütehnikum"
  },
  {
    name: "Jim Green",
    class: "Class 2",
    school: "Tallinna Polütehnikum"
  },
  {
    name: "Joe Black",
    class: "Class 3",
    school: "Tallinna Polütehnikum"
  }
]

export default function manageStudent () {
  return (
    <body>
      <div className={styles.body}>
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
      </div>

      <div className={styles.container}>

        <Table columns={columns} pagination={false} dataSource={data}/>

        <div style={{ float: "right" }}>
        <StudentEditAdd></StudentEditAdd>
        </div>

        <div className={styles.pagination}>
          <Pag></Pag>
        </div>
      </div>
    </body>
  )
}
