import PropTypes from "prop-types"
import React from "react"
import "antd/dist/antd.css"

function MyApp ({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType
}

export default MyApp
