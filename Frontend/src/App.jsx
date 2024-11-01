import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Signup2 from "./pages/Signup2";
import Login2 from "./pages/Login2";
import ProfilePage from "./pages/Profile";
import Search from "./pages/Search";
import CreateMeet from "./pages/CreateMeet";
import { ErrorPage } from "./pages/ErrorPage"
import { RateMU } from "./components/RateMu/RateMU"
import { RegisterMU } from "./components/RegisterMU/RegisterMU";
import './App.css';
import "@/styles/globals.css"; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} >
      <Route path="/" element={<Signup2 />} /> {/* Home is the main route */}
      <Route path="/Login2" element={<Login2 />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/CreateMeet" element={<CreateMeet />} />
      <Route path="/comment" element={<RateMU/>} />
      <Route path='/register' element={<RegisterMU />} />
    </Route>
  ), {basename: process.env.VITE_BASE}
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;