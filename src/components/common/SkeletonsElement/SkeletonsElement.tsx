import React, { FC } from 'react'

import './SkeletonsElement.scss';

interface SkeletonsElementProps {
  type: 'title' | 'subtitle' | 'text' | 'avatar' | 'thumbnail';
}

const SkeletonsElement: FC <SkeletonsElementProps> = ({type}) => {
  const classes = `skeleton-element skeleton-${type}`;
  return (
    <div className={classes}></div>
  )
}

export default SkeletonsElement
