import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HorizontalLayout from "../components/layout/HorizontalLayout";
import { allFlattenRoutes as routes, RouteInterface } from './index';

const Routes:FC = () => {

  const getLayout = () => {
    let useThisLayout: React.ComponentType = HorizontalLayout;
    return useThisLayout;
  }

  const Layout = getLayout();

  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          {routes.map((route: RouteInterface, index: number) => {
            return (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={index}
                />
            );
          })}
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;