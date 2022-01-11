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
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({name, options}) => {
  return (
    <Fragment>
      <Field name={name} id={name}>
        {({ field }) => (
          options.map(option => (
            <Checkbox
              label={option.label}
              name={field.name}
              value={option.value}
              id={option.value}
              key={option.value}
              type='checkbox'
              onChange={field.onChange}
              />
          ))
        )}
      </Field>
      <ErrorMessage name={name} className="message" component="div" />
    </Fragment>
  )
}
export default CheckboxGroup;