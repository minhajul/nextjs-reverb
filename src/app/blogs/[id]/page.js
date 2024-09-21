"use client";

import LoginLinks from '@/app/LoginLinks'
import axios from "@/lib/axios";
import useSWR from "swr";
import SingleBlog from "@/components/Blog/SingleBlog";

const fetcher = async (url, id) => {
    const response = await axios
        .get(`/api/blogs/${id}`)
        .then(res => res)
        .catch(error => {
            if (error.response.status !== 422) throw error
        });

    return response.data.blog;
};

export default function BlogDetails({ params }) {
    const { data: blog, error: blogError } = useSWR([`/api/blogs/${params.id}`, params.id], fetcher);

    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks />

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    {blog && (
                        <SingleBlog blog={blog}></SingleBlog>
                    )}
                </div>
            </div>
        </>
    )
}
