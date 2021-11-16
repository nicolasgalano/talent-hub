import React, { FC, useEffect, useState} from 'react';

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button'

// Files
import './FilterButtons.scss';
import clsx from 'clsx';

interface FiltersProps {
  options: Array<string>;
  callback?: Function;
  className?: string;
}

const FilterButtons: FC<FiltersProps> = ({ options, callback, className}) => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (value: string) => {
    if(isSelected(value)){
      reduceSelection(value);
    }else{
      addSelection(value);
    }
  }
  
  const isSelected = (option: string) => (
    selected.find(selection => selection === option)
  );

  const addSelection = (option: string) => {
    // TODO: Before
    // Why should we use slide function ?
    // let selection: Array<string> = selected;
    // selection.push(option);
    //setSelected(selection);

    // TODO: After
    // Working
    // let selection: Array<string> = selected.slice();
    // selection.push(option);
    // setSelected(selection);
    // Or
    let selection: Array<string> = selected;
    selection.push(option);
    setSelected([...selected, selection]);
  }

  const reduceSelection = (option: string) => {
    let selection: Array<string> = selected;
    selection = selection.filter(val => val !== option);
    setSelected(selection);
  }

  const launchCallback = () => callback(selected);

  useEffect(() => {
    callback && launchCallback();
  }, [selected]);

  return (
    <div className={clsx('filter-buttons', className)}>
      { 
        options.map((option, key) => (
          <Button
            primary={isSelected(option)}
            secondary={!isSelected(option)}
            key={`btn-option-${option}-${key}`}
            onClick={() => handleSelect(option)}>
              {option}
          </Button>
        ))
      }
    </div>
  );
}
export default FilterButtons;