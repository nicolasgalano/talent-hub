import React, { FC } from 'react'

// Files
import detailData from '../../data/single.json';

// Custom component
import Detail from '../../components/common/Detail/Detail'
import SingleProfile, { SingleProfileType } from '../../components/common/Single/SingleProfile';

const ProfileDetails: FC = () => {
  // TODO: Only for testing porpuse
  // we get the name of the URL to use in the title of About
  let path = window.location.pathname;
  path = path.split('/').at(-1);
  
  let doc: SingleProfileType = null;

  switch (path) {
    case 'withphoto':
      doc = detailData.candidate_with_photo
      break;
    case 'withoutphoto':
      doc = detailData.candidate_without_photo
      break;
    default:
      doc = detailData.candidate_with_photo
      break;
  }

  return (
    <Detail btnText="Contact">
      <SingleProfile data={doc} />
    </Detail>
  )
}
export default ProfileDetails