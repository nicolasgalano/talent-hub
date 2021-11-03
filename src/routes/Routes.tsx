import { FC } from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
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
                element={route.element}
                />
              : null
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;