import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
  desc?: string;
  keywords?: string;
  ogTitle?: string;
  ogDesc?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: string;
}

const SEO = ({
  title,
  desc,
  keywords,
  ogTitle,
  ogDesc,
  ogUrl,
  ogImage,
  ogType,
}: Props) => {
  const { wp } = useStaticQuery(
    graphql`
      query {
        wp {
          generalSettings {
            title
            description
          }
        }
      }
    `
  );

  return (
    <Helmet>
      <title>{title || wp.generalSettings?.title}</title>
      <meta
        name="description"
        content={desc || wp.generalSettings?.description}
      />
      <meta name="keywords" content={keywords} />
      <meta
        property="og:title"
        content={ogTitle || title || wp.generalSettings?.title}
      />
      <meta
        property="og:description"
        content={ogDesc || desc || wp.generalSettings?.description}
      />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogType && <meta property="og:type" content={ogType} />}
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content="WeedWeek" />
    </Helmet>
  );
};

export default SEO;
