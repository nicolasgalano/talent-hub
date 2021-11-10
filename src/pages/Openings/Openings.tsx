import React, { FC, Fragment } from 'react';

import { Page } from 'decentraland-ui/dist/components/Page/Page'

import Typography from '../../components/common/Typography/Typography';
import './Openings.scss';

const Openings:FC = () => {
  return ( 
    <Fragment>
      <Page>
        <Typography variant="h6" element="h3" weight="400" className="description">Openings</Typography>
      </Page>
    </Fragment>
  );
}
 
export default Openings;