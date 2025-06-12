
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import { ROUTES } from './routes/router'
import 'bootstrap/dist/css/bootstrap.min.css';
const router = createBrowserRouter(ROUTES)
function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
