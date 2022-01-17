import React, { FC, Fragment, useEffect, useRef, useState, useCallback } from "react";
import clsx from 'clsx';
import { useLocation, useHistory } from 'react-router-dom';
import {queryParse, queryStringify} from '../../../utils/queryString';

// UI Decentraland
import { TextFilter } from 'decentraland-ui/dist/components/TextFilter/TextFilter';
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Files
import './CardList.scss';
import filter from '../../../data/filters.json';
import { filterActive, filterInactive } from "../../../assets/icons";
import { useTranslation } from "react-i18next";
import { namespaces } from "../../../i18n/i18n.constants";

// UI Custom Component
import Typography from "../Typography/Typography";
import Card, { CardProps } from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Modal, { ModalBody, ModalHandle } from "../Modal/Modal";
import { useWindowSize } from "../../hooks/useWindowsSize";
import Range from "../Range/Range";
import Label from "../Label/Label";
import FilterButtons from "../FilterButtons/FilterButtons";
import Skeleton from "../Skeleton/Skeleton";
import {ProfessionalsQuery, FetchQuery} from './utils';
import { debounce } from '../../../utils/debounce';


interface CardListProps {
  data: CardProps[];
  loading?: boolean;
  placeholderSearch: string;
  type: string;
  onSearch?: Function;
  onFilter?: Function;
  onSort?: Function;
  defaultFiltersSelected?: {
    field: string[],
    schedule: string[],
    contract: string[],
  },
  onRangeChanged?: Function;
  experienceRange?: number[];
  firstTimeLoading?: boolean;
  handleOnFetch?: Function;
  resultsCount?: number;
  resetPage?: Function;
  loadMoreClicked?: Function;
}

const RESULTS_PER_PAGE = 6;
const EXPERIENCE_FROM = 0;
const EXPERIENCE_TO = 10;

