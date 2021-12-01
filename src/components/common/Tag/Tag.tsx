import React, { FC } from 'react'

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button'

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