import { FC, Fragment } from 'react';

import { useTranslation } from 'react-i18next';

import { Page } from 'decentraland-ui/dist/components/Page/Page'

import { openings3D, professionals3D, subscriptionMailbox } from '../../assets/illustrations';
import Card3D from '../../components/common/Card3D/Card3D';
import { namespaces } from '../../i18n/i18n.constants';
import Typography from '../../components/common/Typography/Typography';
import FeaturedCards from '../../components/common/FeaturedCards/FeaturedCards';
import SubscriptionBox from '../../components/common/SubscriptionBox/SubscriptionBox';
import jobs from '../../data/jobs.json';
import professionals from '../../data/professionals.json';
import './Home.scss';

const Home:FC = () => {
  const { t } = useTranslation(namespaces.pages.hello);

  return (
    <Fragment>
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

      <div className="ui container" id="featured-jobs">
        <FeaturedCards 
          data={jobs}
          title="Featured jobs" 
          action="view all jobs"
          to="/openings" />
      </div>

      <div className="ui container" id="featured-professionals">
        <FeaturedCards 
          data={professionals}
          title="Featured professionals" 
          action="view all professionals"
          to="/professional" />
      </div>

      <div className="ui container" id="subscription-box">
        <SubscriptionBox
          imgSrc={subscriptionMailbox}
          title="Get the latest updates"
          description="Stay up to date with the latest developments in the metaverse."
          placeholder="mail@domain.com"
          buttonText="SUBSCRIBE"
        />
      </div>

    </Fragment>
  );
}
 
export default Home;