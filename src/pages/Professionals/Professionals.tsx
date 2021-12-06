import React, { FC, Fragment } from 'react';

// Files
import './Professionals.scss';
import dataProfessionals from '../../data/professionals.json'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { professionals3D } from '../../assets/illustrations';

// UI Custom Component
import CardList from '../../components/common/CardList/CardList';
import Tabs from '../../components/common/Tabs/Tabs';
import Hero from '../../components/common/Hero/Hero';

const Professionals:FC = () => {
  const { t } = useTranslation([namespaces.common, namespaces.pages.professionals]);

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
      to: '/openings/post-a-job'
    }
  };

  return ( 
    <Fragment>
      <Tabs dataTabs={dataTab} />
      <div className="ui container">
        <Hero
          imgSrc={professionals3D}
          title={t("hero.title", { ns: namespaces.pages.professionals})}
          description={t("hero.description", { ns: namespaces.pages.professionals})}
          to="/professionals/create"
          buttonText={t("hero.button", { ns: namespaces.pages.professionals})}
          />
        <CardList data={dataProfessionals} />
      </div>
    </Fragment>
  );
}
 
export default Professionals;