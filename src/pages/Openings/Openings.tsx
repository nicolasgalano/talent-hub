import React, { FC, Fragment } from 'react';

// Files
import './Openings.scss';
import dataJobs from '../../data/jobs.json'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';

// UI Custom Component
import CardList from '../../components/common/CardList/CardList';
import Tabs from '../../components/common/Tabs/Tabs';

const Openings:FC = () => {
  const { t } = useTranslation(namespaces.common);

  const dataTab = {
    options: [
      {
        title: t("tabs.openings"),
        to: '/openings'
      },
      {
        title: t("tabs.professionals"),
        to: '/professionals'
      },
    ],
    cta: {
      title: t("tabs.post-a-job"),
      to: '/'
    }
  };

  return ( 
    <Fragment>
      <Tabs dataTabs={dataTab} />
      <div className="ui container">
        <CardList data={dataJobs} />
      </div>
    </Fragment>
  );
}
 
export default Openings;