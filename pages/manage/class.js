import React from "react"
import Head from "next/head"
import Nav from "../../components/navigation"
import Add from "../../components/add/classAdd"
import Edit from "../../components/edit/classEdit"
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

export default function ManageClass () {
  const { data } = useSWR("/api/v1/classes", fetcher)

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year"
    },
    {
      title: "Group Leader",
      dataIndex: "groupLeader",
      key: "groupLeader"
    },
    {
      title: "School",
      dataIndex: ["school", "name"],
      key: "school.name"
    },
    {
      title: "Action",
      key: "action",
      render: (_, Class) => (
        <Space size="middle">
          <Edit fields={Class} isPUT></Edit>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  return (
    <>
      <div className={styles.body}>
      <Head>
        <title>Manage Classes</title>
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
          style={{ width: 500 }} />
      </Space>
    </div><div className={styles.container}>

        <Table columns={columns} pagination={false} dataSource={data} rowKey="id" />

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
