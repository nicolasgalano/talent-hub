import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';
import Typography from '../Typography/Typography';
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { useHistory } from 'react-router';

import './HeroPost.scss';

interface HeroProps {
  imgSrc: string;
  title: string;
  description: string;
  buttonText: string,
}

const HeroPost: FC<HeroProps> = ({ imgSrc, title, description, buttonText }) => {
  const history = useHistory();

  const goBack = () => history.goBack();

  return (

    <div className="gridContent">
      <div className="ui container">
        <div className="heroContent">
          <div className="info">
            <Button basic size="small" onClick={() => goBack()}>
                <Icon name="chevron left" />
                {buttonText}
            </Button>
            <Typography variant="heading-s" element="h4" className="title">{title}</Typography>
            <Typography variant="body-xl" element="p" className="description">{description}</Typography>
          </div>
          <div className="illustration">
            <img src={imgSrc} alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPost;