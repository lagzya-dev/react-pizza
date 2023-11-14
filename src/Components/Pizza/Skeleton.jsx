import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <div className="d-flex justify-center">
    <ContentLoader
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="2" y="308" rx="10" ry="10" width="280" height="23" />
      <circle cx="140" cy="140" r="140" />
      <rect x="0" y="346" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="455" rx="10" ry="10" width="95" height="30" />
      <rect x="138" y="450" rx="22" ry="22" width="143" height="45" />
    </ContentLoader>
  </div>
);

export default Skeleton;
