import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Page } from 'decentraland-ui/dist/components/Page/Page'

import { openings3D, professionals3D } from '../../assets/illustrations';
import Card3D from '../../components/common/Card3D/Card3D';
import Layout from '../../components/layout/Layout/Layout';
import { namespaces } from '../../i18n/i18n.constants';
import Typography from '../../components/common/Typography/Typography';
import './Home.scss';

const Home:FC = () => {
  const { t } = useTranslation(namespaces.pages.hello);

  return (
    <Layout>
      <Page>
        <div className="home-hero">
          <div className="hero-top">
            <Typography variant="h1" element="h2" weight="700" className="title">{t("shape_the_future")}</Typography>
            <Typography variant="h6" element="h3" weight="400" className="description">The Decentraland Talent Hub is your destination for jobs in the virtual social world.</Typography>
          </div>
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
        </div>
      </Page>
    </Layout>
  );
}
 
export default Home;