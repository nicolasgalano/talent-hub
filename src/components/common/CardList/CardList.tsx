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
import Modal, { ModalHandle } from "../Modal/Modal";
import { useWindowSize } from "../../hooks/useWindowsSize";
import Range from "../Range/Range";
import Label from "../Label/Label";
import FilterButtons from "../FilterButtons/FilterButtons";

interface CardListProps {
  data: Array<object>;
}

const CardList:FC<CardListProps> = ({data}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [cards, setCards] = useState(null);
  const modalRef = useRef<ModalHandle>(null);
  const {width: widthBrowser} = useWindowSize();
  const { t } = useTranslation(namespaces.pages.openingsProfessionals);

  const renderFilters = () => (
    <Fragment>
      <div>
        <Label type="filter">{ t("filters.field") }</Label>
        <FilterButtons options={filter.field} />
      </div>
      <div>
        <Label type="filter">{ t("filters.type-of-contract") }</Label>
        <FilterButtons options={filter.contract} />
      </div>
      <div>
        <Label type="filter">{ t("filters.working.schedule") }</Label>
        <FilterButtons options={filter.schedule} />
      </div>
      <div>
        <Label type="filter">{ t("filters.experience") }</Label>
        <Range />
      </div>
    </Fragment>
  );

  const handleOpenFilter = () => {
    if(widthBrowser >= 640){
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
    if(widthBrowser >= 640){
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
              placeholder="Search jobs..."
              value=""
              onChange={() => console.log("searching")} />
          </div>
          <div className="actions">
            <Button basic className="btn-filters" onClick={() => handleOpenFilter()}>
              <Typography variant="label" element="span" >{ t("filters.filters")}</Typography>
              {
                !openFilter ?
                  <img src={filterInactive} alt="btn filters inactive"/> :
                  <img src={filterActive} alt="btn filters active"/>
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
          { cards &&
              cards.map((doc: CardProps, key: string) => (
                <Card
                  title={doc.title}
                  img={doc.img}
                  company={doc.company}
                  description={doc.description}
                  date={doc.date}
                  location={doc.location}
                  to="#"
                  key={`card-doc-${key}`}/>
              ))
          }
        </div>
        <div className="load-more">
          <Button secondary >{ t("filters.load-more") }</Button>
        </div>
      </div>
      <Modal ref={modalRef} theme="grey" >
        { renderFilters() }
        <div className="apply">
          <Button primary size="large">{ t("filters.apply") }</Button>
        </div>
      </Modal>
    </Fragment>
  );
}
export default CardList;