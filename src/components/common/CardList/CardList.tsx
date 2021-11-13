import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import clsx from 'clsx';

// UI Decentraland
import { TextFilter } from 'decentraland-ui/dist/components/TextFilter/TextFilter';
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Files
import './CardList.scss';
import data from '../../../data/filters.json';
import dataJobs from '../../../data/jobs.json';
import { filterActive, filterInactive } from "../../../assets/icons";

// UI Custom Component
import Typography from "../Typography/Typography";
import Filters from "../Filters/Filters";
import Card, { CardProps } from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Modal, { ModalHandle } from "../Modal/Modal";
import { useWindowSize } from "../../hooks/useWindowsSize";
import Range from "../Range/Range";


const CardList:FC = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [jobs, setJobs] = useState(null);
  const modalRef = useRef<ModalHandle>(null);
  const {width: widthBrowser} = useWindowSize();

  const renderFilters = () => (
    <Fragment>
      <Filters title="Field" listFilters={data.field} />
      <Filters title="Type of contract" listFilters={data.contract} />
      <Filters title="Working schedule" listFilters={data.schedule} />
      <Range />
    </Fragment>
  );

  const handleOpenFilter = () => {
    if(widthBrowser >= 640){
      setOpenFilter(!openFilter);
    }else{
      modalRef.current.openModal();
    }
  };

  const getJobs = () => {
    let allJobs = [];
    // we increase the data size
    for (let index = 0; index < 9; index++) {
      const random = Math.floor(Math.random() * dataJobs.length);
      const doc = dataJobs[random];
      allJobs.push(doc);
    }
    return allJobs;
  }

  useEffect(() => {
    setJobs(getJobs());
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
              <Typography variant="label" element="span" >Filters</Typography>
              {
                !openFilter ?
                  <img src={filterInactive} alt="btn filters inactive"/> :
                  <img src={filterActive} alt="btn filters active"/>
              }
            </Button>
            <Dropdown
              options={Array('Latest', 'Popular', 'Recent')}
              optionDefault="Latest" />
          </div>
        </div>
        {/* box */}
        <div className={clsx('filter-box', { 'open': openFilter })}>
          { renderFilters() }
        </div>
        <div className="cards-container">
          { jobs &&
              jobs.map((job: CardProps, key: string) => (
                <Card
                  title={job.title}
                  img={job.img}
                  company={job.company}
                  description={job.description}
                  date={job.date}
                  location={job.location}
                  to="#"
                  key={`card-job-${key}`}/>
              ))
          }
        </div>
        <div className="load-more">
          <Button secondary >Load More</Button>
        </div>
      </div>
      <Modal ref={modalRef} theme="grey" >
        { renderFilters() }
        <div className="apply">
          <Button primary size="large">Apply</Button>
        </div>
      </Modal>
    </Fragment>
  );
}
export default CardList;