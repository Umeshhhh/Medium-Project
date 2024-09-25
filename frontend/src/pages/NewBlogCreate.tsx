import { useEffect, useState } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewBlogCreate(){

    const [username, setUsername] = useState('');
    const [title, setTitle] = useState(``);
    const [content, setContent] = useState(``);
    const [blogId, setBlogId] = useState(``);
    const navigate = useNavigate();

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
    },[])

    function publish(){

        axios.post('', {
            title: title,
            content: content
        },{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            setBlogId(res.data.blog.id);
        }).catch(() => {

        })

        axios.put('', {
            id: blogId,
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

    function saveDraft(){

        axios.post('', {
            title: title,
            content: content
        },{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            setBlogId(res.data.blog.id);
        }).catch(() => {

        })

        axios.put('', {
            id: blogId,
            published: false
        },{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(() => {
            navigate('/dashboard');
        }).catch(() => {

        })
    }

    return(
        <div className="flex flex-col min-h-screen max-w-full overflow-hidden">
            <Header name={username} />
            <div className="relative flex flex-col gap-0">
                <div className="mt-28 flex place-content-end px-32 gap-2">
                    <motion.button
                        whileTap={{scale: 0.9}}
                        onClick={saveDraft}
                        className="px-5 py-1 z-50 rounded-xl bg-gray-400 text-white font-semibold shadow-md shadow-green"
                        >
                        Save as draft
                    </motion.button>
                    <motion.button
                        whileTap={{scale: 0.9}}
                        onClick={publish}
                        className="px-5 py-1 z-50 rounded-xl bg-green-500 text-white font-semibold shadow-md shadow-green"
                        >
                        Publish
                    </motion.button>
                </div>
                <div className="absolute top-24 h-screen w-full flex flex-col px-52">
                    <textarea onChange={(e) => setTitle(e.target.value)} className="mt-10 h-auto border-l-2 p-4 text-3xl placeholder-gray-400 focus:outline-none px-5 resize-none" placeholder="Title" rows={1} typeof='text' />
                    <textarea onChange={(e) => setContent(e.target.value)} className="px-5 text-xl mt-2 focus:outline-none resize-none" placeholder="Tell your story..." rows={14} typeof='text' />
                </div>
            </div>
        </div>
    )
}