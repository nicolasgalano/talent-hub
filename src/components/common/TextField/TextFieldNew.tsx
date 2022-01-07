import { FC, useRef, useState } from "react";

// Files
import './TextField.scss';
import { ErrorMessage, FieldHookConfig, useField } from "formik";
import clsx from "clsx";

// Components
import Label from '../Label/Label';

interface TextFieldProps {
  label?:     string;
  element:    'input' | 'textarea';
}

const TextFieldNew: FC<TextFieldProps & FieldHookConfig<string>> = ({label, element, ...props}) => {

  const [classListContainer, setClassListContainer] = useState('');
  const [field, meta] = useField(props);
  const fieldRef = useRef(null);

  const onFocus = () => {
    if (!fieldRef.current) return;
    console.log('onFocus');

    fieldRef.current.focus();
    setClassListContainer('active');
  }

  const onBlur = () => {
    console.log('onBlur');
    if (!fieldRef.current) return;

    fieldRef.current.blur();
    fieldRef.current.value === '' ?
      setClassListContainer('') :
      setClassListContainer('filled');
  }

  return (
    <div className={clsx(
      'form-field', 
      classListContainer,
      {
        'error': meta.touched && meta.error
      }
      )}>
      <div className="control">
        {
          label &&
            <Label type="form" htmlFor={props.id} required={props.required}>{ label }</Label>
        }
        { 
          element === 'input' ?
            <input 
              {...field}
              ref={fieldRef} 
              onFocus={onFocus}
              onBlur={onBlur}
              name={props.name}
              id={props.id}
              type={props.type}
              className='input' 
              /> :
            <textarea
              {...field}
              ref={fieldRef} 
              onFocus={onFocus}
              onBlur={onBlur}
              name={props.name}
              id={props.id}
              className='textarea'
              rows={3}
              />
        }
      </div>
      <ErrorMessage name={props.name} className="message" component="div"/>
    </div>
  );
}
export default TextFieldNew;