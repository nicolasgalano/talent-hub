import { FC } from 'react';
import clsx from 'clsx';

// Custom components
import Typography from '../Typography/Typography';

// Files
import './Label.scss';

interface LabelProps {
  children: React.ReactNode;
  type: 'filter' | 'review' | 'form';
  className?: string;
}

const Label:FC<LabelProps> = ({children, type, className}) => {
  return(
    <Typography 
      variant="label"
      element="h6"
      className={clsx(`label-${type}`, className)} >
        {children}
    </Typography>
  );
}
export default Label;