import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Import the Login component
import Signup from "./pages/Signup";
import Signup2 from "./pages/Signup2";
import './App.css';
import "@/styles/globals.css"; 



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* errorElement={<ErrorPage />} */}
      <Route path="/" element={<Home />} /> {/* Home is the main route */}
      <Route path="/login" element={<Login />} /> {/* Login has its own route */}
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Signup2" element={<Signup2 />} />
    </Route>
  )
);

function App() {
  
  return <RouterProvider router={router} />;
}

export default App;
