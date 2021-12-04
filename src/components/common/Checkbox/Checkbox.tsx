import React from 'react'

import './Checkbox.scss';

const Checkbox = () => {
  return (
    <div className="box-checkbox">
      <input type="checkbox" id="test" />
      <label htmlFor="test" className="checkbox-btn">
        <span className="icon"></span>
      </label>
    </div>
  )
}

export default Checkbox
