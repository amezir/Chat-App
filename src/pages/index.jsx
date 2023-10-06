import { useRouter } from 'next/router';
import { socket } from '@/utils/socket';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

import styles from '@/styles/index.module.scss';

import Input from '@/components/input/input';
import Commands from '@/components/command/Commands';
import Notifications from '@/components/Notifications/Notifications';
import Userlist from '@/components/UserList/Userlist';
import Navbar from '@/components/Navbar/Navbar';


const Home = () => {

    const getUsernameFromLocalStorage = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("username");
        }
        return null;
    };

    const daySetMessage = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const timeSetMessage = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    };

    const username = getUsernameFromLocalStorage();

    const [selectedUser, setSelectedUser] = useState();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState();

    const viewerRef = useRef();

    const onConnectionError = (error) => {
        console.log(error.message);
        localStorage.removeItem("username");
        localStorage.removeItem("sessionID");
        localStorage.setItem("error", 500);
        push("/login");

    };

    const onError = ({ code, error }) => {
        console.log(code, error);

        let title = "";

        switch (code) {
            case 100:
                title = `Error ${code} : Tu envoies trop de messages`;
                break;

            default:
                break;

        }

        setError({
            title
        });
    };

    const [messages, setMessages] = useState([]);
    const { push } = useRouter();

    const onSession = ({ sessionID, userID }) => {
        // attach the session ID to the next reconnection attempts
        socket.auth = { sessionID };
        // store it in the localStorage
        localStorage.setItem("sessionID", sessionID);
        // save the ID of the user
        socket.userID = userID;

        localStorage.removeItem("error");
    };

    const scrollToBottom = () => {
        viewerRef.current.scrollTop = viewerRef.current.scrollHeight;
    }

    const onMessage = (message) => {
        console.log("message", message);
        setMessages((messages) => [...messages, message]);
    };

    const getMessagesAtInit = (messagesAtInit) => {
        console.log("messagesAtInit", messagesAtInit);
        setMessages(messagesAtInit);
    };

    const getUserAtInit = (_users) => {
        console.log("user", _users);
        setUsers(_users);
    };

    const onUserConnect = (_user) => {
        setUsers((currentUsers) => [...currentUsers, _user]);
    };

    const onUserDisconnect = (_userID) => {
        const filteredArray = [...users].filter((_user) => _user.userID !== _userID ? true : false);
        setUsers(filteredArray);
    };

    const onPrivateMessage = ({ content, from, to, username }) => {
        console.log("private message", content, from, to, username);

        const userMessagingIndex = users.findIndex((user) => user.userID === from);
        const userMessaging = users.find((_user) => _user.userID === from);
        console.log("userMessagingIndex", userMessagingIndex);

        if (!userMessaging) return;

        userMessaging.messages.push({
            content,
            from,
            to,
            username: username,
        });

        if (userMessaging.userID !== selectedUser?.userID) {
            userMessaging.hasNewMessages = true;
        }

        const _users = [...users];
        _users[userMessagingIndex] = userMessaging;

        setUsers(_users);

    };

    const emitmessagewhitsong = () => {
        socket.emit("command", "/chef");
    };


    useEffect(() => {
        scrollToBottom();
    }, [messages, selectedUser]);

    useEffect(() => {

        socket.on("user connected", onUserConnect);
        socket.on("user disconnected", onUserDisconnect);
        socket.on("private message", onPrivateMessage);

        return () => {
            socket.off("user connected", onUserConnect);
            socket.off("user disconnected", onUserDisconnect);
            socket.off("private message", onPrivateMessage);
        }
    }, [users]);


    useEffect(() => {
        const sessionID = localStorage.getItem("sessionID");

        // session is already defined
        if (sessionID) {
            socket.auth = { sessionID };
            socket.connect();
            // first time connecting and has already visited login page
        } else if (localStorage.getItem("username")) {
            const username = localStorage.getItem("username");
            socket.auth = { username };
            socket.connect();
            //   // redirect to login page
        } else {
            push("/login");
        }

        socket.on("error", onError);
        socket.on("connect_error", onConnectionError);
        socket.on("disconnect", onConnectionError);
        socket.on("session", onSession);
        socket.on("message", onMessage);
        socket.on("messages", getMessagesAtInit);
        socket.on("users", getUserAtInit);

        return () => {

            socket.disconnect();
            socket.off("error", onError);
            socket.on("disconnect", onConnectionError);
            socket.off("connect_error", onConnectionError);
            socket.off("session", onSession);
            socket.off("message", onMessage);
            socket.off("messages", getMessagesAtInit);
            socket.off("users", getUserAtInit);
        };
    }, []);


    return (
        <>
            <div className={styles.ctnPgn}>
                <Navbar />
                <Userlist users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    setUsers={setUsers}
                />

                <div className={styles.ctnGMsg}>
                    <div className={styles.title}>
                        <h1
                        >{selectedUser ? selectedUser.username : "Géneral"}</h1>
                    </div>
                    <div ref={viewerRef} className={styles.ctnMsg}>
                        {selectedUser
                            ? selectedUser.messages.map((message, key) => {
                                return (
                                    <div key={key} className={`${styles.msg} ${message.username === username ? styles.msgPerso : styles.msgAutres}
                                    `}>
                                        <h4>{message.username}</h4>
                                        <p>{message.content}</p>
                                        <time> {daySetMessage()}&nbsp;
                                            {timeSetMessage()}</time>
                                    </div>
                                );
                            })
                            : messages.map((message, key) => {
                                return (
                                    <div key={key} className={`${styles.msg} ${message.username === username ? styles.msgPerso : styles.msgAutres}
                                    `}>
                                        <h4>{message.username}</h4>
                                        <p>{message.content}</p>
                                        <time> {daySetMessage()}&nbsp;
                                            {timeSetMessage()}</time>
                                    </div>
                                );
                            })}

                        {error ? (
                            <Notifications
                                title={error.title}
                                content={error.content}
                                onClose={() => setError(null)}
                            />
                        ) : null}
                    </div>
                    <Input
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    />
                </div>



            </div>
            <Commands />
        </>
    );
};


export default Home;