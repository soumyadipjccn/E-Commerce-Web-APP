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

        },
        {
            path:"forgot-password",
            element: <ForgotPassword/>
        },

        {
            path: "Sign-Up",
            element: <SignUp/>
        }
      ]

    }
        
  ])

  export default router


    