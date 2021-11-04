import { FC } from 'react';

import { Page } from 'decentraland-ui/dist/components/Page/Page'

import { openings3D, professionals3D } from '../../assets/illustrations';
import Card3D from '../../components/common/Card3D/Card3D';
import Layout from '../../components/layout/Layout/Layout';
import './Home.scss';

const Home:FC = () => {

  return (
    <Layout>
      <Page>
        <div className="cards3d">
          <Card3D
            imgSrc={openings3D}
            title="Openings"
            description="Find or post positions for modellers, developers, designers and more."
            to="#"
            color="orange"
          />
          <Card3D
            imgSrc={professionals3D}
            title="Professionals"
            description="Search for skilled professionals or create your own profile to showcase your talent."
            to="#"
            color="pink"
          />
        </div>
      </Page>
    </Layout>
  );
}
 
export default Home;