
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Import the Login component
import Signup from "./pages/Signup";
import Signup2 from "./pages/Signup2";
import { LandingPage } from "./pages/LandingPage"
import { ErrorPage } from "./pages/ErrorPage"
import { RateMU } from "./components/RateMu/RateMU"
import './App.css';
import "@/styles/globals.css"; 



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} >
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} /> {/* Login has its own route */}
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Signup2" element={<Signup2 />} />
         <Route path="/comment" element={<RateMU/>} />
    </Route>
  )
);

function App() {
  
  return <RouterProvider router={router} />;
}

export default App;
