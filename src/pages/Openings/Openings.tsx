import React, { FC, Fragment } from 'react';

// Files
import './Openings.scss';
import dataJobs from '../../data/jobs.json'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';

// UI Custom Component
import CardList from '../../components/common/CardList/CardList';
import Tabs from '../../components/common/Tabs/Tabs';
import HeroPost from '../../components/common/HeroPost/HeroPost';
import { Openings2 } from '../../assets/illustrations';

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
      <HeroPost 
      imgSrc={Openings2}
      title={ t("Post positions for modellers, developers, designers and more") }
      description={ t("Build a team from scratch or find the missing talent to power your project.") }
      to="/openings"
      />
      <div className="ui container">
        <CardList data={dataJobs} />
      </div>
    </Fragment>
  );
}
 
export default Openings;