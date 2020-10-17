/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const [height, setHeight] = React.useState(0)
  const [width, setWidth] = React.useState(0)
  const updateWindowDimentsions = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }
  React.useEffect(() => {
    updateWindowDimentsions()
    window.addEventListener('resize', updateWindowDimentsions)
    return () => {
      window.removeEventListener('resize', updateWindowDimentsions)
    }
  })
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: width,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer style={{
          marginTop: `2rem`
        }}>
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://www.github.com/JohnnyHandy">JohnnyHandy</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
