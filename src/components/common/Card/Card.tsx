import { FC } from "react";
import Typography from "../Typography/Typography";
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { Link } from "react-router-dom";

export interface CardProps {
  img: string;
  title: string;
  subtitle: string;
  description: string;
  date?: string;
  location?: string;
  to: string;
}
 
const Card: FC<CardProps> = ({img, title, subtitle, description, date, location, to}) => {
  return (
    <Link to={to}>
      <div className="card-container">
        <div className="header">
          <img src={img} alt={`img ${title}`} />
          <div className="txt">
            <Typography element="h3" variant="body1" className="title">{title}</Typography>
            <Typography element="h4" variant="body3" className="subtitle">{subtitle}</Typography>
          </div>
        </div>
        <div className="body">
          <Typography element="p" variant="body3" className="description">{description}</Typography>
        </div>
        <div className={'footer ' + (date && location) ? 'jobs' : 'professionals'}>
          {
            (date && location) ?
              <>
                <Typography element="span" variant="body4" className="date">{date}</Typography>
                <Typography element="span" variant="body4" className="location">{location}</Typography>
              </>
              :
              <Button basic size="small">
                View Profile
                <Icon name="chevron right" />
              </Button>
          }
        </div>
      </div>
    </Link>
   );
}
 
export default Card;