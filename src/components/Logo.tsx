import React, { FC } from 'react';
import PropTypes from 'prop-types';

interface ILogoProps {
  width?: number;
  height?: number;
}

const Logo: FC<ILogoProps> = ({ width, height }) => {
  return (
	<div>
	<img 
	  src="/logo152.png" 
	  alt="Logo" 
	  width={width} 
	  height={height} 
	  style={{ maxWidth: '50%', height: 'auto', marginTop: '10%' }}
	/>
  </div>
  );
};

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Logo.defaultProps = {
  width: 2155,
  height: 854,
};

export default Logo;