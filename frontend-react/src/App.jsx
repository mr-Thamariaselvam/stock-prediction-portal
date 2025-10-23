import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/index.css";
import Comp from "./components/comp";
import { AuthProvider } from "../backend/authstate";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Comp.Header />
          <Routes>
            <Route path="/" element={<Comp.Main />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Comp.Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Comp.Login />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Comp.Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
          <Comp.Footer />
          <Comp.ToastContainer position="top-right" newestOnTop />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
