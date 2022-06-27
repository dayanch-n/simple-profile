import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/layout";
import Login from "./pages/login";
import Register from "./pages/register";

import { privateRoutes } from "./routes";
import RequireAuth from "./auth";
import Page404 from "./pages/404";

function App() {
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const convertUser = JSON.parse(user);
    if (convertUser) {
      setLoadingUser(false);
      setUser(convertUser);
    }
  }, []);

  return !loadingUser ? (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {privateRoutes.map(({ element, ...privateRouteProps }) => (
            <Route
              element={
                <RequireAuth
                  user={user}
                  redirectTo={`/login?redirectTo=${privateRouteProps.path}`}
                >
                  {element}
                </RequireAuth>
              }
              {...privateRouteProps}
              key={`privateRoute-${privateRouteProps.path}`}
            />
          ))}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </Layout>
  ) : (
    <div />
  );
}

export default App;
