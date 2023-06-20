import OnlyNavbar from "../layouts/OnlyNavbar";
import Login from "../pages/public/Login";
import Feed from "../pages/protected/Feed";
import Register from "../pages/public/Register";
import Profile from "../pages/protected/Profile";
import Message from "../pages/protected/Message";

export interface Route {
    path: string;
    component: React.FC<any>
    layout?: React.FC<any> | null
}

const publicRoutes: Route[] = [
    {
        path: "/login",
        component: Login,
        layout: null
    },
    {
        path: "/sign-up",
        component: Register,
        layout: null
    }
]

const privateRoutes: Route[] = [
    {
        path: "/",
        component: Feed,
        layout: OnlyNavbar,
    },
    {
        path: "/profile/:id",
        component: Profile,
        layout: OnlyNavbar
    },
    {
        path: "/messages/:id",
        component: Message,
        layout: OnlyNavbar
    },
    {
        path: "/messages",
        component: Message,
        layout: OnlyNavbar
    }
]

export { publicRoutes, privateRoutes}