import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'decentraland-ui/dist/components/Button/Button';
import { namespaces } from '../../../i18n/i18n.constants';
import Typography from '../Typography/Typography';

import './SubscriptionBox.scss';

interface SubscriptionBoxProps {
  imgSrc: string;
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
}

const SubscriptionBox:FC<SubscriptionBoxProps> = ({imgSrc, title, description, placeholder, buttonText}) => {
  const { t } = useTranslation(namespaces.common);

  return (
    <div className="subscription-box">
        <div className="illustration">
          <img src={imgSrc} alt={title} />
        </div>
        <div className="info">
          <Typography variant="h6" element="h4" className="title">{title}</Typography>
          <Typography variant="body2" element="p" className="description">{description}</Typography>
          <Button primary size="large">
            {buttonText}
          </Button>
        </div>
    </div>
  );
}
 
export default SubscriptionBox;