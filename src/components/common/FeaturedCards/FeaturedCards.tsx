import { FC } from "react";
import { HeaderMenu }  from 'decentraland-ui/dist/components/HeaderMenu/HeaderMenu';
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import clsx from 'clsx';
import './FeaturedCards.scss';
import Typography from "../Typography/Typography";
import { CardProps } from "../Card/Card";

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
            <Button basic size="small">
              {action}
              <Icon name="chevron right" />
            </Button>
          </HeaderMenu.Right>
        </HeaderMenu>
    </div>
   );
}
 
export default FeaturedCards;