import { useEffect, useState } from "react";
import LabelInput from "./LabelInput";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons/faCircleCheck";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import AuthAlert from "./AuthAlert";

export default function InComp(){

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [animate, setAnimate] = useState(true);
    const [buttonClick, setButtonClick] = useState('Sign In');
    const [click, setClick] = useState(false);
    const [errorMssg, setErrorMssg] = useState('');
    const [icon, setIcon] = useState(faSpinner);
    const [popMssg, setPopMssg] = useState('You are signing in...');
    const [isSpin, setIsSpin] = useState(true);
    const [popVisible, setPopVisible] = useState(false);
    const [brdrClr, setBrdrClr] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(inputs.email.length > 0 && inputs.password.length > 0){
            setClick(true);
        }
        setErrorMssg('')
    },[inputs])

    function signingIn(){
        setIcon(faSpinner);
        setPopMssg('You are signing in...');
        setIsSpin(true);
        setBrdrClr(false);
        setClick(false);
        axios.post('https://backend.umeshkumaruk4376.workers.dev/api/v1/user/signIn',inputs)
        .then((res) => {
            localStorage.setItem('token', "Bearer " + res.data.token);
            setTimeout(() => {
                setIcon(faCircleCheck);
                setPopMssg('You are signed in');
                setIsSpin(false);
                setBrdrClr(false);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000)
            },1000)
        }).catch((e) => {
            setTimeout(() => {
                setIcon(faTriangleExclamation);
                setPopMssg('Error occured');
                setIsSpin(false);
                setBrdrClr(true);
                setButtonClick('Sign in');
                setTimeout(() => {
                    setPopVisible(false);
                },2000)
            },1000)
            if(e.status == 403){
                setTimeout(() => {
                    setErrorMssg('*User not found');
                },1000)
            }else{
                setTimeout(() => {
                    setErrorMssg('*Invalid inputs');
                },1000)
            }
        })
    }

    return(
        <AnimatePresence>
            {animate && 
                <motion.div
                    initial={{opacity: 0, x: '-50%'}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: '50%'}}
                    transition={{type: 'spring'}}
                    className={`relative flex flex-col place-content-center items-center gap-2`}
                    >
                    <div className="relative flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-center px-4">LogIn to your account</h1>
                        <p className="text-md text-gray-600 text-center">
                            Don't have an account? 
                            <span 
                                className="ml-1 underline cursor-pointer hover:no-underline" 
                                onClick={() => {
                                    setAnimate(false);
                                    setTimeout(() => {
                                        navigate('/signUp');
                                    },500)
                                }}
                                >
                                Signup
                            </span>
                        </p>
                        <div className="flex flex-col gap-1 mt-3">
                            <LabelInput label="Email" type="text" placeholder="Enter your email" change={(e) => setInputs({...inputs, email: e.target.value})} />
                            <LabelInput label="Password" type="password" placeholder="123456" change={(e) => setInputs({...inputs, password: e.target.value})} />
                        </div>
                        <button 
                            onClick={() => {
                                if(click){
                                    setPopVisible(true);
                                    signingIn();
                                    setButtonClick(`Signing in...`)
                                }
                            }} 
                            className="w-full text-md font-semibold bg-black text-white p-2 rounded-lg mt-2">
                            {buttonClick}
                        </button>
                        <p className="absolute -bottom-7 text-sm text-red-600 tracking-wide">{errorMssg}</p>
                    </div>
                    <AnimatePresence>
                        {popVisible && 
                            <AuthAlert brdrClr={brdrClr} popMssg={popMssg} icon={icon} isSpin={isSpin} />
                        }
                    </AnimatePresence>
                </motion.div>
            }
        </AnimatePresence>
    )
}