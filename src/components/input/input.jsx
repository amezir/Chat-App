import { socket } from "@/utils/socket"
import { useRef } from "react"

import styles from "./input.module.scss"

const input = ({ selectedUser, setSelectedUser }) => {

    const inputRef = useRef();

    const onKeyDown = (e) => {
        // detect when user press enter
        if (inputRef.current.value.length !== 0 && e.keyCode === 13) {
            console.log(inputRef.current.value);

            if (selectedUser) {
                socket.emit("private message", {
                    content: inputRef.current.value,
                    to: selectedUser.userID,
                });

                // do this because react doesnt re-render otherwise
                const _selectedUser = { ...selectedUser };

                _selectedUser.messages.push({
                    content: inputRef.current.value,
                    // fromSelf: true,
                    username: localStorage.getItem("username"),
                    from: socket.userID,
                });

                // change the reference to trigger a render
                setSelectedUser(_selectedUser);
            } else {
                socket.emit("message", { content: inputRef.current.value });
            }

            inputRef.current.value = "";
        }
    };


    return (

        <div className={styles.inputGroup}>
            <input ref={inputRef} type="text" onKeyDown={onKeyDown} placeholder="Write messages..." maxLength="230" />
        </div>
    )
}

export default input 
