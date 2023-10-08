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
                    <div>
                        <h1 className={style.title}>Login</h1>
                    </div>
                    <div className={style.inputGroup}>
                        <label>Username</label>
                        <input ref={inputRef} type="text" placeholder="Amézir" onKeyDown={onKeyDown} maxLength="14" />
                    </div>
                    <div>
                        {displayError()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;