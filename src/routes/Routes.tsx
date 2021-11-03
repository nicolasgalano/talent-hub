import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { allFlattenRoutes as routes, RouteInterface } from './index';

const Routes:FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route: RouteInterface, index: number) => {
          return (
            !route.children ?
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
                />
              : null
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;