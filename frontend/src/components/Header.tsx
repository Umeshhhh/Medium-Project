import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import AuthAlert from "./AuthAlert";

interface prop{
    name: string
}

export default function Header({name} : prop){

    const [sidebar, setSidebar] = useState(false);
    const [popVisible, setPopVisible] = useState(false);
    const [brdrClr, setBrdrClr] = useState(false);
    const [popMssg, setPopMssg] = useState('Signing out...');
    const [icon, setIcon] = useState(faSpinner);
    const [isSpin, setIsSpin] = useState(true);
    const navigate = useNavigate();

    function logOut(){

        localStorage.removeItem('token');
        setTimeout(() => {
            navigate('/');
        },2000)
    }

    return(
        <motion.div 
            // initial={{y: '-100%', opacity: 0}}
            // animate={{y: 0, opacity: 1}}
            // exit={{y : '-100%', opacity:0}}
            // transition={{type: 'tween', delay: 0.5}}
            className="fixed top-0 z-50 w-full p-4 bg-black text-white flex justify-between items-center px-10">
            <h1 onClick={() => navigate('/dashboard')} className="cursor-pointer tracking-wider text-xl font-semibold">Medium</h1>
            <ul className="text-white">
                <motion.li
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.95}}
                    transition={{type: 'spring'}}
                    onClick={() => setSidebar(prev => !prev)}
                    className="cursor-pointer font-semibold w-10 h-10 rounded-full border-2 border-cyan-500 bg-cyan-500 shadow-md shadow-cyan-200 flex place-content-center items-center"
                    >
                    {name[0]}
                </motion.li>
            </ul>
            <AnimatePresence>
                {sidebar &&
                    <motion.div 
                        initial={{opacity: 0, y: '-20%'}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: '-20%'}}
                        className="fixed top-20 right-10 h-20 w-36 bg-gray-600 rounded-xl flex place-content-center items-center">
                        <motion.button
                            whileTap={{scale: 0.95}}
                            onClick={() => {
                                logOut();
                                setPopVisible(true);
                                setTimeout(() => {
                                    setPopVisible(false);
                                },2000)
                            }}
                            className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition-colors duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                            Logout
                        </motion.button>
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {popVisible && 
                    <div className="absolute top-1/2 left-1/3 w-96 h-full">
                        <AuthAlert brdrClr={brdrClr} popMssg={popMssg} icon={icon} isSpin={isSpin} />
                    </div>
                }
            </AnimatePresence>
        </motion.div>
    )
}