import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useState } from "react";
import style from "../styles/login.module.scss";

const Login = () => {

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
        <div className={style.ctn}>
            <div className={style.frm}>
                <div>
                    <h1 className={style.title}>Login</h1>
                </div>
                <div className={style.inputGroup}>
                    <label>Username</label>
                    <input ref={inputRef} type="text" placeholder="Amézir" onKeyDown={onKeyDown} maxLength="20" />
                </div>
                <div>
                    {displayError()}
                </div>
            </div>
        </div>
    );
};

export default Login;