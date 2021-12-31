import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import clsx from 'clsx';

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

interface CardListProps {
  data: CardProps[];
  loading?: boolean;
  placeholderSearch: string;
  onSearch?: Function;
  onFilter?: Function;
  onSort?: Function;
  sort?: string;
}

const CardList:FC<CardListProps> = ({data: cards, loading, placeholderSearch, onSearch, onFilter, onSort, sort}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const modalRef = useRef<ModalHandle>(null);
  const {width: widthBrowser} = useWindowSize();
  const { t } = useTranslation(namespaces.common);
  const [activeFilters, setActiveFilters] = useState({});
  const [countFilters, setCountFilters] = useState(null);
  const [sortDefault, setSortDefault] = useState('Latest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const handleSearch = (param: string) => onSearch(param);

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
        <FilterButtons options={filter.field} callback={(filters: Array<string>) => handleActiveFilters(filters, 'field')}/>
      </div>
      <div>
        <Label type="filter">{ t("general.type-of-contract") }</Label>
        <FilterButtons options={filter.contract} callback={(filters: Array<string>) => handleActiveFilters(filters, 'contract')}/>
      </div>
      <div>
        <Label type="filter">{ t("general.working-schedule") }</Label>
        <FilterButtons options={filter.schedule} callback={(filters: Array<string>) => handleActiveFilters(filters, 'schedule')}/>
      </div>
      <div>
        <Label type="filter">{ t("general.experience") }</Label>
        <Range />
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
    // onFilter(activeFilters);
  }, [activeFilters])

  useEffect(() => {
    if (sort) {
      if (sort == 'ASC') {
        setSortDefault('Oldest');
      }
      setShowSortDropdown(true);
    }
  }, [sort]);

  return(
    <Fragment>
      <div className="card-list">
        {/* Header */}
        <div className="card-list-menu">
          <div className="title">
          <TextFilter
              placeholder={placeholderSearch}
              value=""
              onChange={(val) => handleSearch(val)} />
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
              onChange={(sort) => onSort(sort)} /> }
          </div>
        </div>
        {/* box */}
        <div className={clsx('filter-box', { 'open': openFilter })}>
          { renderFilters() }
        </div>
        <div className="cards-container">
          {/* Show result */}
          {
            (cards !== null && cards.length !== 0) &&
              cards.map((doc: CardProps, key: number) => (
                <Card
                  title={doc.title}
                  img={doc.img}
                  company={doc.company}
                  description={doc.description}
                  date={doc.date}
                  location={doc.location}
                  to={doc.to}
                  key={`card-doc-${key}`}/>
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
export default CardList;