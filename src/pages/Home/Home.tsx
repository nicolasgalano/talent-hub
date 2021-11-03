import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { Button, Center, Header, Hero, Page} from 'decentraland-ui'
import { openings3D, professionals3D } from '../../assets/illustrations';
import './Home.scss';
import Card3D from '../../components/common/Card3D/Card3D';
import Layout from '../../components/layout/Layout/Layout';

const Home:FC = () => {
  const { t, i18n } = useTranslation(namespaces.pages.hello);

  const handleChangeLanguage = (lang: string) => i18n.changeLanguage(lang);

  return (
    <Layout>
      <Page>
        <Hero>
          <Hero.Header>{t('welcome')} Decentraland !</Hero.Header>
          <Hero.Actions>
            <Button primary onClick={() => handleChangeLanguage('es')}>ES</Button>
            <Button onClick={() => handleChangeLanguage('en')}>EN</Button>
            <Button disabled>{t("buttons.save", { ns: namespaces.common })}</Button>
          </Hero.Actions>
        </Hero>

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