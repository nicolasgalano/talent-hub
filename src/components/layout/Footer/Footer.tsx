import { FC } from "react";
import { Link } from "react-router-dom";

import { LanguageDropdown } from 'decentraland-ui/dist/components/LanguageDropdown/LanguageDropdown'
import { discord, github, reddit, tw } from "../../../assets/icons";
import './Footer.scss';
import { useTranslation } from "react-i18next";
import { namespaces } from "../../../i18n/i18n.constants";

const Footer:FC = () => {
  
  const { t, i18n } = useTranslation(namespaces.layout);
  
  const handleChangeLanguage = (lang: string) => i18n.changeLanguage(lang);

  return ( 
    <div id="footer">
      <div className="ui container">
        <div className="content">
          <div className="menu-side">
            <LanguageDropdown 
              direction="right"
              upward
              locale={
                (i18n.language === "es" || i18n.language === "en") ? 
                  i18n.language : 
                  "en"
              }
              locales={['en', 'es']}
              onChange={(e, data) => (
                typeof data.value === 'string'  &&
                  handleChangeLanguage(data.value)
              )} />
            <nav>
              <ul>
                <li><Link to="#">{t("footer.press-kit")}</Link></li>
                <li><Link to="#">{t("footer.legal-information")}</Link></li>
                <li><Link to="#">{t("footer.home")}</Link></li>
              </ul>
            </nav>
          </div>
          <div className="social-side">
            <nav>
              <ul>
                <li><Link to="#"><img src={discord} alt="discord" /></Link></li>
                <li><Link to="#"><img src={reddit} alt="reddit" /></Link></li>
                <li><Link to="#"><img src={github} alt="github" /></Link></li>
                <li><Link to="#"><img src={tw} alt="twitter" /></Link></li>
              </ul>
            </nav>
            <span>© 2018 Decentraland</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Footer;