import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
    // errorElement={<ErrorPage />}
    >
      <Route path="/" element={<LandingPage/>} />
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
