import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { useRouteMatch } from "react-router";
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
  data: Array<object>;
  loading?: boolean;
}

const CardList:FC<CardListProps> = ({data, loading}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [cards, setCards] = useState(null);
  const modalRef = useRef<ModalHandle>(null);
  const {width: widthBrowser} = useWindowSize();
  const { t } = useTranslation(namespaces.common);
  const [activeFilters, setActiveFilters] = useState({});
  const [countFilters, setCountFilters] = useState(null);
  let {path} = useRouteMatch();

  const getPage = (path: string) => {
    let url: string = path.toLowerCase();
    // delete symbol /
    const urlSplited: Array<string> = path.split('/');
    url = urlSplited[1];
    // Capitalize First Letter
    url = url.charAt(0) + url.slice(1);

    return url;
  }

  const handlePlaceholderSearch = () => {
    const url: string = getPage(path);
    let placeholder: string = '';

    if(url === 'openings') placeholder = 'jobs';
    if(url === 'professionals') placeholder = 'professionals';
    
    return `Search ${placeholder}...`;
  }

  const handleActiveFilters = (filter: Array<string>, key: string) => {
    let actFilter: object = activeFilters;
    actFilter[key] = filter;
    let size = getActiveFiltersSize(actFilter);
    // Not working
    // actFilter['size'] = size;
    // working
    setCountFilters(size);
    setActiveFilters(actFilter);    
  }

  const getActiveFiltersSize = (arr) => {
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

  const getCards = () => {
    let allCards = [];
    // we increase the data size
    for (let index = 0; index < 9; index++) {
      const random = Math.floor(Math.random() * data.length);
      const doc = data[random];
      allCards.push(doc);
    }
    return allCards;
  }

  useEffect(() => {
    setCards(getCards());
  }, []);

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

  return(
    <Fragment>
      <div className="card-list">
        {/* Header */}
        <div className="card-list-menu">
          <div className="title">
          <TextFilter
              placeholder={handlePlaceholderSearch()}
              value=""
              onChange={() => console.log("searching")} />
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
            <Dropdown
              options={Array('Latest', 'Relevance')}
              optionDefault="Latest" />
          </div>
        </div>
        {/* box */}
        <div className={clsx('filter-box', { 'open': openFilter })}>
          { renderFilters() }
        </div>
        <div className="cards-container">
          { loading ?
              [1,2,3,4,5,6].map((key, index) => (
                <Skeleton key={`skeletor-${index}`} />
              )) :
              cards.map((doc: CardProps, key: string) => (
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
        </div>
        <div className="load-more">
          <Button secondary >{ t("general.load-more") }</Button>
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