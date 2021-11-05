import { FC } from "react";
import clsx from 'clsx';

import './Typography.scss';

type Variant = 
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5'
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
}

const Typography:FC<TypographyProps> = ({ variant, element, weight, children, className }) => {

  const Component: Element = element ? element : 'p';
  const variantClass = variant ? variantsMapping[variant] : 'body-xl';

  return (
    <Component className={clsx(variantClass, className, {
      ['fw-' + weight]: weight
    })}>
      {children}
    </Component>
  );  
}

export default Typography;