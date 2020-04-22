import React from 'react';
import { graphql } from 'gatsby';
import { Frontmatter } from '../types';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({
  data,
}: {
  data: { markdownRemark: { frontmatter: Frontmatter; html: string } };
}) => {
  const post = data.markdownRemark;
  console.log(data);
  const thumbnail = post.frontmatter.thumbnail?.childImageSharp?.sizes?.src;
  return (
    <Layout isArticle>
      <SEO imagePath={thumbnail} isBlogPost title={post.frontmatter.title} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <p className="text-sm font-semibold">{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        thumbnail {
          childImageSharp {
            sizes(maxWidth: 600) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`;