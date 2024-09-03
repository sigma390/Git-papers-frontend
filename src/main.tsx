import ReactDOM from 'react-dom/client';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './index.css';
import { Layout } from './Layout.tsx';

import { Auth0Provider } from '@auth0/auth0-react';
import AboutDevs from './Components/About/AboutDevs.tsx';
import ChangePass from './Components/ChangePass/ChangePass.tsx';
import ChangePassAdmin from './Components/ChangePass/ChangePassAdmin.tsx';
import ChangePassFac from './Components/ChangePass/ChangePassFac.tsx';
import Dashboard from './Components/Dashboard/Dashboard.tsx';
import UserSummaryComponent from './Components/Dashboard/trial.tsx';
import Landing from './Components/Landing/Landing.tsx';
import AdminLogin from './Components/Login/Admin Login.tsx';
import FacultyLogin from './Components/Login/FacultyLogin.tsx';
import Login from './Components/Login/Login.tsx';
import StudentLogin from './Components/Login/StudentLogin.tsx';
import Papers from './Components/Papers/Papers.tsx';
import Posts from './Components/Posts/Posts.tsx';
import ResetPass from './Components/Reset-Pass/ResetPass.tsx';
import ResetPassAdmin from './Components/Reset-Pass/ResetPassAdmin.tsx';
import ResetPassFac from './Components/Reset-Pass/ResetPassFac.tsx';
import Schemes from './Components/SchemeSelect/Scheme.tsx';
import AdminSignup from './Components/Signup/AdminSignup.tsx';
import FacultySignup from './Components/Signup/FacultySignup.tsx';
import Signup from './Components/Signup/Signup.tsx';
import StudentSignup from './Components/Signup/StudentSignup.tsx';

//=======================>2nd WAY<=====================

const router = createBrowserRouter(
  createRoutesFromElements(
    //Route path '/' Roote Compoent Render Karaycha
    <Route path='/' element={<Layout />}>
      {/* //children routes */}
      <Route path='' element={<Landing />} />
      <Route path='/Papers' element={<Papers />} />
      <Route path='/tests' element={<UserSummaryComponent />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signup/student' element={<StudentSignup />} />
      <Route path='/signup/faculty' element={<FacultySignup />} />
      <Route path='/signup/admin' element={<AdminSignup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login/student' element={<StudentLogin />} />
      <Route path='/login/faculty' element={<FacultyLogin />} />
      <Route path='/login/admin' element={<AdminLogin />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='admin/dashboard' element={<Dashboard />} />
      <Route path='/scheme' element={<Schemes />} />
      <Route path='/reset-pass' element={<ResetPass />} />
      <Route path='/reset-pass/faculty' element={<ResetPassFac />} />
      <Route path='/reset-pass/admin' element={<ResetPassAdmin />} />
      <Route path='/change-pass' element={<ChangePass />} />
      <Route path='/change-pass/faculty' element={<ChangePassFac />} />
      <Route path='/change-pass/admin' element={<ChangePassAdmin />} />
      <Route path='/about-devs' element={<AboutDevs />} />
      {/* //Dynamic Routing */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain='dev-vlhszc1hokefz48k.us.auth0.com'
    clientId='dCedBqWn6U7GcBC6TEQ7RZGjqnr11GRI'
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
