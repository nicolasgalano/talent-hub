import React, { FC, useEffect, useState} from 'react';

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button'

// Files
import './FilterButtons.scss';
import clsx from 'clsx';

interface FiltersProps {
  options: Array<object>;
  callback?: Function;
  className?: string;
  defaultSelected?: string[];
}

const FilterButtons: FC<FiltersProps> = ({ options, callback, className, defaultSelected}) => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (value: string) => {
    if(isSelected(value)){
      reduceSelection(value);
    }else{
      addSelection(value);
    }
  }
  
  const isSelected = (option: string) => {
    if( selected.find(selection => selection === option) === undefined ){
      return false;
    }else{
      return true;
    }
  };

  const addSelection = (option: string) => {
    // TODO: Before
    // Why should we use slide function ?
    // let selection: Array<string> = selected;
    // selection.push(option);
    //setSelected(selection);

    // TODO: After
    // Working
    let selection: Array<string> = selected.slice();
    selection.push(option);
    setSelected(selection);
    // Or (Not working property)
    // let selection: Array<string> = selected;
    // selection.push(option);
    // setSelected([...selected, selection]);
  }

  const reduceSelection = (option: string) => {
    let selection: Array<string> = selected;
    selection = selection.filter(val => val !== option);
    setSelected(selection);
  }

  const launchCallback = () => callback(selected);

  const addMultipleSelection = (options: string[]) => {
    let selection: Array<string> = selected.slice();
    selection = selection.concat(options);
    setSelected(selection);
  };

  useEffect(() => {
    callback && launchCallback();
  }, [selected]);

  useEffect(() => {
    if(defaultSelected && defaultSelected.length) {
      addMultipleSelection(defaultSelected);
      /*defaultSelected.forEach(filterName => {
        addSelection(filterName);
      });*/
      // addSelection(defaultSelected[1]);
    }
  }, []);

  return (
    <div className={clsx('filter-buttons', className)}>
      { 
        options.map((option, key) => {
          let optionKey = Object.keys(option)[0];

          return (
            <Button
              primary={isSelected(optionKey)}
              secondary={!isSelected(optionKey)}
              key={`btn-option-${optionKey}-${key}`}
              onClick={() => handleSelect(optionKey)}>
              {option[optionKey]}
            </Button>
          )
        })
      }
    </div>
  );
}
export default FilterButtons;