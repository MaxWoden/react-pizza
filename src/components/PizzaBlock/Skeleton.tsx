import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block">
    <circle cx="134" cy="134" r="125" />
    <rect x="0" y="279" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="75" />
    <rect x="0" y="425" rx="10" ry="10" width="95" height="30" />
    <rect x="128" y="418" rx="30" ry="30" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
