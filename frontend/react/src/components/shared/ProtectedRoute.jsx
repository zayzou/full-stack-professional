import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {

    const { isProduitAuthenticated } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isProduitAuthenticated()) {
            navigate("/")
        }
    })

    return isProduitAuthenticated() ? children : "";
}

export default ProtectedRoute;