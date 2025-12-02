import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Schedule from "./pages/Schedule";
import Prizes from "./pages/Prizes";
import Register from "./pages/Register"
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/schedule"
        element={
          <Layout>
            <Schedule />
          </Layout>
        }
      />
      <Route
        path="/prizes"
        element={
          <Layout>
            <Prizes />
          </Layout>
        }
      />
      <Route
        path="/faq"
        element={
          <Layout>
            <FAQ />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
            <Layout>
                <Register />
            </Layout>
        }
      />
    </Routes>
  );
}
