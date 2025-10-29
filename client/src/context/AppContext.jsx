import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();


const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credits, setCredits] = useState(false);
    const navigate = useNavigate();

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const loadCreditData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/users/credits`, { headers: { token } });
            if (data.success) {
                setCredits(data.credits);
                setUser(data.user);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Failed to load credit data");
        }
    }


    
    const generateImages = async (prompt) => {

        try {
            const { data } = await axios.post(`${backendURL}/api/images/generate-image`, { prompt }, { headers: { token } });
            if (data.success) {
                loadCreditData();
                toast.success("Image generated successfully");
                return data.image;
            }
            else {
                  loadCreditData();
                toast.error(data.message);
                if(data.creditBalance === 0) {
                    navigate('/buycredit');
                }
            }
        }
        catch (err) {
            toast.error("Failed to generate images");
            console.log(err);
        }
    }
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        if (token) {
            loadCreditData();
        }
    }, [token]);

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendURL,
        token, setToken,
        credits, setCredits,
        loadCreditData, logout, generateImages
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;


