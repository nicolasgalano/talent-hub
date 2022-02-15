import React, { FC, Fragment } from 'react'

// UI Semantic
import { Checkbox } from "semantic-ui-react";

// Validation
import { ErrorMessage, Field } from 'formik';

type option = {
  label: string;
  value: string | number;
}

interface CheckboxGroupProps {
  name: string;
  options: Array<option>;
  radio?: boolean;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({name, options, radio}) => {
  return (
    <Fragment>
      <Field name={name} id={name}>
        {({ field }) => (
          options.map((option, key) => (
            <Checkbox
              label={option.label}
              name={field.name}
              value={option.value}
              id={option.value}
              key={option.value}
              type={radio ? 'radio' : 'checkbox'}
              checked={radio && field.value === option.value}
              onChange={field.onChange}
              radio={radio}
              />
          ))
        )}
      </Field>
      <ErrorMessage name={name} className="form-message error" component="div" />
    </Fragment>
  )
}
export default CheckboxGroup;