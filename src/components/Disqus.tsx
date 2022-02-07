import { DiscussionEmbed } from 'disqus-react';

const Disqus = ({ slug, id, title }: any) => {
  return (
    <DiscussionEmbed
      shortname="weedweek"
      config={{
        url: `https://weedweek.pl/${slug}`,
        identifier: id,
        title: title,
      }}
    />
  );
};

export default Disqus;
