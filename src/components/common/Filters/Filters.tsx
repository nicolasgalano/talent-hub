import React, { FC, useState} from 'react';

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button'

import Typography from '../Typography/Typography';
import './Filters.scss';

interface FiltersProps {
  title: string;
  listFilters: Array<string>;
  callback?: Function;
}

const Filters: FC<FiltersProps> = ({ title, listFilters, callback}) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    callback && callback(value);
  }

  return (
    <div className="filter-container">
      <Typography variant="label" element="h6" className="title">{title}</Typography>
      <div className="filter-buttons">
        {
          listFilters.map((filter, key) => (
            <Button
              primary={selected === filter && true}
              secondary={selected !== filter && true}
              key={`btn-filter-${title}-${key}`}
              onClick={() => handleSelect(filter)}>
                {filter}
            </Button>
          ))
        }
      </div>
    </div>
  );
}
export default Filters;