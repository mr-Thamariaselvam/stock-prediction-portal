import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/index.css";
import Comp from "./components/comp";
import { AuthProvider } from "../backend/authstate";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Comp.Header />
          <Routes>
            <Route path="/" element={<Comp.Main />} />
            <Route path="/register" element={<Comp.Register />} />
            <Route path="/login" element={<Comp.Login />} />
          </Routes>
          <Comp.Footer />
          <Comp.ToastContainer position="top-right" newestOnTop />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
