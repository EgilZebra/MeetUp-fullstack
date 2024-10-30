import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { ErrorPage } from "./pages/ErrorPage"
import './App.css'
import { RateMU } from "./components/RateMu/RateMU"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} >
      <Route path="/" element={<LandingPage/>} />
      <Route path="/comment" element={<RateMU/>} />
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
