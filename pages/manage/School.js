import React from "react"
import Head from "next/head"
import NavbarAdmin from "../../components/navbar"
import SchoolEditAdd from "../../components/managing/SchoolEditAdd"
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
    title: "Registry Code",
    dataIndex: "regcode",
    key: "regcode"
  },
  {
    title: "School",
    dataIndex: "school",
    key: "school"
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
    regcode: "70003974",
    school: "Tallinn Polytechnic School",
    type: "Vocational School",
    county: "Harjumaa",
    city: "Tallinn"
  },
  {
    regcode: "70004092",
    school: "Tallinn Art School",
    type: "Vocational School",
    county: "Tartumaa",
    city: "Tartu"
  },
  {
    regcode: "70003744",
    school: "Kuressaare Vocational School",
    type: "Vocational School",
    county: "Saaremaa",
    city: "Kuressaare"
  }
]

export default function manageSchool () {
  return (
    <body>
      <div className={styles.body}>
        <Head>
          <title>Manage Schools</title>
        </Head>
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
        <SchoolEditAdd></SchoolEditAdd>
        </div>

        <div className={styles.pagination}>
          <Pag></Pag>
        </div>
      </div>
    </body>
  )
}
