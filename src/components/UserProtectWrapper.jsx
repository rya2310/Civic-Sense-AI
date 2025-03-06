import { useContext, createContext, Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContextUse } from "../context/AuthContext";

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { user, setUser } = AuthContextUse();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!token) {
                navigate('/login');
                return;
            }

            
            
            try {
                console.log("Fetching user profile...");

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                

                if (response.status === 201) {
                    setUser(response.data.user);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("Error fetching user profile:", err);
                localStorage.removeItem('token');
                navigate('/login');
            } 
        };

        fetchUserProfile();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
