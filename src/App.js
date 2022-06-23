import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout";
import Register from "./pages/register";

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
