import React, { FC, Fragment, useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

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


interface QueryInterface {
  PositionOffered_contains: string;
  WorkingSchedule: string;
  TypeOfContract: string;
  Fields: string;
  _start: number;
  _limit: number;
  _sort: string;
}

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
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);
  const [filterObj, setFilterObj] = useState({
    field: [],
    contract: [],
    schedule: [],
  });
  const [queryObj, setQueryObj] = useState<QueryInterface>({
    PositionOffered_contains: '',
    WorkingSchedule: '',
    TypeOfContract: '',
    Fields: '',
    _start: 0,
    _limit: 6,
    _sort: 'id:ASC'
  });

  // redux
  const {data, loading} = useAppSelector((state) => state.jobs.allJobs);
  const countJobs = useAppSelector((state) => state.jobs.allJobs.count);
  const dispatch = useAppDispatch();

  const createQuery = () => {
    let newQueryObj = {
      ...queryObj
    };
    console.log('create query: ', newQueryObj);
    console.log('searchParams: ', searchParams);

    console.log('querySearch: ', queryObj.PositionOffered_contains);
    let currentUrlParams = queryString.parse(searchParams);
    interface FilterObj {
      schedule: string[];
      field: string[];
      contract: string[];
    }
    let filterObj:FilterObj = {
      schedule: [],
      field: [],
      contract: [],
    };

    Object.keys(filterObj).forEach(filterName => {
      if(currentUrlParams[filterName] && currentUrlParams[filterName].length) {
        filterObj[filterName] = currentUrlParams[filterName];
      }
    });

    if (filterObj.schedule.length) {
      let allFilter = filterObj.schedule.toString();
      console.log('schedule filter', allFilter);
      let filterArr = allFilter.split(',');
      newQueryObj.WorkingSchedule = filterArr[0];
    }
    else {
      delete newQueryObj.WorkingSchedule;
    }
    
    if (filterObj.field.length) {
      let allFilter = filterObj.field.toString();
      let filterArr = allFilter.split(',');
      newQueryObj.Fields = filterArr[0];
    }
    else {
      delete newQueryObj.Fields;
    }

    if (filterObj.contract.length) {
      let allFilter = filterObj.contract.toString();
      let filterArr = allFilter.split(',');

      newQueryObj.TypeOfContract = filterArr[0];
    }
    else {
      delete newQueryObj.TypeOfContract;
    }

    let sort:string = (currentUrlParams.order)? currentUrlParams.order.toString() : 'ASC';
    newQueryObj._sort= `id:${sort}`;

    console.log(newQueryObj);


    let queryObjStr = queryString.stringify(newQueryObj);
    setQuery(`?${queryObjStr}`);
    // setQuery(`?PositionOffered_contains=${querySearch}&_start=${queryStart}&_limit=${queryLimit}&_sort=id:${querySort}`);
    setQueryCount(`/count?PositionOffered_contains=${querySearch}`);
  };

  const handleSearch = (param: string) => {
    console.log('Search: ', param, queryObj.PositionOffered_contains);
    let newQueryObj = {...queryObj};
    console.log('newQueryObj: ', newQueryObj);
    newQueryObj.PositionOffered_contains = param;

    setQueryObj({
      ...newQueryObj,
    });
  }

  const search = useCallback(debounce(handleSearch, 600), []);

  const handleFilter = (param) => {
    console.log('Filter: ', param);
    let currentUrlParams = queryString.parse(searchParams);
    console.log('currentUrlParams: ', currentUrlParams);
    let filterObj = {
      schedule: [],
      field: [],
      contract: [],
    };

    Object.keys(filterObj).forEach(filterName => {
      if(param[filterName] && param[filterName].length) {
        filterObj[filterName] = param[filterName];
      }
    });

    let updatedUrlParams = {
      ...currentUrlParams,
      ...filterObj
    }

    let updatedUrlString = queryString.stringify(updatedUrlParams);
    console.log('new urlParams', updatedUrlString);
    history.push({search: updatedUrlString});
  };

  const handleSort = (sort: string) => {

    const params = queryString.parse(searchParams);
    if(sort === 'Oldest') {
      params.order = 'ASC';
    }
    else if(sort === 'Latest') {
      params.order = 'DESC';
    }

    history.push({search: queryString.stringify(params)});
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
    let urlParams = queryString.parse(searchParams);
    console.log('searchParams Changed', urlParams);

    let sort:string = (urlParams.order)? urlParams.order.toString() : '';
    let schedule:string = (urlParams.schedule)? urlParams.schedule.toString() : '';
    let field:string = (urlParams.field)? urlParams.field.toString() : '';
    let contract:string = (urlParams.contract)? urlParams.contract.toString() : '';

    let newQueryObj = {...queryObj};
    let newFilterObj = {...filterObj};

    if (sort) {
      setQuerySort(sort);
      newQueryObj._sort= `id:${sort}`;
    }
    else {
      setQuerySort('DESC');
      newQueryObj._sort= `id:DESC`;
    }

    if(schedule) {
      let scheduleArr = schedule.split(',');
      newQueryObj.WorkingSchedule = scheduleArr[0];
      newFilterObj.schedule = scheduleArr;
    }
    else {
      newQueryObj.WorkingSchedule = '';
      newFilterObj.schedule = [];
    }

    if(field) {
      let fieldArr = field.split(',');
      newQueryObj.Fields = fieldArr[0];
      newFilterObj.field = fieldArr;
    }
    else {
      newQueryObj.Fields = '';
      newFilterObj.field = [];
    }

    if(contract) {
      let contractArr = contract.split(',');
      newQueryObj.TypeOfContract = contractArr[0];
      newFilterObj.contract = contractArr;
    }
    else {
      newQueryObj.TypeOfContract = '';
      newFilterObj.contract = [];
    }

    setQueryObj(newQueryObj);
    setFilterObj(newFilterObj);
    setFirstTimeLoading(false);
  }, [searchParams]);

  /*useLayoutEffect(() => {
    let urlParams = new URLSearchParams(searchParams);
    console.log('searchParams first Loading', urlParams);
    let sort = urlParams.get('order');
    if (sort) {
      setQuerySort(sort);
    }
    else {
      setQuerySort('DESC');
    }
  }, []);*/

  useEffect(() => {
    // data.length === 0 && dispatch(getAllJobs(query));
    // prevent request until set state
    if(query !== null && queryCount !== null && !firstTimeLoading) {
      dispatch(getAllJobs(query));
      dispatch(getCountAllJobs(queryCount));
    }
  }, [query]);

  useEffect(() => {
    createQuery();
  }, [queryObj]);

  /*useEffect(() => {
    console.log('querySort changed', querySort);
    if(querySort) {
      createQuery();
    }
  }, [queryStart,
    queryLimit,
    querySort,
    querySearch]);*/
  /*

  useEffect(() => {
    setPage(Math.ceil(queryLimit / 6));
    // We calculate how many pages there are
    setLastPage(Math.ceil(countJobs / 6));
  }, [countJobs]);

  useEffect(() => {
    console.log('URL: ', url);
  }, [url])*/

  console.log('re-rendering');
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
          searchValue={queryObj.PositionOffered_contains}
          onFilter={handleFilter}
          defaultFiltersSelected={filterObj}
          firstTimeLoading={firstTimeLoading}
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