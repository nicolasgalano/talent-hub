import Home from "../pages/Home/Home";
// Openings
import Openings from "../pages/Openings/Openings";
import OpeningDetails from "../pages/OpeningDetails/OpeningDetails";
import OpeningApply from "../pages/OpeningApply/OpeningApply";
import OpeningApplySuccess from "../pages/OpeningApplySuccess/OpeningApplySuccess";
import OpeningCreate from "../pages/OpeningCreate/OpeningCreate";
import OpeningCreateSuccess from "../pages/OpeningCreateSuccess/OpeningCreateSuccess";
// Professionals
import Professionals from "../pages/Professionals/Professionals";
import ProfessionalDetail from "../pages/ProfessionalDetail/ProfessionalDetail";
import ProfessionalContactSuccess from "../pages/ProfessionalContactSuccess/ProfessionalContactSuccess";
import ProfessionalCreate from "../pages/ProfessionalCreate/ProfessionalCreate";
import ProfessionalCreateSuccess from "../pages/ProfessionalCreateSuccess/ProfessionalCreateSuccess";

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
      component: OpeningCreate,
      exact: true
    },
    {
      path: '/openings/post-a-job/success',
      name: 'Success',
      component: OpeningCreateSuccess,
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
      component: OpeningDetails
    },
    {
      path: '/job/project',
      name: 'Project',
      component: OpeningDetails,
    },
    {
      path: '/job/:slug',
      name: 'Detail',
      component: OpeningDetails,
      exact: true,
    },
    {
      path: '/job/:slug/apply',
      name: 'Apply',
      component: OpeningApply,
    },
    {
      path: '/job/:slug/apply/success',
      name: 'Success',
      component: OpeningApplySuccess,
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
      path: '/professional/withphoto',
      name: 'Profile details with pic ',
      component: ProfessionalDetail,
    },
    {
      path: '/professional/withoutphoto',
      name: 'Profile details without pic ',
      component: ProfessionalDetail,
    },
    {
      path: '/professional/withgallery',
      name: 'Profile details with gallery ',
      component: ProfessionalDetail,
    },
    {
      path: '/professionals/create',
      name: 'Create a profile',
      component: ProfessionalCreate,
      exact: true,
    },
    {
      path: '/professional/create/success',
      name: 'Success',
      component: ProfessionalCreateSuccess,
      exact: true,
    },
    {
      path: '/professional/:slug',
      name: 'Detail',
      component: ProfessionalDetail,
      exact: true,
    },
    {
      path: '/professional/:slug/success',
      name: 'Contact success',
      component: ProfessionalContactSuccess,
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