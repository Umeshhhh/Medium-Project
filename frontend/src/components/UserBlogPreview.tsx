import { faEye, faPaintBrush, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { blogId } from "../stateManage/blogState"
import { useState } from "react"

interface BlogPreviewType{
    authorName: string,
    date: string,
    title: string,
    content: string,
    i: number,
    id: string,
    isPublished: boolean
}

export default function UserBlogPreview({authorName, date, title, content, i, id, isPublished}: BlogPreviewType){

    const navigate = useNavigate();
    const setBlogId = useSetRecoilState(blogId);
    const [deleteVisible, setDeleteVisible] = useState(false);

    function publish(){
        axios.put('', {
            id: id,
            published: true
        },{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(() => {
            navigate('/dashboard');
        }).catch(() => {

        })
    }

    function deleteBlog(){
        console.log("In deleteBlog")
        axios.delete('',{
            headers: {
                authorization: localStorage.getItem('token')
            },
            data:{
                id: id
            }
        }).then(() => {
            navigate('/dashboard');
        }).catch(() => {
            
        })
    }

    return(
        <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.8}}
            transition={{type: 'spring', delay: 0.2 * i}}
            className="relative border-b-2 py-3 pb-10 flex place-content-center"
            >
            <AnimatePresence>
                {deleteVisible &&
                    <motion.div 
                        className="absolute w-full rounded-3xl z-30 h-5/6 bg-black bg-opacity-10 flex flex-col place-content-center items-center">
                        <motion.div 
                            initial={{opacity :0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            className="bg-white p-10 rounded-2xl border-black flex flex-col gap-3">
                            <h1 className="text-lg font-semibold">Do you really want to delete this blog??</h1>
                            <div className="flex gap-4 justify-evenly">
                                <motion.button 
                                    onClick={() => setDeleteVisible(false)}
                                    whileTap={{scale: 0.9}}
                                    className="px-8 py-2 rounded-md bg-gray-500 text-white font-bold transition-colors duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-gray-500">
                                    No
                                </motion.button>
                                <motion.button
                                    onClick={deleteBlog}
                                    whileTap={{scale: 0.9}} 
                                    className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition-colors duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                                    Yes
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
            <motion.div
                className="w-full flex flex-col gap-2 cursor-pointer rounded-full hover:bg-gray-100 p-5"
                >
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-white cursor-pointer text-xs font-semibold w-5 h-5 rounded-full border-2 border-cyan-500 bg-cyan-500 shadow-md shadow-cyan-200 flex place-content-center items-center">
                            {authorName[0]}
                        </h1>
                        <p className="font-semibold">{authorName}</p>
                        <p className="text-sm text-gray-500">{date.slice(4,15)}</p>
                    </div>
                    <div className="flex items-center gap-5 mr-10">
                        <motion.div
                            onClick={() => {
                                setBlogId(id);
                                navigate('/blogPost');
                            }}
                            whileTap={{scale: 0.9}}
                            >
                            <FontAwesomeIcon className="p-2 rounded-xl hover:bg-white hover:border-white" color="black" size='lg' icon={faEye} />
                        </motion.div>
                        {!isPublished &&
                            <motion.button
                                onClick={publish}
                                whileTap={{scale: 0.9}}
                                className="px-5 py-1 rounded-xl bg-green-500 text-white font-semibold shadow-md shadow-green"
                                >
                                Publish
                            </motion.button>
                        }
                        {isPublished &&
                            <div className="text-gray-400 font-semibold">
                                Published
                            </div>
                        }
                        <motion.div
                            onClick={() => {
                                setBlogId(id);
                                navigate('/editor');
                            }}
                            whileTap={{scale: 0.9}}
                            >
                            <FontAwesomeIcon className="p-2 rounded-xl hover:bg-white hover:border-white" color="black" size='lg' icon={faPaintBrush} />
                        </motion.div>
                        <motion.div
                            onClick={() => setDeleteVisible(true)}
                            whileTap={{scale: 0.9}}
                            >
                            <FontAwesomeIcon className="p-2 rounded-xl hover:bg-white hover:border-white" color="black" size='lg' icon={faTrash} />
                        </motion.div>
                    </div>
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