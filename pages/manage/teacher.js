import React, { useState } from "react"
import Head from "next/head"
import Nav from "../../components/navigation"
import Add from "../../components/add/teacherAdd"
import Edit from "../../components/edit/teacherEdit"
import { Input, Table, Popconfirm } from "antd"
import useSWR, { useSWRConfig } from "swr"

const { Search } = Input

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ManageTeacher () {
  const { mutate } = useSWRConfig()
  const [page, setPage] = useState(1)
  const handlePageChange = page => {
    setPage(page) // by setting new page number, this whole component is re-run and useSWR will fetch new data with new page number
  }
  const { data, error, isValidating } = useSWR(`/api/v1/teachers?page=${page}`, fetcher)
  if (error) {
    console.log(error)
  }

  console.log(data?.teachers)

  function returnFilterValues (column) {
    const records = []
    const usedValues = []

    data?.teachers.forEach(teacher => {
      const filterBy = (column === "school") ? teacher.school.name : teacher.class.name
      if (usedValues.includes(filterBy)) return
      usedValues.push(filterBy)

      const record = {}
      record.text = filterBy
      record.value = filterBy
      records.push(record)
    })
    return records
  }

  function handleDelete (id) {
    fetch("/api/v1/teachers/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Delete teacher response: ", json)
        mutate(`/api/v1/teachers?page=${page}`)
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
      key: "school.name",
      filters: returnFilterValues("school"),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.school.name === value,
      width: "30%"
    },
    {
      title: "Class",
      dataIndex: ["class", "name"],
      key: "class.name",
      filters: returnFilterValues("class"),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.class.name === value,
      width: "30%"
    },
    {
      title: "Action",
      key: "action",
      render: (_, Teacher) => (
        <div className="table-functions">
          <Edit fields={Teacher} page={page} />
          <Popconfirm title="Are you sure you want to delete this teacher?"
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
      <title>Manage Teachers </title>
    </Head>
    <Nav />
    <Search
      placeholder="Disabled for now..."
      allowClear
      enterButton="Search"
      size="large"
      disabled={true}
    />
    <Add page={page} />
    <Table
      loading={isValidating}
      columns={columns}
      pagination={{ position: ["bottomCenter"], current: page, total: data?.totalCount || 0, onChange: handlePageChange }}
      dataSource={data?.teachers || []}
      rowKey="id"
    />
    </>
  )
}
