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
    <Button className="tag" secondary>
      { children }
    </Button>
  )
}
export default Tag