const CardListTest:FC<CardListProps> = ({data: cards, loading, placeholderSearch, type, onSearch, onFilter, onRangeChanged,
                                      defaultFiltersSelected, onSort, firstTimeLoading, handleOnFetch, resultsCount, resetPage, loadMoreClicked}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const modalRef = useRef<ModalHandle>(null);
  const {width: widthBrowser} = useWindowSize();
  const { t } = useTranslation(namespaces.common);
  const [activeFilters, setActiveFilters] = useState({});
  const [countFilters, setCountFilters] = useState(null);
  const [sortDefault, setSortDefault] = useState('Latest');
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [experienceRange, setExperienceRange] = useState([EXPERIENCE_FROM, EXPERIENCE_TO]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [fetchQueryObj, setFetchQueryObj] = useState<FetchQuery>({
    WorkingSchedule: '',
    TypeOfContract: '',
    Fields: '',
    ExperienceFrom_gte: EXPERIENCE_FROM,
    ExperienceTo_lte: EXPERIENCE_TO,
    _start: 0,
    _limit: RESULTS_PER_PAGE,
    _sort: 'id:DESC'
  });
  const [professionalsQuery, setProfessionalsQuery] = useState<ProfessionalsQuery>({
    Fullname_contains: ''
  });
  const [mainQuery, setMainQuery] = useState<any>({});
  const [queryStr, setQueryStr] = useState(null);
  const [queryCountStr, setQueryCountStr] = useState(null);
  const history = useHistory();
  const searchParams = useLocation().search;

  useEffect(() => {
    let urlParams = queryParse(searchParams);
    console.log('on URL params changed', urlParams);

    let sort:string = (urlParams.order)? urlParams.order.toString() : '';

    let newQueryObj = {
      ...fetchQueryObj
    };
    let sortLabel = 'Latest';
    if (sort) {
      newQueryObj._sort = `id:${sort}`;
      sortLabel = (sort == 'ASC')? 'Oldest' : sortLabel;
    }
    else {
      newQueryObj._sort = `id:DESC`;
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

    if (type == 'professionals') {
      newQueryObj = {
        ...newQueryObj,
        ...professionalsQuery
      }
    }

    setSortDefault(sortLabel);
    setShowSortDropdown(true);
    setMainQuery(newQueryObj);
    setExperienceRange([newQueryObj.ExperienceFrom_gte, newQueryObj.ExperienceTo_lte]);
  }, [searchParams]);

  useEffect(() => {
    if (!Object.keys(mainQuery).length) {
      return;
    }
    console.log('Create query', mainQuery);

    let newQueryObj = {...mainQuery};

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

    }
    else {
      delete newQueryObj.WorkingSchedule;
    }

    if (filterObj.field.length) {

    }
    else {
      delete newQueryObj.Fields;
    }

    if (filterObj.contract.length) {

    }
    else {
      delete newQueryObj.TypeOfContract;
    }


    let queryWhere = {
      _where: {
        _or: [],
        Experience_gte: 0,
        Experience_lte: 0,
      },
      _sort: newQueryObj._sort,
      _start: newQueryObj._start,
      _limit: newQueryObj._limit,
    };

    if (type == 'professionals') {
      newQueryObj = {
        ...newQueryObj,
        ...professionalsQuery,
      }

    }

    let experienceFrom = (currentUrlParams.experienceFrom)? parseInt(currentUrlParams.experienceFrom.toString()) : EXPERIENCE_FROM;
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

    let {_sort, _start, _limit, ExperienceFrom_gte, ExperienceTo_lte,
      ...filterParamsOnly} = newQueryObj;

    queryWhere._where = {
      ...filterParamsOnly
    };

    console.log(queryWhere._where._or);

    if (type == 'professionals') {
      // queryWhere._where._or = [{Experience_gte: experienceFrom}, {Experience_lte: experienceTo}]
      delete queryWhere._where._or;
      queryWhere._where = {
        ...queryWhere._where,
        Experience_gte: experienceFrom,
        Experience_lte: experienceTo
      }
    }
    else if (type == 'jobs') {
      queryWhere._where._or = [experienceFirstSegment, experienceSecondSegment];
    }

    let queryWhereStr = queryStringify(queryWhere);
    let countQueryStr = queryStringify({_where: {...queryWhere._where}});

    setQueryStr(queryWhereStr);
    setQueryCountStr(countQueryStr);
  }, [mainQuery]);

  useEffect(() => {
    if(queryStr) {
      handleOnFetch(`?${queryStr}`, `/count?${queryCountStr}`);
    }
  }, [queryStr]);

  const handleSearch = (param: string) => {
    if (param == inputSearchValue) {
      return;
    }
    console.log('handleSearch param: ', param);

    let newQueryObj = {...mainQuery};
    if(type == 'professionals') {
      let newProfessionalQuery = {...professionalsQuery};
      newProfessionalQuery.Fullname_contains = param;
      setProfessionalsQuery(newProfessionalQuery);
    }
    else if (type == 'openings') {
      newQueryObj.PositionOffered_contains = param;
    }

    newQueryObj._start = 0;
    newQueryObj._limit = RESULTS_PER_PAGE;

    setInputSearchValue(param);
    resetPage();
    setMainQuery(newQueryObj);
  };

  const searchDebounce = useCallback(debounce(handleSearch, 400), [inputSearchValue]);

  const handleLoadMoreClick = (ev) => {
    ev.preventDefault();
    console.log('handleLoadMoreClick');

    let newQueryObj = {
      ...mainQuery,
      _start: mainQuery._start + RESULTS_PER_PAGE,
      _limit: mainQuery._limit + RESULTS_PER_PAGE,
    };

    loadMoreClicked();
    setMainQuery(newQueryObj);
  };

  const handleSortOnChange = (sort: string) => {
    console.log('handleSortOnChange', sort);
    const params = queryParse(searchParams);
    if(sort === 'Oldest') {
      params.order = 'ASC';
    }
    else if(sort === 'Latest') {
      params.order = 'DESC';
    }
    resetPage();
    history.push({search: queryStringify(params)});
  };

  const handleRangeChanged = values => {
    console.log('handleRangeChanged: ', values);
    let currentUrlParams = queryParse(searchParams);

    let updatedUrlParams = {
      ...currentUrlParams,
      experienceFrom: values[0],
      experienceTo: values[1]
    };

    resetPage();
    let updatedUrlString = queryStringify(updatedUrlParams);
    history.push({search: updatedUrlString});
  };

  const handleActiveFilters = (filter: Array<string>, key: string) => {
    let actFilter: object = {...activeFilters};
    // Not working
    // let actFilter: object = activeFilters;
    actFilter[key] = filter;
    let size = getActiveFiltersLength(actFilter);
    // Not working
    // actFilter['size'] = size;
    // working
    setCountFilters(size);
    setActiveFilters(actFilter);
  }

  const getActiveFiltersLength = (arr) => {
    let size: number = 0;
    for (let index in arr) {
      const val = arr[index];
      if(val.length){
        size = size + val.length;
      }
      // console.log(index + " = " + val + ' ');
    }

    return size;
  };

  const renderFilters = () => (
    <Fragment>
      <div>
        <Label type="filter">{ t("general.field") }</Label>
        <FilterButtons defaultSelected={defaultFiltersSelected.field} options={filter.field} callback={(filters: Array<string>) => handleActiveFilters(filters, 'field')}/>
      </div>
      <div>
        <Label type="filter">{ t("general.type-of-contract") }</Label>
        <FilterButtons defaultSelected={defaultFiltersSelected.contract} options={filter.contract} callback={(filters: Array<string>) => handleActiveFilters(filters, 'contract')}/>
      </div>
      <div>
        <Label type="filter">{ t("general.working-schedule") }</Label>
        <FilterButtons defaultSelected={defaultFiltersSelected.schedule} options={filter.schedule} callback={(filters: Array<string>) => handleActiveFilters(filters, 'schedule')}/>
      </div>
      <div>
        <Label type="filter">{ t("general.experience") }</Label>
        <Range callback={handleRangeChanged} defaultValue={experienceRange} />
      </div>
    </Fragment>
  );

  const handleOpenFilter = () => {
    if(widthBrowser > 640){
      setOpenFilter(!openFilter);
    }else{
      modalRef.current.openModal();
    }
  };

  useEffect(() => {
    // Listener if browser width changed
    if(widthBrowser > 640){
      if(modalRef.current.display()){
        modalRef.current.closeModal();
        setOpenFilter(true);
      }
    }else{
      if(openFilter){
        setOpenFilter(false);
        modalRef.current.openModal();
      }
    }
  }, [widthBrowser])

  useEffect(() => {
    if(!firstTimeLoading) {
      onFilter(activeFilters);
    }
  }, [activeFilters])

  return(
    <Fragment>
      <div className="card-list">
        {/* Header */}
        <div className="card-list-menu">
          <div className="title">
          <TextFilter
              placeholder={placeholderSearch}
              value={inputSearchValue}
              onChange={searchDebounce} />
          </div>
          <div className="actions">
            <Button basic className="btn-filters" onClick={() => handleOpenFilter()}>
              <Typography variant="label" element="span">
                {
                  countFilters > 0 && countFilters + ' '
                }
                { 
                  // Print "Filter" or "Filters"
                  t("general.filter", {count: countFilters}) 
                }
              </Typography>
              {
                openFilter || countFilters ?
                  <img src={filterActive} alt="btn filters active"/> :
                  <img src={filterInactive} alt="btn filters inactive"/>
              }
            </Button>
            {showSortDropdown && <Dropdown
              options={Array('Latest', 'Oldest')}
              optionDefault={sortDefault}
              onChange={handleSortOnChange} /> }
          </div>
        </div>
        {/* box */}
        <div className={clsx('filter-box', { 'open': openFilter })}>
          { !firstTimeLoading && renderFilters() }
        </div>
        <div className="cards-container">
          {/* Show result */}
          {
            (cards !== null && cards.length !== 0) &&
              cards.map((doc: CardProps, key: number) => (
                <Card
                  id={doc.id}
                  title={doc.title}
                  img={doc.img}
                  company={doc.company}
                  description={doc.description}
                  date={doc.date}
                  profession={doc.profession}
                  to={doc.to}
                  key={`card-doc-${doc.id}`}/>
              ))
          }
          {/* Show Skeleton while loading */}
          {
            loading && 
              [1,2,3,4,5,6].map((key, index) => (
                <Skeleton key={`skeletor-${index}`} />
              ))
          }
          {/* Show no result */}
          {
            (!loading && (cards === null || cards.length === 0)) &&
              'No data to show'
          }
        </div>
      </div>
      <div className="load-more">
        {
          cards && resultsCount > cards.length &&
          <Button
            secondary
            onClick={handleLoadMoreClick}
          >{ t("general.load-more") }</Button>
        }
      </div>
      <Modal ref={modalRef} theme="grey" >
        <ModalBody>
          { renderFilters() }
          <div className="apply">
            <Button primary size="large">{ t("general.apply") }</Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
export default CardListTest;