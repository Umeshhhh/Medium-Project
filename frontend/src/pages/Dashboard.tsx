import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogPreview from "../components/BlogPreview";
import UserBlogPreview from "../components/UserBlogPreview";
import BlogPreviewSkeleton from "../components/BlogPreviewSkeleton";

export default function Dashboard(){

    const [optionClick, setOptionClick] = useState(false);
    const [plusColor, setPlusColor] = useState('gray');
    const [forYouVisible, setForYouVisible] = useState(true);
    const [yourBlogVisible, setYourBlogVisible] = useState(false);
    const [blogArray, setBlogArray] = useState([]);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [noBlog, setNoBlog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get('https://backend.umeshkumaruk4376.workers.dev/api/v1/blog/bulk', {
            headers: {
               authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            setBlogArray(res.data.blogs);
            setUserId(res.data.userId);
            setUserName(res.data.username);
            setLoading(false);
        }).catch(() => {
            navigate('/');
        })

        blogArray.map((blog: any) => {
            if(blog.author.id == userId){
                setNoBlog(true);
            }
        })
    },[forYouVisible])

    return(
        <div className="flex flex-col min-h-screen max-w-full">
            <Header name={userName} />
            <div className="h-full w-full mt-20 flex flex-col items-center px-52">
                <div className="flex items-center w-full border-b-2 gap-1 mt-10 mb-5">
                    <div className="">
                        <motion.div
                            onClick={() => {
                                setTimeout(() => {
                                    navigate('/createBlog');
                                },1000)
                            }}
                            whileTap={{scale: 0.9}} 
                            >
                            <FontAwesomeIcon onMouseEnter={() => setPlusColor('black')} onMouseLeave={() => setPlusColor('gray')} className={`cursor-pointer transition-all p-3 rounded-full hover:bg-gray-100`} color={plusColor} size="xl" icon={faPlus} />
                        </motion.div>
                    </div>
                    <motion.p 
                        whileTap={{scale: 0.9}}
                        onClick={() => {
                            setOptionClick(false);
                            setYourBlogVisible(false);
                            setTimeout(() => {
                                setForYouVisible(true);
                            },500)
                        }} 
                        className={`${optionClick? 'text-gray-400' : 'text-black font-bold'} transition-colors text-lg h-full p-2 px-5 cursor-pointer rounded-xl hover:bg-gray-100 `}
                        >
                        For you
                    </motion.p>
                    <motion.p 
                        whileTap={{scale: 0.9}}
                        onClick={() => {
                            setOptionClick(true);
                            setForYouVisible(false);
                            setTimeout(() => {
                                setYourBlogVisible(true);
                            },500)
                        }} 
                        className={`${optionClick? 'text-black font-bold' : 'text-gray-400'} transition-colors text-lg p-2 h-full cursor-pointer px-4 rounded-xl hover:bg-gray-100`}
                        >
                        Your blogs
                    </motion.p>
                </div>
                <AnimatePresence>
                    {forYouVisible &&
                        <div className="absolute top-44 px-52 mt-10">
                            {blogArray.map((blog: any, i) => {
                                if(blog.published && blog.author.id != userId){
                                    return <BlogPreview key={i} title={blog.title} content={blog.content} date={blog.date} authorName={blog.author.name} i={i} id={blog.id} />
                                }
                            })}
                        </div>
                    }
                    {loading && !forYouVisible &&
                        <div className="absolute w-full top-44 px-56 mt-10">
                            <BlogPreviewSkeleton />
                        </div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {yourBlogVisible &&
                        <div>
                            {blogArray.map((blog: any, i) => {
                                if(blog.author.id == userId){
                                    return <UserBlogPreview key={i} isPublished={blog.published} title={blog.title} id={blog.id} content={blog.content} date={blog.date} authorName={blog.author.name} i={i} />
                                }
                            })}
                            <AnimatePresence>
                                {!noBlog && 
                                    <motion.div 
                                        initial={{opacity: 0, scale: 0.8}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.8}}
                                        className="relative h-96 w-full flex place-content-center items-center">
                                        <h1 className="text-3xl font-semibold text-gray-700">No Blogs to show</h1>
                                        <img className="absolute top-0 -left-96 h-52 w-42" src="https://blush.design/api/download?shareUri=FJwj1TvxzFN5-x7j&c=New%2520Palette%25201_0%7Effffff&w=800&h=800&fm=png" alt="SplashImage" />
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>
                    }
                    {loading && !yourBlogVisible &&
                        <div className="absolute w-full top-44 px-56 mt-10">
                            <BlogPreviewSkeleton />
                        </div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}