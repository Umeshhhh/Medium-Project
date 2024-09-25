import { motion } from "framer-motion"
import { useSetRecoilState } from "recoil"
import { blogId } from "../stateManage/blogState"
import { useNavigate } from "react-router-dom"

interface BlogPreviewType{
    authorName: string,
    date: string,
    title: string,
    content: string,
    i: number,
    id: string
}

export default function BlogPreview({authorName, date, title, content, i, id}: BlogPreviewType){

    const setBlodId = useSetRecoilState(blogId);
    const navigate = useNavigate();

    return(
        <motion.div 
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.8}}
            transition={{type: 'spring', delay: 0.2 * i}}
            className="border-b-2 py-3 pb-10 flex place-content-center"
            >
            <motion.div
                whileHover={{scale: 1.04}}
                whileTap={{scale: 0.99}}
                transition={{type: 'tween'}}
                onClick={() => {
                    setBlodId(id);
                    navigate('/blogPost');
                }}
                className="w-full flex flex-col gap-2 cursor-pointer rounded-full hover:bg-gray-100 p-5"
                >
                <div className="flex items-center gap-2">
                    <h1 className="text-white cursor-pointer text-xs font-semibold w-5 h-5 rounded-full border-2 border-cyan-500 bg-cyan-500 shadow-md shadow-cyan-200 flex place-content-center items-center">
                        {authorName[0]}
                    </h1>
                    <p className="font-semibold">{authorName}</p>
                    <p className="text-sm text-gray-500">{date.slice(4,15)}</p>
                </div>
                <div className="text-2xl font-bold">
                    {title}
                </div>
                <div className="text-gray-500">
                    {content.slice(0,400)}...
                </div>
            </motion.div>
        </motion.div>
    )
}