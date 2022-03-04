import React, { Component } from "react"
import Head from 'next/head';
import NavbarAdmin from "../components/navbar.js"
import SchoolEditAdd from "../components/managing/SchoolEditAdd.js"

class componentUsage extends Component {
  render () {
    return (
      <div>
        <Head>
          <title>Component Usage and Testing</title>
        </Head>
        <NavbarAdmin />
        <SchoolEditAdd></SchoolEditAdd>
      </div>
    )
  }
}

export default componentUsage
