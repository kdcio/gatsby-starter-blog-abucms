import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.abuCmsBlog
  const image = getImage(post.cover_image)
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.name} description={post.excerpt || post.excerpt} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.name}</h1>
          <p>{post.publish_date}</p>
        </header>
        <div style={{ textAlign: "center", margin: "20px 10px" }}>
          <GatsbyImage image={image} alt={post.name} />
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post.body.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.slug}`} rel="prev">
                ← {previous.name}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.slug}`} rel="next">
                {next.name} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    abuCmsBlog(id: { eq: $id }) {
      id
      excerpt
      body {
        html
      }
      name
      publish_date(formatString: "MMM DD, YYYY")
      cover_image {
        childImageSharp {
          gatsbyImageData(
            width: 600
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    previous: abuCmsBlog(id: { eq: $previousPostId }) {
      slug
      name
    }
    next: abuCmsBlog(id: { eq: $nextPostId }) {
      slug
      name
    }
  }
`
