import React from 'react';
import PortfolioMenu from './portfoliomenu/page';

const Portfoliolayout = ({ children }) => {
  return (
    <div>
      <PortfolioMenu />
      {children}
    </div>
  );
};

export default Portfoliolayout;
