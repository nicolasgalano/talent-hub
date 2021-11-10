import { FC, Fragment } from "react";

import 'semantic-ui-css/semantic.min.css'
import 'balloon-css/balloon.min.css'
import 'decentraland-ui/dist/themes/base-theme.css'
import 'decentraland-ui/dist/themes/alternative/light-theme.css'

import Header from "./Header";
import Footer from "./Footer/Footer";
import "../../assets/scss/base/reset.scss";

const HorizontalLayout:FC = (props) => {
  return (
    <Fragment>
      <Header />
      { props.children }
      <Footer />
    </Fragment>
  );
}
 
export default HorizontalLayout;