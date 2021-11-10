import React, { FC, Fragment, useEffect, useState } from "react";
import clsx from 'clsx';

// UI Decentraland
import { HeaderMenu }  from 'decentraland-ui/dist/components/HeaderMenu/HeaderMenu';
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown';
import { TextFilter } from 'decentraland-ui/dist/components/TextFilter/TextFilter';
import { Button } from 'decentraland-ui/dist/components/Button/Button';


import './CardList.scss';
import { filterActive, filterInactive } from "../../../assets/icons";
import Typography from "../Typography/Typography";
import Filters from "../Filters/Filters";
import Card, { CardProps } from "../Card/Card";
import data from '../../../data/filters.json';
import dataJobs from '../../../data/jobs.json';

const CardList:FC = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [jobs, setJobs] = useState(null);

  const handleOpenFilter = () => setOpenFilter(!openFilter);

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

  return(
    <div className="card-list">
      {/* Header */}
      <HeaderMenu>
        <HeaderMenu.Left>
          <TextFilter
            placeholder="Search jobs..."
            value=""
            onChange={() => console.log("searching")}
          />
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Button basic className="btn-filters" onClick={() => handleOpenFilter()}>
            <Typography variant="label" element="span" >Filters</Typography>
            {
              !openFilter ?
                <img src={filterInactive} alt="btn filters inactive"/> :
                <img src={filterActive} alt="btn filters active"/>
            }
          </Button>
          <Dropdown text="Latest" direction="left" className="btn-dropdown">
            <Dropdown.Menu>
              <Dropdown.Item text="Newest" />
              <Dropdown.Item text="Popular" />
              <Dropdown.Item text="Recent" />
            </Dropdown.Menu>
          </Dropdown>
        </HeaderMenu.Right>
      </HeaderMenu>
      {/* box */}
      <div className={clsx('filter-box', { 'open': openFilter })}>
        <Filters title="Field" listFilters={data.field} />
        <Filters title="Type of contract" listFilters={data.contract} />
        <Filters title="Working schedule" listFilters={data.schedule} />
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
    </div>
  );
}
export default CardList;