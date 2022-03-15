import React, { Component } from "react"
import Head from "next/head"
import Nav from "../components/nav"

class componentUsage extends Component {
  render () {
    return (
      <div>
        <Head>
          <title>Component Usage and Testing</title>
        </Head>
        <Nav />
      </div>
    )
  }
}

export default componentUsage
