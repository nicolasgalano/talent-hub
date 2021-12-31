import React, { FC, Fragment, useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

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
import CardList from '../../components/common/CardList/CardList';
import Tabs from '../../components/common/Tabs/Tabs';
import Hero from '../../components/common/Hero/Hero';

// redux
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks';
import { getAllJobs, getCountAllJobs } from '../../redux/slices/jobsSlices';
import { debounce } from '../../utils/debounce';

const Openings: FC = () => {
  const { t } = useTranslation([namespaces.common, namespaces.pages.openings]);
  const searchParams = useLocation().search;
  // const order = new URLSearchParams(searchParams).get('order');
  const history = useHistory();

  const url = useWindowLocation();

  const [query, setQuery] = useState(null);
  const [queryCount, setQueryCount] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  // arg for query
  const [queryStart, setQueryStart] = useState(0);
  const [queryLimit, setQueryLimit] = useState(6);
  const [querySort, setQuerySort] = useState('');
  const [querySearch, setQuerySearch] = useState('');

  // redux
  const {data, loading} = useAppSelector((state) => state.jobs.allJobs);
  const countJobs = useAppSelector((state) => state.jobs.allJobs.count);
  const dispatch = useAppDispatch();

  const createQuery = () => {
    setQuery(`?PositionOffered_contains=${querySearch}&_start=${queryStart}&_limit=${queryLimit}&_sort=id:${querySort}`);
    setQueryCount(`/count?PositionOffered_contains=${querySearch}`);
  };

  const handleSearch = (param: string) => {
    setQuerySearch(encodeURI(param));
  }

  const search = useCallback(debounce(handleSearch, 500), []);

  const handleFilter = (param) => {
    console.log('Filter: ', param);
  }

  const handleSort = (sort: string) => {

    /*const url = new URL(window.location.href);

    if(sort === 'Oldest'){
      setQuerySort('ASC');
      // history.push('?order=ASC');
      url.searchParams.set('order', 'ASC');
      
    }
    if(sort === 'Latest'){
      setQuerySort('DESC');
      // history.push('?order=DESC');
      url.searchParams.set('order', 'DESC');
    }
    
    // window.location.search = url.toString();
    window.history.replaceState(null, null, url);*/
    const params = new URLSearchParams();
    if(sort === 'Oldest') {
      params.append("order", 'ASC');
    }
    else if(sort === 'Latest') {
      params.append("order", 'DESC');
    }

    history.push({search: params.toString()});
  }

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

  useEffect(() => {
    let urlParams = new URLSearchParams(searchParams);
    console.log('searchParams Changed', urlParams);
    let sort = urlParams.get('order');
    console.log(sort);
    if (sort) {
      setQuerySort(sort);
    }

  }, [searchParams]);

  useLayoutEffect(() => {
    let urlParams = new URLSearchParams(searchParams);
    console.log('searchParams first Loading', urlParams);
    let sort = urlParams.get('order');
    if (sort) {
      setQuerySort(sort);
    }
    else {
      setQuerySort('DESC');
    }
  }, []);

  useEffect(() => {
    // data.length === 0 && dispatch(getAllJobs(query));
    // prevent request until set state
    if(query !== null && queryCount !== null) {
      dispatch(getAllJobs(query));
      dispatch(getCountAllJobs(queryCount));
    }
  }, [query]);

  useEffect(() => {
    console.log('querySort changed', querySort);
    if(querySort) {
      createQuery();
    }
  }, [queryStart,
    queryLimit,
    querySort,
    querySearch]);
  /*

  useEffect(() => {
    setPage(Math.ceil(queryLimit / 6));
    // We calculate how many pages there are
    setLastPage(Math.ceil(countJobs / 6));
  }, [countJobs]);

  useEffect(() => {
    console.log('URL: ', url);
  }, [url])*/

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
        <CardList
          data={data}
          loading={loading}
          placeholderSearch='Search jobs'
          onSearch={search}
          onFilter={handleFilter}
          sort={querySort}
          onSort={handleSort} />
        <div className="load-more">
          {
            page < lastPage &&
              <Button secondary >{ t("general.load-more") }</Button>
          }
        </div>
      </div>
    </Fragment>
  );
}
 
export default Openings;