import React, { FC, Fragment } from 'react';

// UI Decentraland
import { Page } from 'decentraland-ui/dist/components/Page/Page'

import './Openings.scss';
import ListCard from '../../components/common/ListCards/ListCard';

const Openings:FC = () => {
  return ( 
    <Fragment>
      <Page>
        <ListCard />
      </Page>
    </Fragment>
  );
}
 
export default Openings;