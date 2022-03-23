import React, { useState } from "react"
import Head from "next/head"
import Nav from "../../components/navigation"
import Add from "../../components/add/schoolAdd"
import Edit from "../../components/edit/schoolEdit"
import styles from "../../styles/Manage.module.css"
import { Input, Table, Space, Select, Popconfirm, Button } from "antd"
import useSWR, { useSWRConfig } from "swr"

function handleChange (value) {
  console.log(`selected ${value}`)
}

const { Search } = Input
const { Option } = Select

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
    return <div>failed to load</div>
  }

  function handleDelete (id) {
    fetch("/api/v1/schools/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Delete school response: ", json)
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
        <Space size="middle">
          <Edit fields={School} page={page}></Edit>
          <Popconfirm title="Are you sure you want to delete this school?"
                onConfirm={() => handleDelete(_.id)}
                okText="Yes" cancelText="No">
            <Button color="red" type="link" icon="Delete"/>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      <div className={styles.body}>
        <Head>
          <title>Manage Schools</title>
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

        <Table
        loading={isValidating}
        columns={columns}
        pagination={{ position: ["bottomCenter"], current: page, total: data?.totalCount || 0, onChange: handlePageChange }}
        rowKey="id"
        dataSource={data?.schools || []}
        />

        <div style={{ float: "right" }}>
        <Add page={page}></Add>
        </div>
      </div>
    </>
  )
}
