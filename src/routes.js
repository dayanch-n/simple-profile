import Account from "./pages/account";
import People from "./pages/people";

export const routes = [];

export const privateRoutes = [
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/people",
    element: <People />
  }
];
