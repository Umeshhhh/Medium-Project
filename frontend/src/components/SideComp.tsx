import { motion } from "framer-motion";

export default function SideComp(){

    return(
        <motion.div
            style={{
                backgroundImage: 'url(https://blush.design/api/download?shareUri=MjEGq_quG8p-6B_z&c=New%2520Palette%25201_0%7Effffff&w=800&h=800&fm=png)',
                backgroundBlendMode: 'revert',
                backgroundPositionY: '250px',
                backgroundPositionX: '200px',
                backgroundSize: '50%',
                backgroundRepeat: 'no-repeat'
            }}
            className="bg-slate-100 hidden flex-col w-full place-content-start py-32 pl-20 pr-12 md:flex"
            >
            <h1 className="text-3xl font-bold">
                {(`"The customer service i received was exceptional. The support team went above and beyond to address my concerns."`).split("").map((c, i) => {
                    return(
                        <motion.span
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{type: 'spring', delay: 0.01 * i}}
                            key={i}
                            >
                            {c}
                        </motion.span>
                    )
                })}
            </h1>
            <h3 className="text-lg font-bold mt-3">
                {(`Jules Winnfield`).split("").map((c, i) => {
                    return(
                        <motion.span
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{type: 'spring', delay: 0.05 * i}}
                            key={i}
                            >
                            {c}
                        </motion.span>
                    )
                })}
            </h3>
            <p className="text-sm text-gray-500">
                {(`CEO, Acme Inc`).split("").map((c, i) => {
                    return(
                        <motion.span
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{type: 'spring', delay: 0.09 * i}}
                            key={i}
                            >
                            {c}
                        </motion.span>
                    )
                })}
            </p>
        </motion.div>
    )
}