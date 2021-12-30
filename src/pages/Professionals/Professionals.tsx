import React, { FC, Fragment, useEffect } from 'react';

// Files
import './Professionals.scss';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { professionals3D } from '../../assets/illustrations';

// UI Custom Component
import CardList from '../../components/common/CardList/CardList';
import Tabs from '../../components/common/Tabs/Tabs';
import Hero from '../../components/common/Hero/Hero';

// redux
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks';
import { getAllProfessionals } from '../../redux/slices/professionalsSlices';

const Professionals:FC = () => {
  const { t } = useTranslation([namespaces.common, namespaces.pages.professionals]);

  // redux
  const {data, loading} = useAppSelector((state) => state.professionals.allProfessionals);
  const dispatch = useAppDispatch();

  useEffect(() => {
    data.length === 0 && dispatch(getAllProfessionals('?_start=0&_limit=6&_sort=id:DESC'));
  }, [])

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
      title: t("tabs.create-profile"),
      to: '/professionals/create'
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
        <CardList 
          data={data} 
          loading={loading} 
          placeholderSearch='Search professionals' />
      </div>
    </Fragment>
  );
}
 
export default Professionals;