import React, { FC } from 'react'
import Success from '../../components/common/Success/Success';

const CreateAProfileSuccess: FC = () => {
  return (
    <Success 
      title="Profile created"
      description="Your profile will go live once approved by the team at the Decentraland Foundation."
      btnText="Back to home page"
      to="/"
      />
  )
}
export default CreateAProfileSuccess;