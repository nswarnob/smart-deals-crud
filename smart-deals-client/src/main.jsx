import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout.jsx';
import Home from './Components/Home/Home.jsx';
import AllProducts from './Components/AllProducts.jsx/AllProducts.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import Register from './Components/Register/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
      {
        index:true,
        Component: Home,
      },
      {
        path: 'allproducts',
        Component: AllProducts
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
