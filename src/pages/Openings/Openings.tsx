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
import CardList from '../../components/common/CardList/CardList';
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
  const searchParams = useLocation().search;
  const history = useHistory();

  const [query, setQuery] = useState(null);
  const [queryCount, setQueryCount] = useState(null);

  // arg for query
  const [querySort, setQuerySort] = useState('');
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
    // ExperienceFrom_gte: EXPERIENCE_FROM,
    // ExperienceTo_lte: EXPERIENCE_TO,
    _start: 0,
    _limit: RESULTS_PER_PAGE,
    _sort: 'id:DESC'
  });

  // redux
  const {data, loading, page} = useAppSelector((state) => state.jobs.allJobs);
  const countJobs = useAppSelector((state) => state.jobs.allJobs.count);
  const dispatch = useAppDispatch();

  const createQuery = () => {
    let newQueryObj = {
      ...queryObj
    };
    console.log('create query: ', newQueryObj);
    console.log('searchParams: ', searchParams);

    console.log('querySearch: ', queryObj.PositionOffered_contains);
    let currentUrlParams = queryParse(searchParams);
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

    let sort:string = (currentUrlParams.order)? currentUrlParams.order.toString() : 'DESC';
    newQueryObj._sort= `id:${sort}`;

    let queryWhere = {
      _where: {},
      _sort: newQueryObj._sort,
      _start: newQueryObj._start,
      _limit: newQueryObj._limit,
    };
    if (currentUrlParams.experienceFrom) {
      newQueryObj.ExperienceFrom_gte = parseInt(currentUrlParams.experienceFrom.toString());
      // experienceFirstSegment.push({ExperienceFrom_gte: parseInt(currentUrlParams.experienceFrom.toString())});
    }
    else {
      newQueryObj.ExperienceFrom_gte = EXPERIENCE_FROM;
    }
    let experienceFrom = (currentUrlParams.experienceFrom)? parseInt(currentUrlParams.experienceFrom.toString()) : EXPERIENCE_FROM;

    if (currentUrlParams.experienceTo) {
      newQueryObj.ExperienceTo_lte = parseInt(currentUrlParams.experienceTo.toString());
    }
    else {
      newQueryObj.ExperienceTo_lte = EXPERIENCE_TO;
    }
    let experienceTo = (currentUrlParams.experienceTo)? parseInt(currentUrlParams.experienceTo.toString()) : EXPERIENCE_TO;

    let experienceFirstSegment = [
      {
        ExperienceFrom_gte: experienceFrom
      },
      {
        ExperienceFrom_lte: experienceTo
      }
    ];

    let experienceSecondSegment = [
      {
        ExperienceTo_lte: experienceTo
      },
      {
        ExperienceTo_gte: experienceFrom
      }
    ];

    console.log(newQueryObj);
    let {_sort, _start, _limit, ExperienceFrom_gte, ExperienceTo_lte, ...filterParmasOnly} = newQueryObj;

    queryWhere._where = {
      _or: [experienceFirstSegment, experienceSecondSegment],
      ...filterParmasOnly
    };

    let queryWhereStr = queryStringify(queryWhere);
    console.log('queryWhere', queryWhereStr);

    let {_where} = queryWhere;
    console.log('where', _where);
    let countQueryStr = queryStringify({_where: {..._where}});
    console.log('countQueryStr: ', countQueryStr);

    setQuery(`?${queryWhereStr}`);
    setQueryCount(`/count?${countQueryStr}`);
  };

  const handleSearch = (param: string) => {
    let newQueryObj = {...queryObj};
    newQueryObj.PositionOffered_contains = param;

    newQueryObj._start = 0;
    newQueryObj._limit = RESULTS_PER_PAGE;

    dispatch(setJobPage(1));

    setQueryObj({
      ...newQueryObj,
    });
  }

  const handleRangeChanged = values => {
    console.log('handleRangeChanged: ', values);
    let currentUrlParams = queryParse(searchParams);

    let updatedUrlParams = {
      ...currentUrlParams,
      experienceFrom: values[0],
      experienceTo: values[1]
    };

    let updatedUrlString = queryStringify(updatedUrlParams);
    history.push({search: updatedUrlString});
  };

  const search = useCallback(debounce(handleSearch, 600), []);

  const handleFilter = (param) => {
    console.log('handleFilter: ', param);
    let currentUrlParams = queryParse(searchParams);
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
    console.log('updatedUrlParams', updatedUrlParams);

    let updatedUrlString = queryStringify(updatedUrlParams);
    console.log('new urlParams', updatedUrlString);
    history.push({search: updatedUrlString});
  };

  const handleSort = (sort: string) => {

    const params = queryParse(searchParams);
    if(sort === 'Oldest') {
      params.order = 'ASC';
    }
    else if(sort === 'Latest') {
      params.order = 'DESC';
    }

    history.push({search: queryStringify(params)});
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
    let urlParams = queryParse(searchParams);
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

    if (urlParams.experienceFrom) {
      newQueryObj.ExperienceFrom_gte = parseInt(urlParams.experienceFrom.toString());
    }
    else {
      newQueryObj.ExperienceFrom_gte = EXPERIENCE_FROM;
    }

    if (urlParams.experienceTo) {
      newQueryObj.ExperienceTo_lte = parseInt(urlParams.experienceTo.toString());
    }
    else {
      newQueryObj.ExperienceTo_lte = EXPERIENCE_TO;
    }

    newQueryObj._start = 0;
    newQueryObj._limit = RESULTS_PER_PAGE;

    dispatch(setJobPage(1));
    setQueryObj(newQueryObj);
    setFilterObj(newFilterObj);
    setFirstTimeLoading(false);
  }, [searchParams]);


  useEffect(() => {
    if(query !== null && queryCount !== null && !firstTimeLoading) {
      dispatch(getAllJobs(query));
      dispatch(getCountAllJobs(queryCount));
    }
  }, [query]);

  useEffect(() => {
    createQuery();
  }, [queryObj]);

  const loadMoreClicked = (ev) => {
    ev.preventDefault();
    let newQueryObj = {
      ...queryObj,
      _start: queryObj._start + RESULTS_PER_PAGE,
      _limit: queryObj._limit + RESULTS_PER_PAGE,
    };

    dispatch(setJobPage(page + 1));
    setQueryObj(newQueryObj);
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
        <CardList
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
          onSort={handleSort} />
        <div className="load-more">
          {
            data && countJobs > data.length &&
              <Button
                secondary
                onClick={loadMoreClicked}
              >{ t("general.load-more") }</Button>
          }
        </div>
      </div>
    </Fragment>
  );
}
 
export default Openings;