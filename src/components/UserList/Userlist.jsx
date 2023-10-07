import { useEffect } from "react";
import style from "./Userlist.module.scss";
import { gsap } from "gsap";
import { useRef } from "react";

const Userlist = ({ users, setSelectedUser, selectedUser, setUsers
}) => {

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
        <div ref={userlist}
            className={style.ctnOlineList}>
            <div>
                <p>Global message</p>
                <button className={style.btnBack} onClick={() => setSelectedUser(null)}>
                    Chat Générale</button>
            </div>
            <div className={style.ctnUsers}
            >
                <p>Online users
                </p>
                {users.map((user, key) => {
                    return user.connected ? <div key={key} onClick={() => { setSelectedUser(user); resetNotification(user); }
                    } className={`${style.user} ${selectedUser?.userID === user.userID ? style.user_active : ""}`}
                    >
                        <img src="https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png" alt="user" height="25px" width="25px" />
                        <p> &nbsp; {user.username} &nbsp;
                        </p>

                        {user.hasNewMessages ? (<span className={style.notification}></span>) : null}

                    </div> : null

                })}

            </div>
        </div >
    );
}

export default Userlist;