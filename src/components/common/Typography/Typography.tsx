import React, { FC } from "react";
import clsx from 'clsx';

import './Typography.scss';

export type Variant = 
  | 'heading-xl'
  | 'heading-l'
  | 'heading-m'
  | 'heading-s'
  | 'heading-xs'
  | 'heading-xxs'
  | 'body-xl'
  | 'body-l'
  | 'body-m'
  | 'body-s'
  | 'body-xs'
  | 'label';

type Element = 
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'label';

type Weight =
| '400'
| '500'
| '600'
| '700';

interface TypographyProps {
  variant: Variant;
  element: Element;
  weight?: Weight;
  className?: object | string;
  children: React.ReactNode;
  [x:string]: any; // with this, "...rest" working property
}

const Typography:FC<TypographyProps> = ({ variant, element, weight, children, className, ...rest }) => {

  const Component: Element = element ? element : 'p';
  const variantClass = variant ? variant : 'body-xl';

  return (
    <Component className={clsx(variantClass, className, {
      ['fw-' + weight]: weight
    })}
    {...rest}>
      {children}
    </Component>
  );  
}

export default Typography;