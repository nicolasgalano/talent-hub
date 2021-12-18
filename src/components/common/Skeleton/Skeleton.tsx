import React, { FC } from 'react'
import SkeletonsElement from '../SkeletonsElement/SkeletonsElement';

import './Skeleton.scss';

const Skeleton: FC = () => {
  return (
    <div className='skeleton-card'>
      <div className="header">
        <div className="image">
          <SkeletonsElement type='avatar' />
        </div>
        <div className="txt">
          <SkeletonsElement type='title' />
          <SkeletonsElement type='subtitle' />
        </div>
      </div>
      <div className="body">
        <SkeletonsElement type='text' />
        <SkeletonsElement type='text' />
        <SkeletonsElement type='text' />
      </div>
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </div>
  )
}

export default Skeleton
