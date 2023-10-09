import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useState } from "react";
import style from "../styles/login.module.scss";
import { gsap } from "gsap";


const Login = () => {

    const login = useRef(null);

    useEffect(() => {
        gsap.from(login.current, {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: "back.out(1.7)"
        })
    }, [])

    const [error, setError] = useState("");

    const inputRef = useRef();
    const { push } = useRouter();


    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            // console.log(inputRef.current.value);

            localStorage.setItem("username", inputRef.current.value);
            inputRef.current.value = "";
            push("/");

        }
    };

    const displayError = () => {
        if (error !== "") {
            return (
                <p className={style.error}>{error}</p>
            );
        }
    }

    useEffect(() => {
        if (localStorage.getItem("error") == 500) {
            setError("Error 500: Server not found");
        }
    }, []);

    return (
        <>
            <div
                className={style.ctn}>
                <div className={style.frm} ref={login}>
                    <div className={style.logo}
                    ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" /></svg>
                        <h1 className={style.title}>Login</h1>
                    </div>
                    <div className={style.inputGroup}>
                        <label>Username</label>
                        <input ref={inputRef} type="text" placeholder="Amézir" onKeyDown={onKeyDown} maxLength="14" />
                    </div>
                    <div>
                        {displayError()}
                    </div>
                    <div className={style.mention}
                    >
                        <a href="/mention">mention legal</a>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Login;