import { FC } from 'react';
import Typography from '../Typography/Typography';
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'

import './HeroPost.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface HeroProps {
  imgSrc?: string;
  title: string;
  description: string;
  buttonText: string,
  buttonLink: string;
}

const HeroPost: FC<HeroProps> = ({ imgSrc, title, description, buttonText, buttonLink }) => {

  return (
    <div className={clsx('gridContent', {'withoutImg': !imgSrc})}>
      <div className="ui container">
        <div className="heroPost">
          <div className="info">
            <Link to={buttonLink}>
              <Button basic size="small">
                <Icon name="chevron left" />
                {buttonText}
              </Button>
            </Link>
            <Typography variant="heading-s" element="h4" className="title">{title}</Typography>
            <Typography variant="body-xl" element="p" className="description">{description}</Typography>
          </div>
          {
            imgSrc &&
              <div className="illustration">
                <img src={imgSrc} alt={title} />
              </div>
          }
        </div>
      </div>
    </div>
  );
}

export default HeroPost;