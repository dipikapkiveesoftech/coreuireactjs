import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Userlist = React.lazy(() => import('./views/user/userlist/Userlist'));
const Adduserlist = React.lazy(() => import('./views/user/userlist/Adduserlist'));
const Edituserlist = React.lazy(() => import('./views/user/userlist/Edituserlist'));
const Profile = React.lazy(() => import('./views/user/profile/Profile'));
const Userdetail = React.lazy(() => import('./views/user/userdetail/Userdetail'));


const routes = [
 
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', name: 'User', component: Userlist, exact: true },
  { path: '/user/userlist', name: 'Userlist', component: Userlist },
  { path: '/user/adduserlist', name: 'Adduser', component: Adduserlist },
  { path: '/user/edituserlist/:id',name: 'Edituser',component: Edituserlist },
  { path: '/user/profile', name: 'Profile', component: Profile },
  { path: '/user/userdetail/:id', name: 'Userdetail', component: Userdetail },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
];

export default routes;
