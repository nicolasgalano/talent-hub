import { Field } from 'formik';
import React, { FC } from 'react'

// UI Semantic
import { Checkbox as CheckboxSemantic } from "semantic-ui-react";

interface CheckboxProps {
  name: string;
  label: string;
  valuee: string;
}

const Checkbox: FC<CheckboxProps> = ({name, label, valuee}) => {

  // console.log(value)

  return (
    <Field name={name} id={name}>
      {({ field: {value}, form: {setFieldValue} }) => (
        <CheckboxSemantic
          label={label}
          value={value}
          onClick={() => {
            console.log(value)
            setFieldValue(name, valuee)
          }}
          />
      )}
    </Field>
  )
}

export default Checkbox;
