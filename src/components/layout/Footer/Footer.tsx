import { FC } from "react";
import { Link } from "react-router-dom";
import { LanguageDropdown } from "decentraland-ui";

import { discord, github, reddit, tw } from "../../../assets/icons";
import './Footer.scss';

const Footer:FC = () => {
  return ( 
    <div id="footer">
      <div className="ui container">
        <div className="content">
          <div className="menu-side">
            <LanguageDropdown 
              direction="right"
              upward
              locales={['en', 'es']} />
            <nav>
              <ul>
                <li><Link to="#">Press Kit</Link></li>
                <li><Link to="#">Legal Information</Link></li>
                <li><Link to="#">Home</Link></li>
              </ul>
            </nav>
          </div>
          <div className="social-side">
            <nav>
              <ul>
                <li><Link to="#"><img src={discord} /></Link></li>
                <li><Link to="#"><img src={reddit} /></Link></li>
                <li><Link to="#"><img src={github} /></Link></li>
                <li><Link to="#"><img src={tw} /></Link></li>
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