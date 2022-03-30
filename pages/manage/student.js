import React, { useState } from "react"
import Head from "next/head"
import Nav from "../../components/navigation"
import Add from "../../components/add/studentAdd"
import Edit from "../../components/edit/studentEdit"
import { Input, Table, Space, Select, Popconfirm } from "antd"
import useSWR, { useSWRConfig } from "swr"

function handleChange (value) {
  console.log(`selected ${value}`)
}

const { Search } = Input
const { Option } = Select

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ManageStudent () {
  const { mutate } = useSWRConfig()
  const [page, setPage] = useState(1)
  const handlePageChange = page => {
    setPage(page) // by setting new page number, this whole component is re-run and useSWR will fetch new data with new page number
  }
  const { data, error, isValidating } = useSWR(`/api/v1/students?page=${page}`, fetcher)
  if (error) {
    console.log(error)
  }

  function handleDelete (id) {
    fetch("/api/v1/students/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Delete student response: ", json)
        mutate(`/api/v1/students?page=${page}`)
      })
  }

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
      render: (_, Student) => (
        <div className="table-functions">
          <Edit fields={Student} page={page} />
          <Popconfirm title="Are you sure you want to delete this student?"
                onConfirm={() => handleDelete(_.id)}
                okText="Yes" cancelText="No">
            <a>Delete</a>
          </Popconfirm>
        </div>
      )
    }
  ]

  return (
    <>
    <Head>
      <title>Manage Students </title>
    </Head>
    <Nav />
    <Add page={page} />
    <Space>
      <Select defaultValue="Year" size="large" onChange={handleChange}>
        <Option value="Year">Filter by</Option>
        <Option value="Student Name">Filter by</Option>
        <Option value="Yiminghe">Filter by</Option>
      </Select>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
      />
    </Space>
    <Table
      loading={isValidating}
      columns={columns}
      pagination={{ position: ["bottomCenter"], current: page, total: data?.totalCount || 0, onChange: handlePageChange }}
      dataSource={data?.students || []}
      rowKey="id"
    />
    </>
  )
}
