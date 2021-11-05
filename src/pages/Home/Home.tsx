import { FC } from 'react';

import { Page } from 'decentraland-ui/dist/components/Page/Page'
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import { Header } from 'decentraland-ui/dist/components/Header/Header';
import { HeaderMenu }  from 'decentraland-ui/dist/components/HeaderMenu/HeaderMenu';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'


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
            title="Openings "
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

      <Page>
        <HeaderMenu>
          <HeaderMenu.Left>
            <Header size="medium">Feature Jobs</Header>
          </HeaderMenu.Left>
          <HeaderMenu.Right>
            <Button basic size="small">
              View More
              <Icon name="chevron right" />
            </Button>
          </HeaderMenu.Right>
        </HeaderMenu>
      </Page>
    </Layout>
  );
}
 
export default Home;