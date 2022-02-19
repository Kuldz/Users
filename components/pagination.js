import { Pagination } from "antd"
import React from "react"

class Pag extends React.Component {
  state = {
    current: 3
  };

  onChange = page => {
    console.log(page)
    this.setState({
      current: page
    })
  };

  render () {
    return <Pagination current={this.state.current} onChange={this.onChange} total={50} />
  }
}

export default Pag
