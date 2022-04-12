import React, { useState } from "react"
import Head from "next/head"
import Nav from "../../components/navigation"
import Add from "../../components/add/schoolAdd"
import Edit from "../../components/edit/schoolEdit"
import { Input, Table, Select, Popconfirm, notification } from "antd"
import useSWR, { useSWRConfig } from "swr"

const { Search } = Input

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ManageSchool () {
  const { mutate } = useSWRConfig()
  const [page, setPage] = useState(1)
  const handlePageChange = page => {
    setPage(page) // by setting new page number, this whole component is re-run and useSWR will fetch new data with new page number
  }
  const { data, error, isValidating } = useSWR(`/api/v1/schools?page=${page}`, fetcher)
  if (error) {
    console.log(error)
  }

  function handleDelete (id) {
    fetch("/api/v1/schools/" + id, {
      method: "DELETE"
    })
      .then(async function (res) {
        const json = await res.json().catch(() => {})
        console.log("Delete school response: ", json)
        if (res.status !== 200) {
          notification.error({
            placement: "bottomRight",
            bottom: 50,
            duration: 5,
            rtl: true,
            message: "Error deleting school",
            description: json.message
          })
        }
        mutate(`/api/v1/schools?page=${page}`)
      })
  }

  const columns = [
    {
      title: "Registry Code",
      dataIndex: "regCode",
      key: "regCode"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "County",
      dataIndex: "county",
      key: "county"
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city"
    },
    {
      title: "Action",
      key: "action",
      render: (_, School) => (
        <div className="table-functions">
          <Edit fields={School} page={page} />
          <Popconfirm title="Are you sure you want to delete this school?"
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
      <title>Manage Schools</title>
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
    <Select defaultValue="Year" size="large" onChange={handleChange}>
      <Option value="Year">Filter by</Option>
      <Option value="School Name">Filter by</Option>
      <Option value="Yiminghe">Filter by</Option>
    </Select>
    <Table
      loading={isValidating}
      columns={columns}
      pagination={{ position: ["bottomCenter"], current: page, total: data?.totalCount || 0, onChange: handlePageChange }}
      dataSource={data?.schools || []}
      rowKey="id"
    />
    </>
  )
}
