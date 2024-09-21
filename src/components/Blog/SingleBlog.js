'use client';

import Link from "next/link";
import useEcho from "@/hooks/echo";
import {useEffect, useState} from "react";

const SingleBlog = ({blog}) => {
    const echo = useEcho()
    const [lastReadBlog, setLastReadBlog] = useState({})

    useEffect(() => {
        if (echo) {
            echo.channel('blog-read')
                .listen('SendBlogReadCountEvent', event => {
                    console.log()
                    setLastReadBlog(event.blog)
                })
        }
    }, [echo])

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/blogs/${blog.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                </h5>
            </Link>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {blog.description}
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
    )
}

export default SingleBlog