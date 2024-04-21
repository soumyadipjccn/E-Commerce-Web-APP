import {createBrowserRouter} from "react-router-dom";
import APP from '../App'

const router = createBrowserRouter([
    {
      path: "/",
      element: <APP/>,
      children: [
        {
            path:"",
            element: <Home/>
        },
        {
            path:"login",
            element: <Login/>

        }
      ]

    }
        
  ])

  export default router


    