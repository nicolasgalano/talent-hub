import React, { FC, Fragment, useState } from "react";
import clsx from 'clsx';

// UI Decentraland
import { HeaderMenu }  from 'decentraland-ui/dist/components/HeaderMenu/HeaderMenu';
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown';
import { TextFilter } from 'decentraland-ui/dist/components/TextFilter/TextFilter';
import { Button } from 'decentraland-ui/dist/components/Button/Button';


import './ListCard.scss';
import { filterActive, filterInactive } from "../../../assets/icons";
import Typography from "../Typography/Typography";
import Filters from "../Filters/Filters";
import data from '../../../data/filters.json';

const ListCard:FC = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => setOpenFilter(!openFilter);

  return(
    <div className="list-card">
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

      </div>
    </div>
  );
}
export default ListCard;