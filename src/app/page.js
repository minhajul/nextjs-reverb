"use client";

import LoginLinks from '@/app/LoginLinks'
import useSWR from "swr";
import SingleBlog from "@/components/Blog/SingleBlog";
import {getBlogs} from "@/lib/blog";

const fetcher = async () => {
    const response = await getBlogs()

    return response.data.blogs;
};

const Home = () => {
    const { data: blogs, error: blogError } = useSWR("/api/blogs", fetcher);

    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks />

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="my-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {blogs && blogs.map((blog, index) => (
                            <SingleBlog
                                key={index}
                                blog={blog}
                            >
                            </SingleBlog>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
