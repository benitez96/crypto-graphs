
import { createBrowserRouter } from "react-router-dom";

import {
  HomePage,
  ChartsPage,
  TablePage,
} from '../pages'
import { App } from "../App";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/charts", element: <ChartsPage /> },
      { path: "/table", element: <TablePage /> },
    ],
    // errorElement: <ErrorView />,
  },
]);
