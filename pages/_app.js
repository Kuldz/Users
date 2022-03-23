import PropTypes from "prop-types"
import React from "react"
import "antd/dist/antd.variable.min.css"
import "../styles/global.css"
import { SessionProvider } from "next-auth/react"

export default function MyApp ({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}

MyApp.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType
}
