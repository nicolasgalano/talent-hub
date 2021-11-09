import { FC } from "react";
import Typography from "../Typography/Typography";
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { Link } from "react-router-dom";
import "./Card.scss";
import { location as locationIcon } from "../../../assets/icons";

export interface CardProps {
  title: string;
  img?: string;
  company?: string;
  description: string;
  date?: string;
  location?: string;
  to?: string;
}
 
const Card: FC<CardProps> = ({img, title, company, description, date, location, to}) => {
  return (
    <div className="card">
      <Link to={to}>
        <div className="header">
          { img && 
            <div className="image">
              <img src={img} alt={`img ${title}`} />
            </div>
          }
          <div className="txt">
            <Typography element="h3" variant="body1" className="title">{title}</Typography>
            {
              company ?
                <Typography element="h4" variant="body3" className="subtitle">{company}</Typography> :
                <Typography element="h4" variant="body3" className="subtitle">{location}</Typography>
            }
          </div>
        </div>
        <div className="body">
          <Typography element="p" variant="body3" className="description">{description}</Typography>
        </div>
        <div className={(date && location) ? 'footer jobs' : 'footer professionals'}>
          {
            (date && location) ?
              <>
                <Typography element="span" variant="body4" className="date">{date}</Typography>
                <Typography element="span" variant="body4" className="location">
                  <img src={locationIcon} alt="location icon" />
                  <span>{location}</span>
                </Typography>
              </>
              :
              <Button basic size="small">
                View Profile
                <Icon name="chevron right" />
              </Button>
          }
        </div>
      </Link>
    </div>
   );
}
 
export default Card;