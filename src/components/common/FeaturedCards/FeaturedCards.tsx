import { FC } from "react";
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import clsx from 'clsx';
import './FeaturedCards.scss';
import Typography from "../Typography/Typography";
import Card, { CardProps } from "../Card/Card";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface FeaturedCardsProps {
  title: string;
  action: string;
  to?: string;
  data?: Array<CardProps>;
  className?: object | string;
}
 
const FeaturedCards: FC<FeaturedCardsProps> = ({title, action, to, data, className}) => {

  const settings = {
    slidesToShow: 1.5,
    infinite: false,
    touchThreshold: 20,
    responsive: [
      {
        breakpoint: 5000,
        settings: "unslick"
      },
      {
        // breakpoint: 1024,
        breakpoint: 1200,
        centerMode: false,
        variableWidth: true,
        settings: "slick"
      },
      {
        breakpoint: 641,
        settings: "unslick"
      }
    ]
  };

  return ( 
    <div className={clsx('featured-cards', className)}>
      <div className="featured-menu">
        <div className="title">
          <Typography element="h2" variant="heading-xs">{title}</Typography>
        </div>
        <div className="actions">
          <Link to={to}>
            <Button basic size="small">
              {action}
              <Icon name="chevron right" />
            </Button>
          </Link>
        </div>
      </div>
      <Slider className="slide-cards" {...settings}>
        { 
          data.map((job, index) => (
            <Card 
              title={job.title}
              img={job.img}
              company={job.company}
              description={job.description}
              date={job.date}
              location={job.location}
              to="#"
              key={`featured-card-${index}`} />
          ))
        }
      </Slider>
      <div className="view-all-mobile">
        <Link to={to}>
          <Button basic size="small">
            {action}
            <Icon name="chevron right" />
          </Button>
        </Link>
      </div>
    </div>
   );
}
 
export default FeaturedCards;