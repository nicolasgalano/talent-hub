import { FC, Fragment, useState } from "react";
import clsx from 'clsx';

// UI Decentraland
import { Dropdown as DropdownDecentraland } from 'decentraland-ui/dist/components/Dropdown/Dropdown';
import { ErrorMessage, Field } from "formik";

interface DropDownProps {
  name?: string;
  options: Array<string>;
  optionDefault: string;
  className?: string;
  onChange?: Function;
  direction?: 'left' | 'right' | null;
}

const Dropdown: FC<DropDownProps> = ({name, options, optionDefault, className, onChange, direction}) => {

  const [selected, setSelected] = useState(optionDefault);

  const handleClick = (value: string) => {
    setSelected(value);
    onChange && onChange(value);
  }

  return (
    <Fragment>
      {
        name && 
          <Fragment>
            <Field name={name} id={name}>
              {({ field: {value}, form: {setFieldValue} }) => (
                <DropdownDecentraland
                  text={selected}
                  direction={direction}
                  className={clsx("btn-dropdown", className)}>
                  <DropdownDecentraland.Menu>
                    {
                      options.map((option) => (
                        <DropdownDecentraland.Item 
                          onClick={() =>  {
                            handleClick(option);
                            setFieldValue(name, option);
                          }}
                          text={option}
                          key={`dropdown-option-${option}`} />
                      ))
                    }
                  </DropdownDecentraland.Menu>
                </DropdownDecentraland>
              )}
            </Field>
            <ErrorMessage name={name} className="message" component="div"/>
          </Fragment>
      }
      {
        !name &&
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
      }
    </Fragment>
  );
}
export default Dropdown;