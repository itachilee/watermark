import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


import { createRoot } from "react-dom/client";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
        <Link to="app">app</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "app",
    element: <App></App>,
  },
]);

// createRoot(document.getElementById("root")!).render(
//   <RouterProvider router={router} />
// );
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
