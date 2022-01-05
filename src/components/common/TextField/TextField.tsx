import clsx from "clsx";
import { FC, useRef, useState } from "react";

// Files
import './TextField.scss';
import Label from '../Label/Label';

interface TextFieldProps {
  label?:     string;
  element:    'input' | 'textarea';
  type?:      'text' | 'number' | 'password' | 'email';
  required?:  boolean;
  htmlFor:    string;
}

const TextField: FC<TextFieldProps> = ({label, element, type, required, htmlFor}) => {

  const fieldRef = useRef(null);
  const [classListContainer, setClassListContainer] = useState('');

  const onFocus = () => {
    if (!fieldRef.current) return;

    fieldRef.current.focus();
    setClassListContainer('active');
  }

  const onBlur = () => {
    if (!fieldRef.current) return;

    fieldRef.current.blur();
    fieldRef.current.value === '' ?
      setClassListContainer('') :
      setClassListContainer('filled');
  }

  return (
    <div className={clsx('form-field', classListContainer)}>
      <div className="control">
        {
          label &&
            <Label type="form" htmlFor={htmlFor} required={required}>{ label }</Label>
        }
        {
          element === 'input' ?
            <input 
              ref={fieldRef} 
              onFocus={onFocus}
              onBlur={onBlur}
              name={htmlFor}
              id={htmlFor} 
              type={type}
              className='input' /> :
            <textarea
              ref={fieldRef} 
              onFocus={onFocus}
              onBlur={onBlur}
              name={htmlFor}
              id={htmlFor} 
              className='textarea'
              rows={3}
              />
        }
      </div>
    </div>
  );
}
export default TextField;