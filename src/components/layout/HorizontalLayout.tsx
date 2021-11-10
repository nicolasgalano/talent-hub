import { FC, Fragment } from "react";

import 'semantic-ui-css/semantic.min.css'
import 'balloon-css/balloon.min.css'
import 'decentraland-ui/dist/themes/base-theme.css'
import 'decentraland-ui/dist/themes/alternative/light-theme.css'
import { Page } from "decentraland-ui/dist/components/Page/Page";

import Header from "./Header";
import Footer from "./Footer/Footer";
import "../../assets/scss/base/reset.scss";

const HorizontalLayout:FC = (props) => {
  return (
    <Fragment>
      <Header />
      <Page>
        { props.children }
      </Page>
      <Footer />
    </Fragment>
  );
}
 
export default HorizontalLayout;