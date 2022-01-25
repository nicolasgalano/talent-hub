import React, { FC, Fragment, useEffect, useCallback, useState } from 'react';

// Files
import './Professionals.scss';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { professionals3D } from '../../assets/illustrations';

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// UI Custom Component
import CardList from '../../components/common/CardList/CardListWithFilters';
import Tabs from '../../components/common/Tabs/Tabs';
import Hero from '../../components/common/Hero/Hero';

// redux
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks';
import { getAllProfessionals, getCountAllProfessionals, setProfessionalsPage } from '../../redux/slices/professionalsSlices';


const Professionals:FC = () => {
  const { t } = useTranslation([namespaces.common, namespaces.pages.professionals]);

  // redux
  const {data, loading, page} = useAppSelector((state) => state.professionals.allProfessionals);
  const countProfessionals = useAppSelector((state) => state.professionals.allProfessionals.count);
  const dispatch = useAppDispatch();

  const [queryStr, setQueryStr] = useState(null);
  const [queryCountStr, setQueryCountStr] = useState(null);

  const handleOnFetch = (queryStr, queryCountStr) => {
    console.log('handleOnFetch', queryStr);
    setQueryStr(queryStr);
    setQueryCountStr(queryCountStr);
  }

  const loadMoreClicked = (ev) => {
    dispatch(setProfessionalsPage(page + 1));
  };

  const resetPage = () => {
    dispatch(setProfessionalsPage(1));
  };

  useEffect(() => {
    if (queryStr !== null && queryStr) {
      console.log('Professionals dispatch:', queryStr);
      dispatch(getAllProfessionals(queryStr));
      dispatch(getCountAllProfessionals(queryCountStr));
    }
  }, [queryStr]);

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
          type="professionals"
          handleOnFetch={handleOnFetch}
          defaultFiltersSelected={{field: [], schedule: [], contract: []}}
          onFilter={() => {}}
          resultsCount={countProfessionals}
          resetPage={resetPage}
          loadMoreClicked={loadMoreClicked}
          placeholderSearch='Search professionals' />
      </div>
    </Fragment>
  );
}
 
export default Professionals;