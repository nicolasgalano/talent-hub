import { FC } from "react";
import Typography from "../Typography/Typography";
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { Link } from "react-router-dom";
import "./Card.scss";
import moment from "moment";

export interface CardProps {
  title: string;
  img?: string;
  company?: string;
  description: string;
  date?: string;
  profession?: string;
  to?: string;
}
 
const Card: FC<CardProps> = ({img, title, company, description, date, profession, to}) => {
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
            <Typography element="h3" variant="body-xl" className="title">{title}</Typography>
            { company && <Typography element="h4" variant="body-m" className="subtitle">{company}</Typography> }
            { profession && <Typography element="h4" variant="body-m" className="subtitle">{profession}</Typography> } 
          </div>
        </div>
        <div className="body">
          <Typography element="p" variant="body-m" className="description">{description}</Typography>
        </div>
        <div className={(!profession) ? 'footer jobs' : 'footer professionals'}>
          {
            (!profession ) ?
              <>
                <Typography element="span" variant="body-s" className="date">{ moment(date).fromNow()}</Typography>
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