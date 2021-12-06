import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import Openings from "../pages/Openings/Openings";
import PostAJobs from "../pages/PostAJobs/PostAJobs";
import ProfileDetails from "../pages/ProfileDetails/ProfileDetails";
import Professionals from "../pages/Professionals/Professionals";
import PostajobSuccess from "../pages/PostajobSuccess/PostajobSuccess";
import JobDetailsSuccess from "../pages/JobDetailsSuccess/JobDetailsSuccess";
import JobDetailsContact from "../pages/JobDetailsContact/JobDetailsContact";
import CreateAProfile from "../pages/CreateAProfile/CreateAProfile";
import CreateAProfileSuccess from "../pages/CreateAProfileSuccess/CreateAProfileSuccess";

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
      component: PostajobSuccess,
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
    {
      path: '/job/contact',
      name: 'Contact',
      component: JobDetailsContact,
      exact: true,
    },
    {
      path: '/job/contact/success',
      name: 'Success',
      component: JobDetailsSuccess,
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
      component: CreateAProfile,
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
    {
      path: '/professional/withgallery',
      name: 'Profile details with gallery ',
      component: ProfileDetails,
    },
    {
      path: '/professional/create/success',
      name: 'Success',
      component: CreateAProfileSuccess,
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