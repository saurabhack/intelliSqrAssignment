import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import App from "./App";
import SignUp from "./Pages/SignUp";

const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[{
            path:"/",
            element:<Login/>
        },
        {
            path:"/signUp",
            element:<SignUp/>
        }
    ]
    }
])

export default router