import { useNavigate } from "react-router-dom";
import SideComp from "../components/SideComp";
import UpComp from "../components/UpComp";
import { useEffect } from "react";
import axios from "axios";


export default function SignUp(){

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
            <UpComp />
            <SideComp />
        </div>
    )
}