import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase/firebase';

import { useAuth } from '../context/authcontext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const { loading, setLoading } = useState(true);

    const handleLogout = async() => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if(!user) {
            history.push('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "c03d7f95-8f8b-4d7d-8428-10c3f6d0078e",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users',
                        formdata,
                        { headers: { "private-key": process.env.CHAT_ENGINE_KEY } }
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.error(error))
                })

        })
    }, [user, history]);

    if(!user || loading) return "Loading ...";

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Chat App
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>   
    )
}

export default Chats;