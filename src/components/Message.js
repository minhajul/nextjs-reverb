'use client'

import useEcho from '@/hooks/echo'
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/auth";

export const metadata = {
    title: 'Laravel - Dashboard',
}

const Message = () => {
    const {user} = useAuth({middleware: 'auth'})
    const echo = useEcho()
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (echo) {
            echo.private(`chat.${user?.id}`)
                .listen('SendMessageEvent', event => {
                    if (event.receiver.id === user?.id) {
                        setMessage(event.message)
                    }
                })
        }
    }, [echo])

    return (
        <div className="p-6">
            {message ? (
                <p>{message}</p>
            ) : (
                <p>No message found</p>
            )}
        </div>
    )
}

export default Message