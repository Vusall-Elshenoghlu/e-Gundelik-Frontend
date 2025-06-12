import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import About from "../pages/User/About";
import Contact from "../pages/User/Contact";
import Home from "../pages/User/Home";
import NoPage from "../pages/User/NoPage";
import UserLogin from "../pages/User/UserLogin";
import UserProfile from "../pages/User/UserProfile";
import UserRegister from "../pages/User/UserRegister";
import UserRoot from "../pages/User/UserRoot";

export const ROUTES = [
    {
        path:"",
        element:<UserRoot/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<UserLogin/>
            },
            {
                path:"register",
                element:<UserRegister/>
            },
            {
                path:"about",
                element:<About/>
            },
            {
                path:"contact",
                element:<Contact/>
            },
            {
                path:"user-profile",
                element:<UserProfile/>
            },
            {
                path:"*",
                element:<NoPage/>
            },
        ]
    },
    {
        path:"/admin",
        element:<AdminLogin/>
    },
    {
        path:"/dashboard",
        element:<AdminRoot/>
    }

]