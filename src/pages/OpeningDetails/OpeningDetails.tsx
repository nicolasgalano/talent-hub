import React, { FC } from 'react'
import { useHistory } from 'react-router';

// Files
import detailData from '../../data/single.json';

// Custom component
import Detail from '../../components/common/Detail/Detail'
import SingleOrganizationAndProject, { SingleOrganizationAndProjectType } from '../../components/common/Single/SingleOrganizationAndProject';

const OpeningDetails: FC = () => {
  const history = useHistory();

  // TODO: Only for testing porpuse
  // we get the name of the URL to use in the title of About
  let path: string | string[] = window.location.pathname;
  path = path.split('/');
  path = path[path.length - 1];
  
  let doc: SingleOrganizationAndProjectType = null;

  if(path === 'organization'){
    doc = detailData.organization;
  }else{
    doc = detailData.project;
  }

  const handleApply = () => history.push('./contact');

  return (
    <Detail btnText="Apply" onClickAction={handleApply} >
      <SingleOrganizationAndProject data={doc} />
    </Detail>
  )
}
export default OpeningDetails;