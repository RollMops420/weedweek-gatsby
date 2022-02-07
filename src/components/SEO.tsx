import Head from 'next/head'

interface Props {
  title: string,
  desc?: string,
  keywords?: string,
  ogTitle?: string,
  ogDesc?: string,
  ogUrl?: string,
  ogImage?: string,
  ogType?: string
}

const SEO = ({ title, desc, keywords, ogTitle, ogDesc, ogUrl, ogImage, ogType }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDesc || desc} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogType && <meta property="og:type" content={ogType} />}
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content="WeedWeek" />
    </Head>
  )
}

export default SEO