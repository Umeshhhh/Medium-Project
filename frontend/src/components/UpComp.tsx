import { useEffect, useState } from "react";
import LabelInput from "./LabelInput";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import axios from "axios";
import emailjs from '@emailjs/browser';
import AuthAlert from "./AuthAlert";
import { faCircleCheck, faSpinner, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { signUpInput, SignUpInput } from "medium-common";


export default function UpComp(){

    const [inputs, setInputs] = useState({
        username : "",
        password: "",
        email: ""
    });
    const [animate, setAnimate] = useState(true);
    const [Otp, setOtp] = useState(0);
    const [enteredOtp, setEnteredOtp] = useState('');
    const [otpVisible, setOtpVisible] = useState(false);
    const [click, setClick] = useState(false);
    const [icon, setIcon] = useState(faSpinner);
    const [popMssg, setPopMssg] = useState('Creating account...');
    const [isSpin, setIsSpin] = useState(true);
    const [popVisible, setPopVisible] = useState(false);
    const [brdrClr, setBrdrClr] = useState(false);
    const [errorMssg, setErrorMssg] = useState('');
    const [buttonClick, setButtonClick] = useState('Sign up');
    const navigate = useNavigate();

    useEffect(() => {
        if(inputs.email.length > 0 && inputs.password.length > 0 && inputs.username.length > 0){
            setClick(true);
        }
        setErrorMssg('');
    },[inputs])

    function userFind(){
        setPopVisible(true);
        setIcon(faSpinner);
        setPopMssg('Creating account...');
        setIsSpin(true);
        setBrdrClr(false);
        setButtonClick('Signing up...');
        axios.post('',inputs)
        .then(() => {
            emailVerify();
        }).catch((e) => {
            setTimeout(() => {
                setIcon(faTriangleExclamation);
                setPopMssg('Error occured');
                setIsSpin(false);
                setBrdrClr(true);
                setButtonClick('Sign up');
                setTimeout(() => {
                    setPopVisible(false);
                },2000)
            },2000)
            if(e.status == 404){
                setTimeout(() => {
                    setErrorMssg('*Email is already in use');
                },2000)
            }else{
                setTimeout(() => {
                    setErrorMssg('Error while creating account');
                },2000)
            }
        })
    }

    function signingUp(){

        axios.post('',inputs)
        .then((res) => {
            localStorage.setItem('token', "Bearer " + res.data.token);
            setTimeout(() => {
                setIcon(faCircleCheck);
                setPopMssg('Account created');
                setIsSpin(false);
                setBrdrClr(false);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000)
            },1000)
        }).catch((e) => {
            setIcon(faTriangleExclamation);
            setPopMssg('Error occured');
            setIsSpin(false);
            setBrdrClr(true);
            setButtonClick('Sign up');
            setTimeout(() => {
                setPopVisible(false);
            },2000)
            if(e.status == 403){
                setErrorMssg('*Email is already in use');
            }else{
                setErrorMssg('*Error while creating account');
            }
        })
    }

   function emailVerify(){

        const OTPGen = Math.floor(1000 + Math.random() * 9000);
        setOtp(OTPGen);
        const tempPara: any = {
            send_to: inputs.email,
            OTP: `${OTPGen}`,
            reply_to: inputs.email,
            message: "Find the file attached"
        }
        emailjs.send('', '', tempPara, {publicKey: ''}).then(
            () => {
                setOtpVisible(true);
            },
            () => {
                setOtpVisible(false);
                setTimeout(() => {
                    setErrorMssg('*Invalid email');
                    setIcon(faTriangleExclamation);
                    setPopMssg('Error occured');
                    setIsSpin(false);
                    setBrdrClr(true);
                    setButtonClick('Sign up');
                    setTimeout(() => {
                        setPopVisible(false);
                    },2000)
                },2000)
            }
        )
    }

    function otpVerify(){
        if(Otp == parseInt(enteredOtp)){
            setEnteredOtp('');
            setOtpVisible(false);
            signingUp();
        }else{
            setEnteredOtp('');
            setOtpVisible(false);
            setErrorMssg('*Invalid email');
            setIcon(faTriangleExclamation);
            setPopMssg('Error occured');
            setIsSpin(false);
            setBrdrClr(true);
            setButtonClick('Sign up');
            setTimeout(() => {
                setPopVisible(false);
            },2000)
        }
    }

    return(
        <AnimatePresence>
            {animate && 
                <motion.div 
                    initial={{opacity: 0, x: '-50%'}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: '50%'}}
                    transition={{type: 'spring'}}
                    className="relative h-screen w-full flex flex-col place-content-center items-center gap-2"
                    >
                    {otpVisible && 
                        <div className={`z-40 absolute h-full w-full bg-black bg-opacity-20 flex flex-col place-content-center items-center`}>
                            <motion.div 
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.9}}
                                className="flex flex-col bg-white p-10 px-12 gap-2 rounded-xl">
                                <h1 className="text-2xl text-center font-bold">OTP Sent...!!</h1>
                                <p className="text-md font-semibold">Entered the received OTP below to verify your email</p>
                                <input className="p-2 border-2 rounded-lg focus:outline-blue-500" type="text" placeholder="Enter OTP" onChange={(e) => setEnteredOtp(e.target.value)} />
                                <button onClick={otpVerify} className="w-full text-md font-semibold bg-black text-white p-2 rounded-lg mt-2">Submit</button>
                            </motion.div>
                        </div>
                    }
                    <div className="relative flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-center px-10">Create an account</h1>
                        <p className="text-md text-gray-600 text-center">
                            Already have an account? 
                            <span 
                                className="ml-1 underline cursor-pointer hover:no-underline" 
                                onClick={() => {
                                    setAnimate(false);
                                    setTimeout(() => {
                                        navigate('/');
                                    },500)
                                }}
                                >
                                Signin
                            </span>
                        </p>
                        <div className="flex flex-col gap-1 mt-3">
                            <LabelInput label="Username" type="text" placeholder="Enter your username" change={(e) => setInputs({...inputs, username: e.target.value})} />
                            <LabelInput label="Email" type="text" placeholder="abc@gmail.com" change={(e) => setInputs({...inputs, email: e.target.value})} />
                            <LabelInput label="Password" type="password" placeholder="123456" change={(e) => setInputs({...inputs, password: e.target.value})} />
                        </div>
                        <button 
                            onClick={() => {
                                if(click){
                                    userFind();
                                }
                            }} 
                            className="w-full text-md font-semibold bg-black text-white p-2 rounded-lg mt-2"
                            >
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