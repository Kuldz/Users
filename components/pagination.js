import { Pagination, Table } from "antd"
import React, { useState } from "react"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function DataList (props) {
  const [page, setPage] = useState(1)
  const { data, error, loading } = useSWR("/api/v1/" + props.page + "/?page=" + page, fetcher)
  if (error) {
    console.log(error)
    return <div>failed to load</div>
  }
  if (!data) return <div>loading...</div>

  const handlePageChange = page => {
    setPage(page) // by setting new page number, this whole component is re-run and useSWR will fetch new data with new page number
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (<div>
    <Pagination current={page} onChange={handlePageChange } total={data.totalCount} />
    <Table data={data["props.page"]} />
  </div>)
}
