import React from "react"
import Head from "next/head"
import Nav from "../../components/navigation"
import Add from "../../components/add/studentAdd"
import Edit from "../../components/edit/studentEdit"
import Pag from "../../components/pagination"
import styles from "../../styles/Manage.module.css"
import { Input, Table, Space, Select } from "antd"
import useSWR from "swr"

function handleChange (value) {
  console.log(`selected ${value}`)
}

const { Search } = Input
const { Option } = Select

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ManageStudent () {
  const { data } = useSWR("/api/v1/students", fetcher)

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "School",
      dataIndex: ["school", "name"],
      key: "school.name"
    },
    {
      title: "Class",
      dataIndex: ["class", "name"],
      key: "class.name"
    },
    {
      title: "Action",
      key: "action",
      render: (text) => (
        <Space size="middle">
          <Edit fields="" isPUT></Edit>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  return (
    <>
      <div className={styles.body}>
        <Head>
          <title>Manage Students</title>
        </Head>
        <Nav></Nav>
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

        <Table columns={columns} pagination={false} rowKey="id" dataSource={data}/>

        <div style={{ float: "right" }}>
        <Add></Add>
        </div>

        <div className={styles.pagination}>
          <Pag></Pag>
        </div>
      </div>
    </>
  )
}
