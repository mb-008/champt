import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config.jsx";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

import "../styles/Chat.css";

export const Chat = ({ room }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            console.log(messages);
            setMessages(messages);
        });

        return () => unsuscribe();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newMessage === "") return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    };

    return (
        <div className="chat-app">
            <div className="header">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to: <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-white">{room.toUpperCase()}</span></h1>
            </div>
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <span className="user">{message.user}:</span> {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    className="new-message-input"
                    placeholder="Type your message here..."
                />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                    <span className="sr-only">Send</span>
                </button>

            </form>
        </div>
    );
};