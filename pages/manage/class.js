import React, { useState } from "react"
import Head from "next/head"
import Nav from "../../components/navigation"
import Add from "../../components/add/classAdd"
import Edit from "../../components/edit/classEdit"
import styles from "../../styles/Manage.module.css"
import { Input, Table, Space, Select, Popconfirm, Button } from "antd"
import useSWR from "swr"

function handleChange (value) {
  console.log(`selected ${value}`)
}

function handleDelete (id) {
  fetch("/api/v1/classes/" + id, {
    method: "DELETE"
  })
}

const { Search } = Input
const { Option } = Select

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ManageClass () {
  const [page, setPage] = useState(1)
  const handlePageChange = page => {
    setPage(page) // by setting new page number, this whole component is re-run and useSWR will fetch new data with new page number
  }

  const { data, error, isValidating } = useSWR("/api/v1/classes" + "/?page=" + page, fetcher)
  if (error) {
    console.log(error)
    return <div>failed to load</div>
  }

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
          <Popconfirm title="Are you sure you want to delete this Class?"
                onConfirm={() => handleDelete(_.id)}
                okText="Yes" cancelText="No">
            <Button type="link" icon="Delete"/>
          </Popconfirm>
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

        <Table
        loading={isValidating}
        columns={columns}
        pagination={{ position: ["bottomCenter"], current: page, total: data?.totalCount || 0, onChange: handlePageChange }}
        dataSource={data?.classes || []}
        rowKey="id"
        />

        <div style={{ float: "right" }}>
          <Add></Add>
        </div>
      </div>
    </>
  )
}
