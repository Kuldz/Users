import React, { useState, useEffect } from "react"
import Head from "next/head"
import Nav from "../../components/navigation"
import Add from "../../components/add/studentAdd"
import Edit from "../../components/edit/studentEdit"
import { Input, Table, Popconfirm } from "antd"
import useSWR, { useSWRConfig } from "swr"

const { Search } = Input

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ManageStudent () {
  const { mutate } = useSWRConfig()
  const [page, setPage] = useState(1)
  const [classes, setClasses] = useState([])
  const [schools, setSchools] = useState([])

  useEffect(() => {
    fetch("/api/v1/classes").then(res => res.json()).then(data =>
      setClasses(data.classes.map(c => ({
        label: `${c.name}`,
        value: c.id
      })))
    )

    fetch("/api/v1/schools").then(res => res.json()).then(data =>
      setSchools(data.schools.map(school => ({
        label: `${school.name}`,
        value: school.id
      })))
    )
  }, [])

  const handlePageChange = page => {
    setPage(page) // by setting new page number, this whole component is re-run and useSWR will fetch new data with new page number
  }
  const { data, error, isValidating } = useSWR(`/api/v1/students?page=${page}`, fetcher)
  if (error) {
    console.log(error)
  }

  function returnFilterValues (column) {
    const records = []
    const usedValues = []

    data?.students.forEach(student => {
      const filterBy = student.school.name
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
      render: (_, Student) => (
        <div className="table-functions">
          <Edit fields={Student} page={page} classes={classes} schools={schools} />
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
    <Search
      placeholder="Disabled for now..."
      allowClear
      enterButton="Search"
      size="large"
      disabled={true}
    />
    <Add page={page} classes={classes} schools={schools} />
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
