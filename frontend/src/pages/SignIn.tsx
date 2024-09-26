import { useEffect } from "react";
import InComp from "../components/InComp";
import SideComp from "../components/SideComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignIn(){

    const navigate = useNavigate();

    useEffect(() => {
    axios.get('https://backend.umeshkumaruk4376.workers.dev/api/v1/blog/authCheck', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(() => {
            navigate('/dashboard');
        }).catch(() => {
            
        })
    },[])

    return(
        <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            <InComp />
            <SideComp />
        </div>
    )
}