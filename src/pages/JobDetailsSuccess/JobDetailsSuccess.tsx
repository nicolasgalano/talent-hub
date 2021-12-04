import React, { FC } from 'react'
import Success from '../../components/common/Success/Success';

const JobDetailsSuccess: FC = () => {
  return (
    <Success 
      title="Application sent"
      description="Your profile has been sent to the company or project that publishd the job offer. You will receive a copy by e-mail."
      btnText="Back to home page"
      to="/"
      />
  )
}
export default JobDetailsSuccess;