"use client";

import LoginLinks from '@/app/LoginLinks'
import useEcho from "@/hooks/echo";
import {useEffect, useState} from "react";
import axios from "@/lib/axios";
import useSWR from "swr";

const fetcher = async () => {
    const response = await axios
        .get('/api/blogs')
        .then(res => res)
        .catch(error => {
            if (error.response.status !== 422) throw error
        });

    return response.data.blogs;
};

const Home = () => {
    const echo = useEcho()
    const [lastReadBlog, setLastReadBlog] = useState({})

    useEffect(() => {
        if (echo) {
            echo.channel('blog-read')
                .listen('SendBlogReadCountEvent', event => {
                    setLastReadBlog(event.blog)
                })
        }
    }, [echo])

    const { data: blogs, error: blogError } = useSWR("/api/blogs", fetcher);

    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks />

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="my-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {blogs && blogs.map( (blog, index) => (
                            <div key={index} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        Noteworthy technology acquisitions 2021 - {blog.id}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                    chronological order.
                                </p>
                                <div className="inline-flex items-center px-3 py-2 font-medium text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                                    </svg>

                                    {lastReadBlog && lastReadBlog.id === blog.id ? (
                                        <span className="ml-1">{lastReadBlog.read_count}</span>
                                    ) : (
                                        <span className="ml-1">{blog.read_count}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
