import React, { FC, Fragment, useEffect, useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {queryParse, queryStringify} from '../../utils/queryString';
import { debounce } from '../../utils/debounce';
// Files
import './Professionals.scss';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { professionals3D } from '../../assets/illustrations';

// UI Custom Component
import CardList from '../../components/common/CardList/CardListTest';
import Tabs from '../../components/common/Tabs/Tabs';
import Hero from '../../components/common/Hero/Hero';

// redux
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks';
import { getAllProfessionals } from '../../redux/slices/professionalsSlices';

interface QueryInterface {
  PositionOffered_contains: string;
  WorkingSchedule: string;
  TypeOfContract: string;
  Fields: string;
  ExperienceFrom_gte?: number;
  ExperienceTo_lte?: number;
  _start: number;
  _limit: number;
  _sort: string;
}

const RESULTS_PER_PAGE = 6;
const EXPERIENCE_FROM = 0;
const EXPERIENCE_TO = 10;

const Professionals:FC = () => {
  const { t } = useTranslation([namespaces.common, namespaces.pages.professionals]);
  const searchParams = useLocation().search;
  const history = useHistory();

  // redux
  const {data, loading} = useAppSelector((state) => state.professionals.allProfessionals);
  const dispatch = useAppDispatch();


  const [queryStr, setQueryStr] = useState(null);
  const [queryObj, setQueryObj] = useState<QueryInterface>({
    PositionOffered_contains: '',
    WorkingSchedule: '',
    TypeOfContract: '',
    Fields: '',
    // ExperienceFrom_gte: EXPERIENCE_FROM,
    // ExperienceTo_lte: EXPERIENCE_TO,
    _start: 0,
    _limit: RESULTS_PER_PAGE,
    _sort: 'id:DESC'
  });


  const handleSearch = (param: string) => {
    let newQueryObj = {...queryObj};
    newQueryObj.PositionOffered_contains = param;

    newQueryObj._start = 0;
    newQueryObj._limit = RESULTS_PER_PAGE;

    // dispatch(setJobPage(1));

    setQueryObj({
      ...newQueryObj,
    });
  };

  const search = useCallback(debounce(handleSearch, 600), []);

  const handleOnFetch = (queryStr) => {
    console.log('handleOnFetch', queryStr);
    setQueryStr(queryStr);
  }


  useEffect(() => {
    if (queryStr !== null && queryStr) {
      console.log('Professionals dispatch:', queryStr);
      dispatch(getAllProfessionals(queryStr));
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
          placeholderSearch='Search professionals' />
      </div>
    </Fragment>
  );
}
 
export default Professionals;