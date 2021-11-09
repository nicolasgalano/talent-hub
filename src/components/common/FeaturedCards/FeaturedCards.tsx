import { FC } from "react";
import { HeaderMenu }  from 'decentraland-ui/dist/components/HeaderMenu/HeaderMenu';
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import clsx from 'clsx';
import './FeaturedCards.scss';
import Typography from "../Typography/Typography";
import Card, { CardProps } from "../Card/Card";
import { Link } from "react-router-dom";

interface FeaturedCardsProps {
  title: string;
  action: string;
  to?: string;
  data?: Array<CardProps>;
  className?: object | string;
}
 
const FeaturedCards: FC<FeaturedCardsProps> = ({title, action, to, data, className}) => {


  return ( 
    <div className={clsx(className)}>
      <HeaderMenu>
          <HeaderMenu.Left>
            <Typography element="h2" variant="h5">{title}</Typography>
          </HeaderMenu.Left>
          <HeaderMenu.Right>
            <Link to={to}>
              <Button basic size="small">
                {action}
                <Icon name="chevron right" />
              </Button>
            </Link>
          </HeaderMenu.Right>
        </HeaderMenu>
        <div className="featuredCards">
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
        </div>
    </div>
   );
}
 
export default FeaturedCards;