import * as React from 'react';
import classNames from 'classnames';

import s from './Typography.module.css'

export interface ITypography {
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'xl' | 'l' | 'm' | 's' | 'xs';
  children?: React.ReactNode;
  className?: string;
}

const defineTag = (size: ITypography['size']) => {
  switch (size) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
      return size;
    default:
      return 'p';
  }
}

export const Typography: React.FC<ITypography> = ({ size = 'm', children, className, ...otherProps }) => {

  // Define tag
  const Tag: keyof JSX.IntrinsicElements = defineTag(size);

  // Apply styles

  return <Tag children={children} className={classNames(className, (s as unknown as Record<ITypography['size'],string>)[size])} {...otherProps} />;
}
