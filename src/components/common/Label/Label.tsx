import { FC } from 'react';
import clsx from 'clsx';

// Custom components
import Typography, { Variant } from '../Typography/Typography';

// Files
import './Label.scss';

interface LabelProps {
  children: React.ReactNode;
  type: 'filter' | 'review' | 'form';
  className?: string;
  required?: boolean;
  [x:string]: any; // with this, "...rest" working property
}

type variantsMappingType = {
  form: Variant,
  review: Variant,
  filter: Variant,
}

const variantsMapping: variantsMappingType = {
  form: "body-l",
  review: "body-s",
  filter: "label",
};

const Label:FC<LabelProps> = ({children, type, className, required, ...rest}) => {
  const variant = variantsMapping[type];
  
  return(
    <Typography 
      variant={variant}
      element="label"
      className={clsx('label-component', `label-component-${type}`, className)}
      {...rest} >
        {children}
        { required && <span className="required">*</span>}
    </Typography>
  );
}
export default Label;