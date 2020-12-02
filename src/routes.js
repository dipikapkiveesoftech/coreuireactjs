import React from 'react';

const Login = React.lazy(() => import('./views/pages/login/Login'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));

const routes = [
 
  { path: '/home', exact: true, name: 'Home' },
  { path: '/', name: 'Login', component:Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography }
];

export default routes;
