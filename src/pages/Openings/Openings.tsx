import React, { FC, Fragment, useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {queryParse, queryStringify} from '../../utils/queryString';
// Files
import './Openings.scss';
import '../../assets/scss/utils/LoadMore.scss';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { openings3D } from '../../assets/illustrations';
import useWindowLocation from '../../components/hooks/useWindowLocation';

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// UI Custom Component
import CardList from '../../components/common/CardList/CardListWithFilters';
import Tabs from '../../components/common/Tabs/Tabs';
import Hero from '../../components/common/Hero/Hero';

// redux
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks';
import { getAllJobs, getCountAllJobs, setJobPage } from '../../redux/slices/jobsSlices';
import { debounce } from '../../utils/debounce';


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

const Openings: FC = () => {
  const { t } = useTranslation([namespaces.common, namespaces.pages.openings]);

  // redux
  const {data, loading, page} = useAppSelector((state) => state.jobs.allJobs);
  const countJobs = useAppSelector((state) => state.jobs.allJobs.count);
  const dispatch = useAppDispatch();

  const [queryStr, setQueryStr] = useState(null);
  const [queryCountStr, setQueryCountStr] = useState(null);



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

  const handleOnFetch = (queryStr, queryCountStr) => {
    console.log('handleOnFetch', queryStr);
    setQueryStr(queryStr);
    setQueryCountStr(queryCountStr);
  }

  const loadMoreClicked = (ev) => {
    dispatch(setJobPage(page + 1));
  };

  const resetPage = () => {
    dispatch(setJobPage(1));
  };

  useEffect(() => {
    if (queryStr !== null && queryStr) {
      console.log('Openings dispatch:', queryStr);
      dispatch(getAllJobs(queryStr));
      dispatch(getCountAllJobs(queryCountStr));
    }
  }, [queryStr]);

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
        {/*<CardList
          data={data}
          loading={loading}
          placeholderSearch='Search jobs'
          onSearch={search}
          searchValue={queryObj.PositionOffered_contains}
          onFilter={handleFilter}
          onRangeChanged={handleRangeChanged}
          experienceRange={[queryObj.ExperienceFrom_gte, queryObj.ExperienceTo_lte]}
          defaultFiltersSelected={filterObj}
          firstTimeLoading={firstTimeLoading}
          sort={querySort}
          onSort={handleSort} />*/}
        <CardList
          data={data}
          loading={loading}
          type="openings"
          handleOnFetch={handleOnFetch}
          defaultFiltersSelected={{field: [], schedule: [], contract: []}}
          onFilter={() => {}}
          resultsCount={countJobs}
          resetPage={resetPage}
          loadMoreClicked={loadMoreClicked}
          placeholderSearch='Search job' />
      </div>
    </Fragment>
  );
}
 
export default Openings;