import React, { FC } from 'react'

// Files
import './Tag.scss';

interface TagProps {
  children: React.ReactNode;
}

const Tag: FC <TagProps> = ({ children }) => {
  return (
    <div className="button tag">
      { children }
    </div>
  )
}
export default Tag