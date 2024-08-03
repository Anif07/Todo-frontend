import { useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Login from "./pages/login";
import Pleaselogin from "./pages/pleaselogin";

function App() {
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/"
          element={token ? <Home token={token} /> : <Pleaselogin />}
        />
        {/* <Route path="/" element={<Home token={token} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
