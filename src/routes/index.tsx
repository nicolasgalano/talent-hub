import Home from "../pages/Home/Home";

export interface RouteInterface {
  path: string;
  name?: string,
  element?: React.ReactElement;
  children?: Array<RouteInterface>;
}

// root routes
const rootRoute: RouteInterface = {
  path: '/',
  element: <Home />,
};

const openingsRoutes: RouteInterface = {
  path: '/openings',
  name: 'Openings',
  children: [
    {
      path: '/openings/create',
      name: 'Post a job',
    },
  ]
}

const jobsRoutes: RouteInterface = {
  path: '/job',
  name: 'Job details',
  children: [
    {
      path: '/job/organization',
      name: 'Organization',
    },
    {
      path: '/job/project',
      name: 'Project',
    },
  ]
}

// Flatten the list of all nested routes
const flattenRoutes = (routes: Array<RouteInterface>) => {
  let flatRoutes: Array<RouteInterface> = [];

  routes = routes || [];
  routes.forEach(item => {
      flatRoutes.push(item);

      if (typeof item.children !== 'undefined') {
          flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
      }
  });
  return flatRoutes;
};

// All routes
const allRoutes: Array<RouteInterface> = [
  rootRoute,
  openingsRoutes,
  jobsRoutes,
];

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, allFlattenRoutes };