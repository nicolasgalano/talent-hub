import React, { FC, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';

// Files
import detailData from '../../data/single.json';
import useApi from '../../components/hooks/useApi';

// Custom component
import Detail from '../../components/common/Detail/Detail'
import SingleOrganizationAndProject, { SingleOrganizationAndProjectType } from '../../components/common/Single/SingleOrganizationAndProject';
import { formatOpeningDetails } from '../../services/formatData';

const OpeningDetails: FC = () => {
  const history = useHistory();
  const { slug }: { slug: string } = useParams();
  const [data, setData] = useState(null);

  const {response, loading, error} = useApi({
    url: `/jobs?Slug=${slug}`,
    method: 'GET'
  });

  // console.log('slug: ', slug);

  useEffect(() => {
    response && setData(formatOpeningDetails(response.data));
  }, [response])

  useEffect(() => {
    console.log(data)
  }, [data])


  const handleApply = () => history.push('./contact');

  return (
    <>
      { error && console.log(error)}
      {
        data !== null &&
        <Detail btnText="Apply" onClickAction={handleApply} >
          <SingleOrganizationAndProject data={data} />
        </Detail>
      }
  </>
  )
}
export default OpeningDetails;