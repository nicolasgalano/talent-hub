import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'semantic-ui-react'
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
        <div className="info-cont">
          <Typography variant="h4" element="h3" className="title">{title}</Typography>
          <Typography variant="body1" element="p" className="description">{description}</Typography>
          <div className="form">
            <Input className="field" icon placeholder='mail@domain.com'>
              <input />
            </Input>
            <Button primary size="large">
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default SubscriptionBox;