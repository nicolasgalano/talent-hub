import { FC } from 'react';

// Dependence
import { Link } from 'react-router-dom';

// Files
import './Hero.scss';

// UI Custom Component
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Typography from '../Typography/Typography';


interface HeroProps {
  imgSrc: string;
  title: string;
  description: string;
  to: string;
  buttonText: string;
}

const Hero: FC<HeroProps> = ({ imgSrc, title, description, to, buttonText }) => {

  return (

    <div className="heroContent">
      <div className="info">
        <Typography variant="heading-s" element="h4" className="title">{title}</Typography>
        <Typography variant="body-xl" element="p" className="description">{description}</Typography>
        {
          to && 
            <Link to={to}>
              <Button primary size="large">
                {buttonText}
              </Button>
            </Link>
        }
      </div>
      <div className="illustration">
        <img src={imgSrc} alt={title} />
      </div>
    </div>

  );
}

export default Hero;