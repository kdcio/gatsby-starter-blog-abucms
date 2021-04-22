import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allAbuCmsBlog.nodes
  const {intro, cover_image} = data.abuCmsHomePage
  const homeImage = getImage(cover_image)

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <h2>{intro}</h2>
        <GatsbyImage image={homeImage} alt="Home page" />
        <p>No blog posts found. Add blog content in your AbuCMS.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <h2>{intro}</h2>
      <GatsbyImage image={homeImage} alt="Home page" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.name || post.slug

          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    abuCmsHomePage {
      intro
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
    allAbuCmsBlog(sort: { fields: publish_date, order: DESC }) {
      nodes {
        publish_date(formatString: "MMM DD, YYYY")
        slug
        name
        excerpt
      }
    }
  }
`
