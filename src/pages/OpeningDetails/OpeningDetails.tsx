import React, { FC, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';

// Files
import useApi from '../../components/hooks/useApi';

// Custom component
import Detail from '../../components/common/Detail/Detail'
import SingleOrganizationAndProject, { SingleOrganizationAndProjectType } from '../../components/common/Single/SingleOrganizationAndProject';
import { formatOpeningDetails } from '../../utils/formatData';

const OpeningDetails: FC = () => {
  const history = useHistory();
  const { slug }: { slug: string } = useParams();
  const [data, setData] = useState<SingleOrganizationAndProjectType>(null);

  const {response, loading, error} = useApi({
    url: `/jobs?Slug=${slug}`,
    method: 'GET'
  });

  useEffect(() => {
    response && setData(formatOpeningDetails(response.data));
  }, [response])

  return (
    <>
      { error && console.log(error)}
      {
        data !== null &&
        <Detail 
          urlParent='/openings/' 
          btnText="Apply" 
          onClickAction={() => history.push({
            pathname: `./${data.slug}/apply`,
            state: {
              positionOffered: data.profession_job_name
            }
          })}
          >
          <SingleOrganizationAndProject data={data} />
        </Detail>
      }
  </>
  )
}
export default OpeningDetails;