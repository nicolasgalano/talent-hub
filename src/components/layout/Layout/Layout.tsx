import { FC, Fragment } from "react";

import Header from "../Header";
import Footer from "../Footer/Footer";

const Layout:FC = (props) => {
  return (
    <Fragment>
      <Header />
      { props.children }
      <Footer />
    </Fragment>
  );
}
 
export default Layout;