module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: {
      name: `Kyle Mathews`,
      summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "@kdcio/gatsby-source-abucms",
      options: {
        baseUrl: "https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com",
        apiBase: "prod", // deployment stage
        models: ["blog", "home_page"], // modelId
        apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allAbuCmsBlog } }) => {
              return allAbuCmsBlog.nodes.map(node => {
                return {
                  title: node.name,
                  description: node.excerpt,
                  date: node.publish_date,
                  url: site.siteMetadata.siteUrl + "/" + node.slug,
                  guid: site.siteMetadata.siteUrl + "/" + node.slug,
                  custom_elements: [{ "content:encoded": node.body.html }],
                }
              })
            },
            query: `
              {
                allAbuCmsBlog(
                  sort: { order: DESC, fields: publish_date },
                ) {
                  nodes {
                    name
                    excerpt
                    slug
                    publish_date
                    body {
                      html
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
