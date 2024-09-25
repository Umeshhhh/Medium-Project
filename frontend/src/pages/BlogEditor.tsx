import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { blogId } from "../stateManage/blogState";
import BlogEditorSkeleton from "../components/BlogEditorSkeleton";

export default function BlogEditor(){

    const [username, setUsername] = useState('');
    const [title, setTitle] = useState(``);
    const [content, setContent] = useState(``);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const id = useRecoilValue(blogId);

    useEffect(() => {
        axios.get('', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            setUsername(res.data.name);
        }).catch(() => {
            navigate('/');
        })
        axios.get('' + id, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            setTitle(res.data.blog.title);
            setContent(res.data.blog.content);
            setLoading(false);
        }).catch(() =>{
            navigate('/dashboard');
        })
    },[])

    function savingDraft(){

        axios.put('', {
            id: id,
            title: title,
            content: content
        },{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(() => {

        }).catch(() => {

        })

        axios.put('', {
            id: id,
            published: false
        },{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(() => {
            navigate(0);
        }).catch(() => {

        })
        
    }

    function publishing(){

        axios.put('', {
            id: id,
            title: title,
            content: content
        },{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(() => {

        }).catch(() => {

        })

        axios.put('', {
            id: id,
            published: true
        },{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(() => {
            navigate(0);
        }).catch(() => {

        })

    }

    return(
        <div className="flex flex-col min-h-screen max-w-full overflow-hidden">
            <Header name={username} />
            {loading && 
                <BlogEditorSkeleton />
            }
            {!loading &&
                <div className="relative flex flex-col gap-0">
                    <div className="mt-28 flex place-content-end px-32 gap-2">
                        <motion.button
                            whileTap={{scale: 0.9}}
                            onClick={savingDraft}
                            className="px-5 py-1 z-20 rounded-xl bg-gray-400 text-white font-semibold shadow-md shadow-green"
                            >
                            Save as draft
                        </motion.button>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            onClick={publishing}
                            className="px-5 py-1 z-20 rounded-xl bg-green-500 text-white font-semibold shadow-md shadow-green"
                            >
                            Publish
                        </motion.button>
                    </div>
                    <div className="absolute top-24 h-screen w-full flex flex-col px-52">
                        <textarea value={title} onChange={(e) => setTitle(e.target.value)} className="mt-10 h-auto border-l-2 p-4 text-3xl placeholder-gray-400 focus:outline-none px-5 resize-none" placeholder="Title" rows={2} typeof='text' />
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="px-5 text-xl mt-2 focus:outline-none resize-none" placeholder="Tell your story..." rows={14} typeof='text' />
                    </div>
                </div>
            }
        </div>
    )
}