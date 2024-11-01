import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import Signup2 from "./pages/Signup2";
import { ErrorPage } from "./pages/ErrorPage"
import { RateMU } from "./components/RateMu/RateMU"
import Profile from "./pages/Profile";
import './App.css';
import "@/styles/globals.css"; 
import { RegisterMU } from "./components/RegisterMU/RegisterMU";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} >
      <Route path="/" element={<LandingPage/>} />
      <Route path="/comment" element={<RateMU/>} />
      <Route path="/profile" element={<Profile />} 
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Signup2" element={<Signup2 />} />
         <Route path="/comment" element={<RateMU/>} />
      <Route path='/register' element={<RegisterMU />} />
    </Route>
  )
);



function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );

export default App;
