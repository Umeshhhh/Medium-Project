import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { blogId } from "../stateManage/blogState";
import ReadBlogSkeleton from "../components/ReadBlogSkeleton";

export default function ReadBlog(){

    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const id = useRecoilValue(blogId);

    useEffect(() => {
        window.scrollTo(0, 0);
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
            setDate(res.data.blog.date);
            setAuthor(res.data.blog.author.name);
            setLoading(false);
        }).catch(() =>{
            navigate('/dashboard');
        })
    },[])

    return(
        <div className="flex flex-col min-h-screen max-w-full overflow-hidden">
            <Header name={username} />
            {loading && 
                <ReadBlogSkeleton />
            }
            {!loading &&
                <div className="mt-28 h-full w-full px-28 grid grid-cols-4">
                    <div className="col-span-3 flex flex-col gap-5">
                        <h1 className="text-5xl font-bold">
                            {title}
                        </h1>
                        <p className="text-gray-400 text-md">
                            Published on {date.slice(0,15)}
                        </p>
                        <p className="text-lg text-gray-600">
                            {content}
                        </p>
                    </div>
                    <div className="p-7">
                        <h1 className="text-md font-semibold">Author</h1>
                        <p className="text-xl font-bold mt-2">{"- "}{author}</p>
                    </div>
                </div>
            }
        </div>
    )
}