import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"

export default function AuthAlert({brdrClr, popMssg, icon, isSpin} : {brdrClr: boolean, popMssg: string, icon: IconDefinition, isSpin: boolean}){

    return(
        <motion.div
            initial={{opacity: 0, y: '100%'}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: '100%'}}
            transition={{type: 'spring', delay: 0.2}}
            className={`absolute hidden md:block bottom-10 -right-[90%] bg-white border-2 ${brdrClr ? 'border-red-200' : 'border-blue-200'} rounded-full px-10 py-3`}
            >
            <p className={`${brdrClr ? 'text-red-500' : 'text-blue-500'} tracking-wide font-semibold`}>
                {popMssg} <FontAwesomeIcon icon={icon} spin={isSpin} />
            </p>
        </motion.div>
    )
}