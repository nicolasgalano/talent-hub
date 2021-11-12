import { FC, useState } from "react";
import clsx from 'clsx';

// UI Decentraland
import { Dropdown as DropdownDecentraland } from 'decentraland-ui/dist/components/Dropdown/Dropdown';

interface DropDownProps {
  options: Array<string>;
  optionDefault: string;
  className?: string;
  callback?: Function;
}

const Dropdown: FC<DropDownProps> = ({options, optionDefault, className, callback}) => {

  const [selected, setSelected] = useState(optionDefault);

  const handleClick = (value: string) => {
    setSelected(value);
    callback && callback(value);
  }

  return (
    <DropdownDecentraland
      text={selected}
      direction="left" 
      className={clsx("btn-dropdown", className)}>
      <DropdownDecentraland.Menu>
        {
          options.map((option) => (
            <DropdownDecentraland.Item 
              onClick={() => handleClick(option)}
              text={option}
              key={`dropdown-option-${option}`} />
          ))
        }
      </DropdownDecentraland.Menu>
    </DropdownDecentraland>
  );
}
export default Dropdown;