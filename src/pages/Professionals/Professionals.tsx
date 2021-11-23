import React, { FC, Fragment } from 'react';

// Files
import './Professionals.scss';
import dataProfessionals from '../../data/professionals.json'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { openings3D } from '../../assets/illustrations';

// UI Custom Component
import CardList from '../../components/common/CardList/CardList';
import Tabs from '../../components/common/Tabs/Tabs';
import Hero from '../../components/common/Hero/Hero';

const Professionals:FC = () => {
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
        <Hero
          imgSrc={openings3D}
          title={t("The latest opportunities from projects and employers in the metaverse")}
          description={t("Choose your field of interest, search by date and relevance or simply scroll down to see all the jobs on offer.")}
          to="/openings"
          buttonText="post a job"
          />
        <CardList data={dataProfessionals} />
      </div>
    </Fragment>
  );
}
 
export default Professionals;