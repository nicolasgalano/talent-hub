import React, { FC, Fragment } from 'react';

// UI Decentraland
import { Page } from 'decentraland-ui/dist/components/Page/Page'

import './Openings.scss';
import CardList from '../../components/common/CardList/CardList';

const Openings:FC = () => {
  return ( 
    <Fragment>
      <Page>
        <CardList />
      </Page>
    </Fragment>
  );
}
 
export default Openings;