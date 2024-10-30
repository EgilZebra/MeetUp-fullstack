import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import UserProfile from "./pages/UserProfile";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
    // errorElement={<ErrorPage />}
    >
      <Route path="/" element={<LandingPage />} />
      <Route path="/profile" element={<UserProfile />} />
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
