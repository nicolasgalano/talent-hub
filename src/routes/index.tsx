import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import Openings from "../pages/Openings/Openings";
import PostAJobs from "../pages/PostAJobs/PostAJobs";
import Success from "../pages/PostajobSuccess/PostajobSuccess";
import ProfileDetails from "../pages/ProfileDetails/ProfileDetails";
import Professionals from "../pages/Professionals/Professionals";

export interface RouteInterface {
  path: string;
  name?: string;
  component?: React.ComponentType;
  children?: Array<RouteInterface>;
  exact?: boolean;
}

// root routes
const rootRoute: RouteInterface = {
  path: '/',
  component: Home,
  exact: true,
};

const openingsRoutes: RouteInterface = {
  path: '/openings',
  name: 'Openings',
  component: Openings,
  exact: true,
  children: [
    {
      path: '/openings/post-a-job',
      name: 'Post a job',
      component: PostAJobs,
      exact: true
    },
    {
      path: '/openings/post-a-job/success',
      name: 'Success',
      component: Success,
    },
  ]
}

const jobsRoutes: RouteInterface = {
  path: '/job',
  name: 'Job details',
  exact: true,
  children: [
    {
      path: '/job/organization',
      name: 'Organization',
      component: JobDetails
    },
    {
      path: '/job/project',
      name: 'Project',
      component: JobDetails,
    },
  ]
}

const professionalsRoutes: RouteInterface = {
  path: '/professionals',
  name: 'Professionals',
  component: Professionals,
  exact: true,
  children: [
    {
      path: '/professionals/create',
      name: 'Create a profile',
    },
    {
      path: '/professional/withphoto',
      name: 'Profile details with pic ',
      component: ProfileDetails,
    },
    {
      path: '/professional/withoutphoto',
      name: 'Profile details without pic ',
      component: ProfileDetails,
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
  professionalsRoutes,
];

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, allFlattenRoutes };