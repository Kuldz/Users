import { Pagination } from "antd"
import React from "react"

export default function Pag (props) {
  props.state = {
    current: 3
  }

  props.onChange = page => {
    console.log(page)
    props.setState({
      current: page
    })
  }
  return <Pagination current={props.state.current} onChange={props.onChange} total={50} />
}
