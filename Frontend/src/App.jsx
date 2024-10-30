import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import Profile from "./pages/Profile";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
    // errorElement={<ErrorPage />}
    >
      <Route path="/" element={<LandingPage />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
