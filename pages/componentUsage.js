import React, { Component } from "react"
import NavbarAdmin from "../components/navbar.js"
import ClassEditAdd from "../components/managing/ClassEditAdd.js"

class componentUsage extends Component {
  render () {
    return (
      <div>
        <NavbarAdmin />
        <ClassEditAdd></ClassEditAdd>
      </div>
    )
  }
}

export default componentUsage
