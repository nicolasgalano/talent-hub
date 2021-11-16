import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'semantic-ui-react'
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import { subscriptionSuccess, subscriptionMailbox } from '../../../assets/illustrations';
import { namespaces } from '../../../i18n/i18n.constants';
import Typography from '../Typography/Typography';

import './SubscriptionBox.scss';

interface SubscriptionBoxProps {
  title: string;
  description: string;
  thankyou_title: string;
  thankyou_description: string;
  placeholder: string;
  buttonText: string;
}

interface Subscription {
  success: boolean;
}

const SubscriptionBox:FC<SubscriptionBoxProps> = ({title, description, thankyou_title, thankyou_description, placeholder, buttonText}) => {
  const { t } = useTranslation(namespaces.common);

  const [subscription, setSubscription] = useState<Subscription>({success: false});
  const onClick = () => setSubscription({ success: true });

  return (
    <div className={`subscription-box ${subscription.success ? 'subscription-success' : ''}`}>
      <div className="illustration">
        {!subscription.success && (
          <img src={subscriptionMailbox} alt={title} />
        )}
        {subscription.success && (
          <img src={subscriptionSuccess} alt={title} />
        )}
      </div>
      <div className="info">
        {!subscription.success && (
          <div className="info-cont">
            <Typography variant="heading-s" element="h3" className="title">{title}</Typography>
            <Typography variant="body-xl" element="p" className="description">{description}</Typography>
            <div className="form">
              <Input className="field" icon placeholder={placeholder}>
                <input className="body-s" />
              </Input>
              <Button primary size="large" onClick={onClick}>
                {buttonText}
              </Button>
            </div>
          </div>
        )}
        {subscription.success && (
          <div className="info-cont">
            <Typography variant="heading-s" element="h3" className="title">{thankyou_title}</Typography>
            <Typography variant="body-xl" element="p" className="description">{thankyou_description}</Typography>
          </div>
        )}
        
      </div>
    </div>
  );
}
 
export default SubscriptionBox;