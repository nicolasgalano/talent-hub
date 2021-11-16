import React, { FC } from "react";
import clsx from 'clsx';

import './Typography.scss';

type Variant = 
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

//DEPRECATED
const variantsMapping = {
  h1: "heading-xl",
  h2: "heading-l",
  h3: "heading-m",
  h4: "heading-s",
  h5: "heading-xs",
  h6: "heading-xxs",
  body1: "body-xl",
  body2: "body-l",
  body3: "body-m",
  body4: "body-s",
  body5: "body-xs",
  label: "label",
};

interface TypographyProps {
  variant: Variant;
  element: Element;
  weight?: Weight;
  className?: object | string;
  children: React.ReactNode;
}

const Typography:FC<TypographyProps> = ({ variant, element, weight, children, className }) => {

  const Component: Element = element ? element : 'p';
  const variantClass = variant ? variant : 'body-xl';

  return (
    <Component className={clsx(variantClass, className, {
      ['fw-' + weight]: weight
    })}>
      {children}
    </Component>
  );  
}

export default Typography;