import * as React from 'react';
import classNames from 'classnames';

import s from './Typography.module.css'

export interface ITypography {
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's1' | 's2' | 'b1' | 'b2' | 'c1' | 'c2' | 'button' | 'overline';
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
}

const defineTag = (size: ITypography['size'], inline?: boolean) => {
  // Inline always returns span tag
  if (inline === true) {
    return 'span'
  }

  switch (size) {
    // Non-inline should return heading tag
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return size;
    // ... or paragraph
    default:
      return 'p';
  }
}

export const Typography: React.FC<ITypography> = ({ size = 'b1', children, className, inline, ...otherProps }) => {

  // Define tag
  const Tag: keyof JSX.IntrinsicElements = defineTag(size, inline);

  // Apply styles

  return <Tag children={children} className={classNames(className, (s as unknown as Record<ITypography['size'],string>)[size])} {...otherProps} />;
}
