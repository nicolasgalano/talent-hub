import React, { FC } from 'react'
import Success from '../../components/common/Success/Success';

const PostajobSuccess: FC = () => {
  return (
    <Success 
      title="Job post submitted"
      description="Your post will be live as soon as the Decentraland Foundation team has assessed and approved the details."
      btnText="Take me to my listing"
      to="./"
      />
  )
}
export default PostajobSuccess;