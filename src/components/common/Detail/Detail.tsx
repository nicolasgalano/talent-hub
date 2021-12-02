import React, { FC } from 'react'

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button'

// Files
import './Detail.scss';
import { arrowLeft } from '../../../assets/icons';
import { useHistory } from 'react-router';

interface DetailProps {
  children: React.ReactNode;
  btnText: string;
  applyCallback?: Function;
}

const Detail: FC <DetailProps> = ({children, applyCallback, btnText}) => {
  const history = useHistory();

  const handleClickBack = () => history.goBack(); 

  const handleClickApply = () => applyCallback;

  return (
    <div className="ui container" id="detail">
      {/* Button go back */}
      <div className="back">
        <Button basic onClick={() => handleClickBack()}>
          <img src={arrowLeft} alt="icon arrow left" />
          Back
        </Button>
      </div>
      {/* Content */}
      { children }
      {/* Actions */}
      <div className="cta">
        <Button primary onClick={() => handleClickApply()}>{btnText}</Button>
      </div>
    </div>
  )
}
export default Detail