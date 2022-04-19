import React, { useState } from "react"
import Head from "next/head"
import Nav from "../../components/navigation"
import Add from "../../components/add/classAdd"
import Edit from "../../components/edit/classEdit"
import AddTeacher from "../../components/add/teacherAdd"
import { Input, Table, Select, Popconfirm } from "antd"
import useSWR, { useSWRConfig } from "swr"

function handleChange (value) {
  console.log(`selected ${value}`)
}

const { Search } = Input
const { Option } = Select

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ManageClass () {
  const { mutate } = useSWRConfig()
  const [page, setPage] = useState(1)
  const [teachers, setTeachers] = useState([])
  const [schools, setSchools] = useState([])

  useEffect(() => {
    fetch("/api/v1/teachers").then(res => res.json()).then(data =>
      setTeachers(data.teachers.map(teacher => ({
        label: `${teacher.firstName + " " + teacher.lastName}`,
        value: teacher.id
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

  const { data, error, isValidating } = useSWR(`/api/v1/classes?page=${page}`, fetcher)
  if (error) {
    console.log(error)
  }
  function handleDelete (id) {
    fetch("/api/v1/classes/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Delete class response: ", json)
        mutate(`/api/v1/classes?page=${page}`)
      })
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
      title: "Teacher",
      dataIndex: ["teacher", "lastName"],
      key: "teacher.lastName",
      filters: returnFilterValues(),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.teacher.name === value,
      width: "30%"
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
        <div className="table-functions">
          <Edit fields={Class} isPUT page={page} teachers={teachers} schools={schools} />
          <Popconfirm title="Are you sure you want to delete this Class?"
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
      <title>Manage Classes</title>
    </Head>
    <Nav />
    <Search
        placeholder="Disabled for now..."
        allowClear
        enterButton="Search"
        size="large"
        disabled={true}
      />
    <Add page={page} teachers={teachers} schools={schools} />
    <Table
      loading={isValidating}
      columns={columns}
      pagination={{ position: ["bottomCenter"], current: page, total: data?.totalCount || 0, onChange: handlePageChange }}
      dataSource={data?.classes || []}
      rowKey="id"
      onHeaderRow={(columns, index) => {
        return {
          onClick: () => {}
          /*
          https://ant.design/components/table/#onRow-usage
          teacher header click stuff thingie whatever
          */
        }
      }}
    />
    </>
  )
}
