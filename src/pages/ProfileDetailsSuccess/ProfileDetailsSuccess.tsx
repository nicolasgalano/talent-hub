import React, { FC } from 'react'
import Success from '../../components/common/Success/Success';

const ProfileDetailsSuccess: FC = () => {
  return (
    <Success 
      title="Message sent"
      description="Your message has been sent to the professional. You will receive a copy by e-mail."
      btnText="Back to home page"
      to="/"
      />
  )
}
export default ProfileDetailsSuccess;