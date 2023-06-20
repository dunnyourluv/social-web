import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Protected({children}: {children: JSX.Element}) {
    const {getUser} = useAuth()
    const user = getUser()
    if(!user) return <Navigate to="/login" />
    return children;
}

export default Protected;