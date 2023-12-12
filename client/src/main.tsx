import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Viewer from './Viewer.tsx';
import StoreProvider from './utils/Provider.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },{
    path: "/viewer",
    element: <Viewer/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
   <StoreProvider>
    <RouterProvider router={router} />
   </StoreProvider>
  </React.StrictMode>,
)
