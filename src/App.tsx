import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/public/NotFound";
import { Route as IRoute, privateRoutes, publicRoutes } from "./routes";
import OnlyNavbar from "./layouts/OnlyNavbar";
import React, { useContext, useLayoutEffect } from "react";
import Protected from "./layouts/Protected";
import { GlobalContext } from "./context/GlobalContext";

const generateRoutes = (routes: IRoute[], isProtected: boolean = false) => {
    return routes.map((route, index) => {
        const Layout = route.layout
            ? route.layout
            : route.layout === null
            ? React.Fragment
            : OnlyNavbar;
        const ProtectedLayout = isProtected ? Protected : React.Fragment;
        const Comp = route.component;
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <ProtectedLayout>
                        <Layout>
                            <Comp />
                        </Layout>
                    </ProtectedLayout>
                }
            />
        );
    });
}

function App() {
    const { useTheme } = useContext(GlobalContext);
    const [theme, setTheme] = useTheme();

    useLayoutEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme) {
            setTheme(theme);
        }
    }, []);

    useLayoutEffect(() => {
        if (theme) {
            document.documentElement.classList.add(theme);
        } else {
            document.documentElement.classList.remove("dark");
            // document.documentElement.classList.remove("light");
        }
    }, [theme]);

    return (
        <Router>
            <Routes>
                {generateRoutes(publicRoutes)}
                {generateRoutes(privateRoutes, true)}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
