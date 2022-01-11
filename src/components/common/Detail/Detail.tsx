import React, { FC } from 'react'

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button'

// Files
import './Detail.scss';
import { arrowLeft } from '../../../assets/icons';
import { Link, useHistory } from 'react-router-dom';

interface DetailProps {
  children: React.ReactNode;
  urlParent: string;
  btnText: string;
  btnLink?: string;
  onClickAction?: Function;
}

const Detail: FC <DetailProps> = ({children, urlParent, btnText, btnLink, onClickAction}) => {

  const handleClickAction = () => onClickAction();

  const history = useHistory();

  return (
    <div className="ui container" id="detail">
      {/* Button go back */}
      <div className="back">
        {
          // validate if exist url to go back
          history.action !== 'POP' ?
          <Button basic onClick={() => history.goBack()}>
            <img src={arrowLeft} alt="icon arrow left" />
            Back
          </Button> 
          :
          <Link to={urlParent}>
            <Button basic>
              <img src={arrowLeft} alt="icon arrow left" />
              Back
            </Button>
          </Link>
        }
      </div>
      {/* Content */}
      { children }
      {/* Actions */}
      <div className="cta">
        { onClickAction && <Button primary onClick={() => handleClickAction()}>{btnText}</Button> }
        {
          btnLink &&
            <Link to={btnLink}>
              <Button primary>{btnText}</Button>
            </Link>
        }
      </div>
    </div>
  )
}
export default Detail