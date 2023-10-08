import { useEffect } from "react";
import style from "./Userlist.module.scss";
import { gsap } from "gsap";
import { useRef } from "react";

const Userlist = ({ users, setSelectedUser, selectedUser, setUsers
}) => {


    const getFirstLetter = (username) => {
        if (username) {
            return username.charAt(0).toUpperCase();
        } else {
            return null;
        }
    }

    const getUsername = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("username");
        } else {
            return null;
        }
    }

    const userlist = useRef(null);
    useEffect(() => {
        gsap.from(userlist.current, {
            duration: 1,
            y: -10,
            opacity: 0,
            ease: "power3.out"
        })
    }, [])


    const resetNotification = (user) => {
        const _users = [...users];

        const index = _users.findIndex((_user) => _user.userID === user.userID);

        _users[index].hasNewMessages = false;

        setUsers(_users);
    };



    useEffect(() => {
        console.log(users);
    }, [users])



    return (
        <div ref={userlist} className={style.ctnOlineList}>
            <div className={style.ctnGlobal}>
                <div className={style.usernamelogo}> {getFirstLetter(getUsername())}
                </div>
                <div>
                    <p className={style.username}
                    >{getUsername()}</p>
                    <span>online</span>
                </div>
            </div>
            <div className={style.ctnUsers}
            >
                <p className={style.chanelName}
                >PINNED</p>
                <button className={style.btnBack} onClick={() => setSelectedUser(null)}>
                    General</button>
                <p className={style.chanelName}>ALL
                </p>
                {users.map((user, key) => {
                    return user.connected ? <div key={key} onClick={() => { setSelectedUser(user); resetNotification(user); }
                    } className={`${style.user} ${selectedUser?.userID === user.userID ? style.user_active : ""}`}
                    >
                        <div className={style.userIcon}
                        >
                            <p>{getFirstLetter(user.username)}</p>
                        </div>
                        <div>
                            <h3> &nbsp;
                                {user.username}</h3>
                        </div>

                        {user.hasNewMessages ? (<span className={style.notification}></span>) : null}

                    </div> : null

                })}

            </div>
        </div >
    );
}

export default Userlist;