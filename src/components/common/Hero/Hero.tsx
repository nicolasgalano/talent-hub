import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import { namespaces } from '../../../i18n/i18n.constants';
import Typography from '../Typography/Typography';

import './Hero.scss';

interface HeroProps {
  imgSrc: string;
  title: string;
  description: string;
  to: string;
  buttonText: string;
}

const Hero: FC<HeroProps> = ({ imgSrc, title, description, to, buttonText }) => {
  const { t } = useTranslation(namespaces.common);

  return (

    <div className="heroContent">
      <div className="info">
        <Typography variant="heading-s" element="h4" className="title">{title}</Typography>
        <Typography variant="body-xl" element="p" className="description">{description}</Typography>
        <Button primary size="large">
          {buttonText}
        </Button>
      </div>
      <div className="illustration">
        <img src={imgSrc} alt={title} />
      </div>
    </div>

  );
}

export default Hero;