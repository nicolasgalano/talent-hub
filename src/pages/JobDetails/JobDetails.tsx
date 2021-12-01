import React, { FC } from 'react'

// Files
import detailData from '../../data/single.json';

// Custom component
import Detail from '../../components/common/Detail/Detail'
import SingleOrganizationAndProject, { SingleOrganizationAndProjectType } from '../../components/common/Single/SingleOrganizationAndProject';

const JobDetails: FC = () => {

  // TODO: Only for testing porpuse
  // we get the name of the URL to use in the title of About
  let path = window.location.pathname;
  path = path.split('/').at(-1);
  
  let doc: SingleOrganizationAndProjectType = null;

  if(path === 'organization'){
    doc = detailData.organization;
  }else{
    doc = detailData.project;
  }

  return (
    <Detail btnText="Apply">
      <SingleOrganizationAndProject data={doc} />
    </Detail>
  )
}
export default JobDetails