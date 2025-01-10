import React from 'react';
import arrowSvg from '../../assets/img/arrow.svg';

interface ArrowProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  direction?: 'left' | 'right';
}

const ArrowIcon: React.FC<ArrowProps> = ({ direction = 'left', className = '', ...props }) => {
  const rotationClass = direction === 'right' ? 'rotate-180' : '';
  
  return (
    <img 
      src={arrowSvg}
      alt="Arrow"
      className={`inline-block ${rotationClass} ${className}`}
      {...props}
    />
  );
};

export default ArrowIcon;