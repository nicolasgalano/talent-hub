import React, { FC, Fragment, useEffect } from 'react';

// Files
import './Openings.scss';
import dataJobs from '../../data/openings.json'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { openings3D } from '../../assets/illustrations';


// UI Custom Component
import CardList from '../../components/common/CardList/CardList';
import Tabs from '../../components/common/Tabs/Tabs';
import Hero from '../../components/common/Hero/Hero';

// redux
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks';
import { getAllJobs } from '../../redux/slices/jobsSlices';

const Openings: FC = () => {
  const { t } = useTranslation([namespaces.common, namespaces.pages.openings]);

  // redux
  const {data: jobs, loading: jobsLoading} = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    jobs.length !== 0 && dispatch(getAllJobs());
  }, [])

  useEffect(() => {
    console.log('fuera data: ', jobs);
    if(jobs.length !== 0){
      console.log('data: ', jobs);
    }
  }, [jobs])

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
          imgSrc={openings3D}
          title={t("hero.title", {ns: namespaces.pages.openings})}
          description={t("hero.description", {ns: namespaces.pages.openings})}
          to="/openings/post-a-job"
          buttonText={t("hero.button", {ns: namespaces.pages.openings})}
        />
        <CardList data={jobs} loading={jobsLoading}/>
      </div>
    </Fragment>
  );
}
 
export default Openings;