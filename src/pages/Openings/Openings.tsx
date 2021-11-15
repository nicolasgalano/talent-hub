import React, { FC, Fragment } from 'react';

// UI Decentraland
import { Page } from 'decentraland-ui/dist/components/Page/Page'

// Files
import './Openings.scss';
import dataJobs from '../../data/jobs.json'

// UI Custom Component
import CardList from '../../components/common/CardList/CardList';

const Openings:FC = () => {
  return ( 
    <Fragment>
      <Page>
        <CardList data={dataJobs} />
      </Page>
    </Fragment>
  );
}
 
export default Openings;