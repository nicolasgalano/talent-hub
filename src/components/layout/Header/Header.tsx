import { FC } from "react";
import { Navbar } from 'decentraland-ui/dist/components/Navbar/Navbar';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import { useTranslation } from "react-i18next";
import { namespaces } from "../../../i18n/i18n.constants";

import './Header.scss';

const Header:FC = () => {
  const { t } = useTranslation(namespaces.layout);

  return (
    <Navbar
      className="navbar"
      activePage="Talent Hub"
      leftMenu={
        <>
          {/* <Menu.Item>{t("buttons.save", {ns: namespaces.common})}</Menu.Item> */}
          <Menu.Item>{t("header.marketplace")}</Menu.Item>
          <Menu.Item>{t("header.builder")}</Menu.Item>
          <Menu.Item>{t("header.docs")}</Menu.Item>
          <Menu.Item>{t("header.events")}</Menu.Item>
          <Menu.Item>{t("header.dao")}</Menu.Item>
          <Menu.Item>{t("header.blog")}</Menu.Item>
          <Menu.Item active={true}>{t("header.talent-hub")}</Menu.Item>
        </>
      } />
  );
}
 
export default Header;