import React, { Component } from "react"
import NavbarAdmin from "../components/navbar.js"
import SchoolEditAdd from "../components/managing/SchoolEditAdd.js"

class componentUsage extends Component {
  render () {
    return (
      <div>
        <NavbarAdmin />
        <SchoolEditAdd></SchoolEditAdd>
      </div>
    )
  }
}

export default componentUsage
