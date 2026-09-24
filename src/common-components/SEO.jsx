const SEO = ({ data }) => {
  return (
    <>
      <title>{data?.title}</title>
      <meta name="description" content={data?.description} />
      <meta name="keywords" content={data?.keywords} />
      <meta property="og:title" content={data?.title} />
      <meta property="og:description" content={data?.description} />
      <link rel="canonical" href={data?.link} />
      <meta name="robots" content={data?.robots} />
    </>
  );
};

export default SEO;
